import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ResponseSeries } from 'src/app/models/api.interface';
import { AppState } from 'src/app/store/app.reducers';
import * as ActionsGraficaUnica from 'src/app/store/actions/graficaUnica.actions'
import { SerieData } from 'src/app/models/serie.interface';
import { MatDialog } from '@angular/material/dialog';
import { SelectVariableComponent } from '../../components/select-variable/select-variable.component';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HistoricidadService } from 'src/app/services/historicidad.service';
import { HelpSingleComponent } from '../../components/help-single/help-single.component';


@Component({
	selector: 'app-single-estacion',
	templateUrl: './single-estacion.component.html',
	styleUrls: ['./single-estacion.component.scss']
})
export class SingleEstacionComponent implements OnInit {

	//DATA STORE CONTROL
	public cargando: boolean = false
	public datos: any;
	public error: any = null;
	nombreEstacion: string = ""
	suscripcion$: Subscription
	plotSelected: string = 'multicharts'
	tipoAgrupacion!: string

	series: (SerieData & { unidad_medida: string, altura: string, variableName:string })[] = []
	stroke: string;
	responseData: ResponseSeries[];
	data: ResponseSeries[] = []
	variablesSelected: { variable: string, altura: string, tipo_operacion: string }[] = []
	subSerie: string = "p"

	range = new FormGroup({
		start: new FormControl(undefined, [Validators.required]),
		end: new FormControl(undefined, [Validators.required]),
	});

	constructor(
		private _store: Store<AppState>,
		private router: Router,
		private _dialog: MatDialog,
		private _snack: MatSnackBar,
		private _router: Router,
		private apiService: HistoricidadService
	) { }


	setSubSerie(subserie: string) {
		this.subSerie = subserie
		this.generarSeries()
	}


	async changeRange() {
		const data: ResponseSeries[] = []
		if (this.range.valid) {
			let { start, end } = this.range.value
			if (typeof (start) != "string") start = start.toISOString()
			if (typeof (end) != "string") end = end.toISOString()
			this._store.dispatch(ActionsGraficaUnica.setNewRange({ start, end }))

			console.log("Eliminar mas adelante y remplazarlo por un efecto al corregir el endpoint")
			const { parametros, estacion } = await this._store.select(el => el.graficaUnica).pipe(take(1)).toPromise()
			for (let variable of this.variablesSelected) {
				data.push(await this.apiService.consultarSerie({ ...parametros, estaciones: [estacion], ...variable }).toPromise())
			}
			this._store.dispatch(ActionsGraficaUnica.setNewData({ data }))
		}
	}


	ngOnInit(): void {
		this.suscripcion$ = this._store.select(el => el.graficaUnica).subscribe(({ error, loaded, loading, data, estacion, variablesSelected, parametros }) => {
			this.nombreEstacion = estacion
			this.cargando = loading
			this.error = error
			this.variablesSelected = variablesSelected
			this.data = data

			// if (!estacion) {
			// 	this._snack.open("No hay datos seleccionadas, establesca los parametros de busqueda.", "Cerrar", { duration: 5000 })
			// 	this._router.navigate(["historicidad"])
			// }

			if (loading == false && loaded == true && !error) {
				this.responseData = data
				if (data.length > 0) {
					this.range.controls["start"].setValue(parametros.fecha_inicio)
					this.range.controls["end"].setValue(parametros.fecha_final)
					this.tipoAgrupacion = parametros.agrupacion
					this.generarSeries()
				}
			}
		})
	}

	generarSeries() {
		let series: (SerieData & { unidad_medida: string, altura: string, group: string, variableName: string })[] = []
		for (let variable of this.responseData) {
			let datos: any[] = []
			for (let tupla of variable.estaciones[0].data) {
				datos.push({
					x: new Date(tupla.f),
					y: tupla[this.subSerie],
					s: tupla.s,
					c: tupla.c
				})
			}

			series.push({
				unidad_medida: variable.unidad_medida,
				altura: variable.altura,
				name: variable.variable,
				group: variable.tipo_agrupacion,

				data: datos,
				type: "bar",
				variableName: variable.variable
			})
		}
		this.series = series
	}

	async addVariable() {
		const variables = await this._store.select(el => el.historicidad.variablesDisponibles).pipe(take(1)).toPromise()

		let varAux: { variable: string, altura: string }[] = []
		for (let v of variables) {
			for (let a of v.alturas) varAux.push({ variable: v.variable, altura: a })
		}

		varAux = varAux.filter(el1 => this.variablesSelected.find(el2 => el1.altura == el2.altura && el1.variable == el2.variable) == undefined)

		const dialogRef = this._dialog.open(SelectVariableComponent, { data: varAux });

		dialogRef.afterClosed().subscribe((result: { variable: string, altura: string, tipo_operacion: string }) => {
			if (result) {
				const { variable, altura, tipo_operacion } = result
				this._store.dispatch(ActionsGraficaUnica.loadingNewVariable({ variable, altura, tipo_operacion }))
			}
		});
	}

	eliminarVariable(variable: string, altura: string) {
		this._store.dispatch(ActionsGraficaUnica.deleteVariable({ variable, altura }))
	}

	dialogHelp() { this._dialog.open(HelpSingleComponent, { height: "50vh", width: "50vw" }) }

	suavizarCurva(evento: any) { (evento.checked) ? this.stroke = "smooth" : this.stroke = "straight" }

	cambioGrafico(evento: any) { const tipoGrafico: string = evento.value }

	ngOnDestroy(): void { this.suscripcion$.unsubscribe() }

	volverMap() { this.router.navigate(['historicidad']) }
}