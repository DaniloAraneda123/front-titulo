import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
	ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexYAxis, ApexFill, ApexMarkers,
	ApexStroke, ApexLegend, ApexTitleSubtitle, ApexPlotOptions, ApexTooltip
} from "ng-apexcharts";
import { Subscription } from 'rxjs';
import { DataEstacion, ResponseSeries } from 'src/app/models/api.interface';
import { AppState } from 'src/app/store/app.reducers';
import * as ActionsGraficaUnica from 'src/app/store/actions/graficaUnica.actions'
import { SerieData } from 'src/app/models/serie.interface';
import { getLocaleDateFormat } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SelectVariableComponent } from '../../components/select-variable/select-variable.component';
import { stringify } from 'querystring';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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

	series: (SerieData & { unidad_medida: string, altura: string })[] = []
	stroke: string;
	responseData: ResponseSeries[];
	data: ResponseSeries[] = []
	variablesSelected: { variable: string, altura: string }[] = []

	range = new FormGroup({
		start: new FormControl(undefined, [Validators.required]),
		end: new FormControl(undefined, [Validators.required]),
	});

	constructor(
		private store: Store<AppState>,
		private router: Router,
		public dialog: MatDialog
	) { }


	test() {
		if (this.range.valid) {
			console.log("valido", this.range.value)
			console.log(this.data)
		}
	}


	ngOnInit(): void {
		this.suscripcion$ = this.store.select(el => el.graficaUnica).subscribe(({ error, loaded, loading, data, nombreEstacion, variablesSelected, parametros }) => {
			this.nombreEstacion = nombreEstacion
			this.cargando = loading
			this.error = error
			this.variablesSelected = variablesSelected
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


	generarSeries(varialbles: ResponseSeries[]) {
		let series: (SerieData & { unidad_medida: string, altura: string })[] = []
		for (let variable of varialbles) {
			let datos: {}[] = []
			for (let tupla of variable.estaciones[0].data) {
				datos.push({ x: this.getDate(tupla.fecha, ""), y: tupla.promedio.toFixed(2) })
			}

			series.push({
				unidad_medida: variable.unidad_medida,
				altura: variable.altura,
				name: variable.variable,
				data: datos,
				type: "bar"
			})
		}
		this.series = series
	}

	async addVariable() {
		const variables = await this.store.select(el => el.historicidad.variablesDisponibles).pipe(take(1)).toPromise()

		let varAux: { variable: string, altura: string }[] = []
		for (let v of variables) {
			for (let a of v.alturas) varAux.push({ variable: v.variable, altura: a })
		}

		varAux = varAux.filter(el1 => this.variablesSelected.find(el2 => el1.altura == el2.altura && el1.variable == el2.variable) == undefined)

		const dialogRef = this.dialog.open(SelectVariableComponent, { data: varAux });

		dialogRef.afterClosed().subscribe((result: { variable: string, altura: string }) => {
			if (result) {
				const { variable, altura } = result
				this.store.dispatch(ActionsGraficaUnica.loadingVariable({ variable, altura }))
			}
		});
	}

	eliminarVariable(variable: string, altura: string) {
		this.store.dispatch(ActionsGraficaUnica.deleteVariable({ variable, altura }))
		//dialog
	}


	suavizarCurva(evento: any) { (evento.checked) ? this.stroke = "smooth" : this.stroke = "straight" }

	cambioGrafico(evento: any) { const tipoGrafico: string = evento.value }

	ngOnDestroy(): void { this.suscripcion$.unsubscribe() }

	volverMap() { this.router.navigate(['historicidad']) }
}