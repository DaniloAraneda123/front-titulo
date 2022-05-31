import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ResponseSeries } from 'src/app/models/api.interface';
import { SerieData } from 'src/app/models/serie.interface';
import { AppState } from 'src/app/store/app.reducers';
import { SelectVariableComponent } from '../../components/select-variable/select-variable.component';
import * as ActionsGraficaMultiple from 'src/app/store/actions/graficaMultiple.actions'

@Component({
	selector: 'app-multi-estacion',
	templateUrl: './multi-estacion.component.html',
	styleUrls: ['./multi-estacion.component.scss']
})
export class MultiEstacionComponent{

	//DATA STORE CONTROL
	public cargando: boolean = false
	public datos: any;
	public error: any = null;
	nombreEstacion: string = ""
	suscripcion$: Subscription
	plotSelected: string = 'multicharts'

	series: (SerieData & { unidad_medida: string, altura: string })[] = []
	stroke: string;
	responseData: ResponseSeries;
	data: ResponseSeries
	variablesSelected: { variable: string, altura: string }[] = []

	range = new FormGroup({
		start: new FormControl(undefined, [Validators.required]),
		end: new FormControl(undefined, [Validators.required]),
	});
	nombreEstaciones: string[] = [];

	constructor(
		private store: Store<AppState>,
		private router: Router,
		public dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.suscripcion$ = this.store.select(el => el.graficaMultiple).subscribe(({ error, loaded, loading, data, estaciones, parametros }) => {
			this.nombreEstaciones = estaciones
			this.cargando = loading
			this.error = error
			this.data = data
			if (loading == false && loaded == true) {
				this.responseData = data
				this.range.controls["start"].setValue(parametros.fecha_inicio)
				this.range.controls["end"].setValue(parametros.fecha_final)
				this.generarSeries(data)
			}
			// if(loading == false && loaded == false && parametros == undefined){
			// 	this.router.navigate(["historicidad"])
			// }
		})
	}

	getDate(fecha: string, group: string) {
		let seg = fecha.split('-')
		return (new Date(Number(seg[0]), Number(seg[1]), Number(seg[2]))).getTime()
	}


	generarSeries(estaciones: ResponseSeries) {
		let series: (SerieData & { unidad_medida: string, altura: string })[] = []
		for (let estacion of estaciones.estaciones) {
			let datos: {}[] = []
			for (let tupla of estacion.data) {
				const y = (tupla.p==null)?null:tupla.p.toFixed(2)
				datos.push({ x: this.getDate(tupla.f, ""), y })
			}

			series.push({
				unidad_medida: estaciones.unidad_medida,
				altura: estaciones.altura,
				name: estaciones.variable,
				data: datos,
				type: "line"
			})
		}
		this.series = series
	}

	async changeVariable() {
		const variables = await this.store.select(el => el.historicidad.variablesDisponibles).pipe(take(1)).toPromise()

		let varAux: { variable: string, altura: string }[] = []
		for (let v of variables) {
			for (let a of v.alturas) varAux.push({ variable: v.variable, altura: a })
		}

		const dialogRef = this.dialog.open(SelectVariableComponent, { data: varAux });

		dialogRef.afterClosed().subscribe((result: { variable: string, altura: string }) => {
			if (result) {
				const { variable, altura } = result
				this.store.dispatch(ActionsGraficaMultiple.changeVariable({ variable, altura }))
			}
		});
	}

	actualizarDate(){

	}

	ngOnDestroy(): void { this.suscripcion$.unsubscribe() }

	volverMap() { this.router.navigate(['historicidad']) }
}
