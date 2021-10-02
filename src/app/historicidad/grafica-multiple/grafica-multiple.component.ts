import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as actionsHistoricidad from '../../store/actions/historicidad.actions'

import {
	ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexYAxis, ApexFill, ApexMarkers,
	ApexStroke, ApexLegend, ApexTitleSubtitle, ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	dataLabels: ApexDataLabels;
	yaxis: ApexYAxis;
	fill: ApexFill;
	stroke: ApexStroke;
	markers: ApexMarkers;
	colors: string[];
	legend: ApexLegend;
	title: ApexTitleSubtitle;
	plotOptions: ApexPlotOptions;
};

@Component({
	selector: 'app-grafica-multiple',
	templateUrl: './grafica-multiple.component.html',
	styleUrls: ['./grafica-multiple.component.scss']
})

export class GraficaMultipleComponent {

	//DATA STORE CONTROL
	cargando: boolean = false
	datos: any;
	error: any = null;

	//Componente
	tipoGrafico = "Linea"
	suscripcion$: Subscription

	//Graficos
	@ViewChild("chart") chart: ChartComponent;

	constructor(private store: Store<AppState>, private router: Router) {
		this.suscripcion$ = this.store.select('historicidad').subscribe((state) => {
			this.cargando = state.loading

			if (state.error) {
				this.error = state.error
				setTimeout(() => {
					// this.store.dispatch(actionsHistoricidad.resetear())
					router.navigate(['historicidad'])
				}, 6000)
			}

			if (state.loading === false && state.loaded === true) {
				this.datos = state.data
				this.cargarDatos("promedios")
			}
		})
	}

	private cargarDatos(tipo: string) {
		let series = []
		const estaciones = Object.keys(this.datos.estaciones)
		for (let estacion of estaciones) {
			if (Object.keys(this.datos.estaciones[estacion]).length !== 0) {
				series.push({ data: this.datos.estaciones[estacion][tipo], name: estacion, })
			}
		}

		this.chartOptionsLine.series = series
		this.chartOptionsLine.xaxis.categories = this.datos.fechas
		// this.titulo = `Comparativa de  ${tipo} `
	}

	public cambiarVariable(evento: any) { this.cargarDatos(evento.value) }

	ngOnDestroy(): void { this.suscripcion$.unsubscribe() }

	volverMap() {
		this.router.navigate(['historicidad'])
		this.store.dispatch(actionsHistoricidad.resetear())
	}


	/////Graficos
	chartOptionsLine: Partial<ChartOptions> = {
		series: [],
		chart: {
			type: "line", height: 500,
			toolbar: { autoSelected: "selection", show: true },
			animations: {
				enabled: true, easing: 'easeinout', speed: 400,
				animateGradually: { enabled: true, delay: 100 },
				dynamicAnimation: { enabled: true, speed: 300 }
			},
			events: { click: (event, chartContext, config) => { console.log(config.dataPointIndex) } }
		},
		stroke: { width: 3 },
		fill: { opacity: 1 },
		markers: { size: 0 },
		xaxis: { categories: [], title: { text: "Fecha" } },
		yaxis: { title: { text: "Temperature" }/*, min: 20, max: 100 */ },
		legend: { position: "top", horizontalAlign: "center" }
	};
}
