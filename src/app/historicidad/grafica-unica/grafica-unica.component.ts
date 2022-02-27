import { ResponseSeries } from './../../models/api.interface';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as actionsGraficaUnica from '../../store/actions/graficaUnica.actions'
import * as actionsHistoricidad from '../../store/actions/historicidad.actions'

import {
	ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexYAxis, ApexFill, ApexMarkers,
	ApexStroke, ApexLegend, ApexTitleSubtitle, ApexPlotOptions, ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	dataLabels: ApexDataLabels;
	yaxis: ApexYAxis | ApexYAxis[];
	fill: ApexFill;
	stroke: ApexStroke;
	markers: ApexMarkers;
	colors: string[];
	legend: ApexLegend;
	title: ApexTitleSubtitle;
	plotOptions: ApexPlotOptions;
	toolbar: any;
	tooltip: ApexTooltip;
	grid: any;
};

@Component({
	selector: 'app-grafica-unica',
	templateUrl: './grafica-unica.component.html',
	styleUrls: ['./grafica-unica.component.scss']
})

export class GraficaUnicaComponent implements OnDestroy {

	//DATA STORE CONTROL
	public cargando: boolean = false
	public datos: any;
	public error: any = null;

	//ELEMENTOS
	public tipoGrafico = "Linea"
	cargaInicial$: Subscription
	suscripcion$: Subscription
	nombreEstacion: string = ""

	//MULTI VARIABLES///////////////////////////////////////////////////////////////////////////////////////////////////////
	variablesDisponibles_MG: any[] = []
	variablesDisponibles_UG: any[] = []

	cargandoVariable: boolean
	errorVariable: any
	data: ResponseSeries[] = []
	multiCharts: Partial<ChartOptions>[] = [];

	constructor(private store: Store<AppState>, private router: Router) {
		this.cargaInicial$ = this.store.select('historicidad').subscribe((state) => {
			this.cargando = state.loading
			this.nombreEstacion = state.estaciones[0]
			if (state.error) {
				this.error = state.error
				setTimeout(() => {
					// this.store.dispatch(actionsHistoricidad.resetear())
					this.router.navigate(['historicidad'])
					this.cargaInicial$.unsubscribe()
				}, 6000)
			}

			if (state.loading === false && state.loaded === true) {
				this.datos = state.data
				for (let variable of Object.keys(state.variablesDisponibles)) {
					for (let altura of state.variablesDisponibles[variable]) {
						this.variablesDisponibles_MG.push({ nombre: variable, altura: altura, checked: false })
						this.variablesDisponibles_UG.push({ nombre: variable, altura: altura, checked: false })
					}
				}
				this.cargarUnica()
				this.cargaInicial$.unsubscribe()
			}
		})

		this.suscripcion$ = this.store.select('graficaUnica').subscribe(({ error, loaded, loading, data }) => {
			this.cargandoVariable = loading
			this.errorVariable = error
			if (loading == false && loaded == true) {
				this.data = data
				this.actualizarMultiCharts()
				this.actualizarMultiVariables()
			}
		})
	}

	private cargarUnica() {
		let series = []
		const estacion = Object.keys(this.datos.estaciones)[0]

		series.push({ data: this.datos.estaciones[estacion].minimos, name: "Minimos" })
		series.push({ data: this.datos.estaciones[estacion].maximos, name: "Maximos" })
		series.push({ data: this.datos.estaciones[estacion].promedios, name: "Promedios" })

		//Linea Principal
		this.chartOptionsLine.title = { text: `${this.datos.variable}  [${this.datos.altura}]`, align: 'left' }
		this.chartOptionsLine.yaxis = { title: { text: '[ ' + this.datos.unidad_medida + ' ]', style: { fontSize: "15px" } } }
		this.chartOptionsLine.series = series
		this.chartOptionsLine.xaxis.categories = this.datos.fechas

		//Linea Comparativa
		this.chartOptionsVariables.xaxis.categories = this.datos.fechas
		this.chartOptionsVariables.title = { text: 'Comparativa Variables', align: 'left' }
	}

	///////////////////////////////////MULTI VARIABLES//////////////////////////////////////
	actualizarMultiCharts() {
		const variablesActivadas = this.variablesDisponibles_MG.filter((elem) => (elem.checked == true))
		for (let { nombre, altura } of variablesActivadas) {
			if (this.multiCharts.find((elem) => (elem.chart.id == nombre + '' + altura)) == undefined) {
				const variable = this.data.find((elem) => (elem.variable == nombre && elem.altura == altura))
				const fechas = variable.estaciones[0].data.map(el=>el.fecha)
				this.multiCharts.push(
					{
						series: [{ name: variable.variable, data: variable.estaciones[Object.keys(variable.estaciones)[0]].promedios }],
						xaxis: { categories: fechas, title: { text: "Fecha" } },
						chart: { id: nombre + '' + altura, group: "social", type: "line", height: 230 },
						colors: [this.getColor()],
						title: { text: `${nombre}  [${altura}]`, align: 'left' },
						yaxis: { title: { text: '[ ' + variable.unidad_medida + ' ]' }, tickAmount: 2, labels: { minWidth: 40 } }
					}
				)
				return
			}
		}
	}

	seleccionVariable_MG(i: number) {
		if (this.variablesDisponibles_MG[i].checked) {
			this.variablesDisponibles_MG[i].checked = false
			this.multiCharts = this.multiCharts.filter((elemento) => (
				elemento.chart.id !== this.variablesDisponibles_MG[i].nombre + this.variablesDisponibles_MG[i].altura))
		} else if (this.multiCharts.length < 4) {
			this.variablesDisponibles_MG[i].checked = false
			//toaster notificando el maximo de elemtos
			return
		} else {
			this.variablesDisponibles_MG[i].checked = true
			const { altura, nombre } = this.variablesDisponibles_MG[i]
			if (this.data.find((el) => (el.altura == altura && el.variable == nombre)) == undefined) {
				this.store.dispatch(actionsGraficaUnica.loadingData({ variable: nombre, altura: altura }))
			} else {
				this.actualizarMultiVariables()
			}
		}
	}

	public getColor(): string {
		const colores: string[] = ["#00E396", "#008FFB", "#546E7A", "#FF4560"]
		const coloresDisponibles = colores.filter((color) => {
			for (let i in this.multiCharts) {
				if (this.multiCharts[i].colors[0] === color) {
					return false
				}
			}
			return true
		})
		return coloresDisponibles[0]
	}

	///////////////////////////////////////GRAFICA UNICA MULTI_VARIABLE/////////////////////////////////////
	actualizarMultiVariables() {
		const variablesActivadas = this.variablesDisponibles_UG.filter((elem) => (elem.checked == true))
		let series = [...this.chartOptionsVariables.series]
		for (let { nombre, altura } of variablesActivadas) {
			if (this.chartOptionsVariables.series.find((elem) => (elem.name == nombre + ' [' + altura + ']')) == undefined) {
				const variable = this.data.find((elem) => (elem.variable == nombre && elem.altura == altura))
				const fechas = this.data[0].estaciones[0].data.map(el => el.fecha)
				series.push(
					{
						data: variable.estaciones[Object.keys(variable.estaciones)[0]].promedios,
						name: nombre + ' [' + altura + ']'
					}
				)
				this.chartOptionsVariables.xaxis.categories = fechas
				this.chartOptionsVariables.series = series
				return
			}
		}
	}

	seleccionVariable_UG(i: number) {
		if (this.variablesDisponibles_UG[i].checked) {
			this.variablesDisponibles_UG[i].checked = false
			this.chartOptionsVariables.series = this.chartOptionsVariables.series.filter((elemento) => (
				elemento.name !== this.variablesDisponibles_UG[i].nombre + ' [' + this.variablesDisponibles_UG[i].altura + ']'))
		} else {
			this.variablesDisponibles_UG[i].checked = true
			const { altura, nombre } = this.variablesDisponibles_UG[i]
			if (this.data.find((el) => (el.altura == altura && el.variable == nombre)) == undefined) {
				this.store.dispatch(actionsGraficaUnica.loadingData({ variable: nombre, altura: altura }))
			} else {
				this.actualizarMultiVariables()
			}
		}
	}

	suavizarCurva(evento: any) {
		if (evento.checked) {
			this.chartOptionsLine.stroke = { curve: "smooth", width: 2 }
		} else {
			this.chartOptionsLine.stroke = { curve: "straight", width: 2 }
		}
	}

	volverMap() {
		this.router.navigate(['historicidad'])
		this.store.dispatch(actionsHistoricidad.resetear())
	}

	cambioGrafico(evento: any) {
		const tipoGrafico: string = evento.value
	}

	ngOnDestroy(): void { this.suscripcion$.unsubscribe() }

	///////////////////////////////////////GRAFICOS///////////////////////////////////////////////////////
	//Grafico Linea Principal
	chartOptionsLine: Partial<ChartOptions> = {
		series: [],
		chart: {
			type: "line", height: 500,
			background:"#ffffff",
			toolbar: { autoSelected: "selection", show: true },
			animations: {
				enabled: true, easing: 'easeinout', speed: 400,
				animateGradually: { enabled: true, delay: 150 },
				dynamicAnimation: { enabled: true, speed: 350 }
			},
			// events: { click: (event, chartContext, config) => { console.log(config.dataPointIndex) } }
		},
		stroke: { curve: "straight", width: 3 },
		fill: { opacity: 1 },
		markers: { size: 0 },
		xaxis: { categories: [], title: { text: "Fecha" } },
		yaxis: { title: { text: "Temperature" }/*, min: 20, max: 100, tickAmount: 3*/ },
		legend: { position: "top", horizontalAlign: "center" }
	};

	//Multi Graficos Opciones Comunes
	commonOptionsMultiCharts: Partial<ChartOptions> = {
		dataLabels: { enabled: false },
		stroke: { curve: "straight" },
		toolbar: { tools: { selection: false } },
		markers: { size: 2, hover: { size: 10 } },
		tooltip: {
			followCursor: false, theme: "dark",
			x: { show: false },
			marker: { show: false },
			y: { title: { formatter: function () { return ""; } } }
		},
		grid: { clipMarkers: false }
	};

	//Grafico Linea Multi Variables
	chartOptionsVariables: Partial<ChartOptions> = {
		series: [],
		chart: {
			type: "line", height: 500,background:"#ffffff",
			toolbar: { autoSelected: "selection", show: true },
			animations: {
				enabled: true, easing: 'easeinout', speed: 400,
				animateGradually: { enabled: true, delay: 150 },
				dynamicAnimation: { enabled: true, speed: 350 }
			},
			// events: { click: (event, chartContext, config) => { console.log(config.dataPointIndex) } }
		},
		stroke: { curve: "straight", width: 3 },
		fill: { opacity: 1 },
		markers: { size: 0 },
		xaxis: { categories: [], title: { text: "Fecha" } },
		yaxis: { title: { text: "" }/*, min: 20, max: 100, tickAmount: 3*/ },
		legend: { position: "top", horizontalAlign: "center" }
	};
}