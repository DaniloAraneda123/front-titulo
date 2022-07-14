import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ResponseSeries } from 'src/app/models/api.interface';
import { SerieData } from 'src/app/models/serie.interface';
import { AppState } from 'src/app/store/app.reducers';
import * as ActionsGraficaMultiple from 'src/app/store/actions/graficaMultiple.actions'
import { HelpMultipleComponent } from '../../components/help-multiple/help-multiple.component';
import { MatSelectChange } from '@angular/material/select';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-multi-estacion',
	templateUrl: './multi-estacion.component.html',
	styleUrls: ['./multi-estacion.component.scss']
})
export class MultiEstacionComponent {

	//DATA STORE CONTROL
	cargando: boolean = false
	datos: any;
	error: any = null;
	nombreEstacion: string = ""
	suscripcion$: Subscription
	plotSelected: string = 'multicharts'
	maxDate = environment.maxDate

	series: (SerieData & { unidad_medida: string, altura: string, group: string, variableName: string })[] = [];
	stroke: string;
	responseData: ResponseSeries;
	data: ResponseSeries
	variables: { variable: string, altura: string }[] = []

	range = new FormGroup({
		start: new FormControl(undefined, [Validators.required]),
		end: new FormControl(undefined, [Validators.required]),
	});

	title_variable: string;
	title_estations: string;
	variableSelected: number;

	constructor(
		private _store: Store<AppState>,
		private _router: Router,
		private _dialog: MatDialog,
	) { }

	async ngOnInit() {
		this.suscripcion$ = this._store.select(el => ({ ...el.graficaMultiple, variablesDisponibles: el.historicidad.variablesDisponibles }))
			.subscribe(({ error, loaded, loading, data, parametros, variablesDisponibles }) => {
				this.cargando = loading
				this.error = error
				this.data = data
				if (loading == false && loaded == true) {
					this.responseData = data
					this.range.controls["start"].setValue(parametros.fecha_inicio)
					this.range.controls["end"].setValue(parametros.fecha_final)
					this.generarSeries(data)
					let varAux: { variable: string, altura: string }[] = []
					for (let v of variablesDisponibles) {
						for (let a of v.alturas) varAux.push({ variable: v.variable, altura: a })
					}
					this.variables = varAux
					this.variableSelected = varAux.findIndex(el => el.altura == parametros.altura && el.variable == parametros.variable)
					console.log(this.variables[this.variableSelected])
				}
				// if(loading == false && loaded == false && parametros == undefined){
				// 	this.router.navigate(["historicidad"])
				// }
			})


	}

	generarSeries(estaciones: ResponseSeries) {
		let series: (SerieData & { unidad_medida: string, altura: string, group: string, variableName: string })[] = []

		this.title_estations = ""
		this.title_variable = `${estaciones.variable} [${estaciones.altura}]`
		for (let estacion of estaciones.estaciones) {
			let datos: {}[] = []
			this.title_estations += `${estacion.nombre_estacion}  V/S   `
			for (let tupla of estacion.data) {
				const y = (tupla.p == undefined) ? null : tupla.p
				datos.push({
					x: new Date(tupla.f),
					y,
					s: tupla.s,
					c: tupla.c
				})
			}

			series.push({
				unidad_medida: estaciones.unidad_medida,
				altura: estaciones.altura,
				name: estacion.nombre_estacion,
				data: datos,
				type: "bar",
				group: estaciones.tipo_agrupacion,
				variableName: estaciones.variable
			})
		}
		this.title_estations = this.title_estations.slice(0, this.title_estations.length - 6)
		this.series = series
	}

	changeVariable(select:MatSelectChange) {
		const {variable,altura} = this.variables[select.value]
		this._store.dispatch(ActionsGraficaMultiple.changeVariable({ variable, altura }))
	}

	changeRange() {
		if (this.range.valid) {
			let { start, end } = this.range.value
			if (typeof (start) != "string") start = start.toISOString()
			if (typeof (end) != "string") end = end.toISOString()
			this._store.dispatch(ActionsGraficaMultiple.setNewRange({ fecha_inicio: start,fecha_final: end }))
		}
	}

	dialogHelp() { this._dialog.open(HelpMultipleComponent, { height: "70vh", width: "70vw" }) }

	ngOnDestroy(): void { this.suscripcion$.unsubscribe() }

	volverMap() { this._router.navigate(['historicidad']) }
}
