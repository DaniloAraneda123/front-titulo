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
	dataVariables: any[] = []
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

		this.suscripcion$ = this.store.select('graficaUnica').subscribe(({ error, loaded, loading, variables }) => {
			this.cargandoVariable = loading
			this.errorVariable = error
			if (loading == false && loaded == true) {
				this.dataVariables = variables
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
				const variable = this.dataVariables.find((elem) => (elem.variable == nombre && elem.altura == altura))
				this.multiCharts.push(
					{
						series: [{ name: variable.variable, data: variable.estaciones[Object.keys(variable.estaciones)[0]].promedios }],
						xaxis: { categories: variable.fechas, title: { text: "Fecha" } },
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
		} else if (this.multiCharts.length > 3) {
			this.variablesDisponibles_MG[i].checked = false
			//toaster notificando el maximo de elemtos
			return
		} else {
			this.variablesDisponibles_MG[i].checked = true
			const { altura, nombre } = this.variablesDisponibles_MG[i]
			if (this.dataVariables.find((el) => (el.altura == altura && el.variable == nombre)) == undefined) {
				this.store.dispatch(actionsGraficaUnica.loadingData({ variable: nombre, altura: altura }))
			} else {
				this.actualizarMultiCharts()
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
				const variable = this.dataVariables.find((elem) => (elem.variable == nombre && elem.altura == altura))
				series.push(
					{
						data: variable.estaciones[Object.keys(variable.estaciones)[0]].promedios,
						name: nombre + ' [' + altura + ']'
					}
				)
				this.chartOptionsVariables.xaxis.categories = variable.fechas
				this.chartOptionsVariables.series = series
				return
			}
		}
		// console.log(series)
		// this.chartOptionsVariables.series = [{data:[1,2,3,4,5,6],name:"series"}]
		// this.chartOptionsLine.xaxis.categories = this.datos.fechas
	}

	seleccionVariable_UG(i: number) {
		if (this.variablesDisponibles_UG[i].checked) {
			this.variablesDisponibles_UG[i].checked = false
			this.chartOptionsVariables.series = this.chartOptionsVariables.series.filter((elemento) => (
				elemento.name !== this.variablesDisponibles_UG[i].nombre + ' [' + this.variablesDisponibles_UG[i].altura + ']'))
		} else {
			this.variablesDisponibles_UG[i].checked = true
			const { altura, nombre } = this.variablesDisponibles_UG[i]
			if (this.dataVariables.find((el) => (el.altura == altura && el.variable == nombre)) == undefined) {
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

	//Grafico Box Plot
	public chartOptionsBoxPlot: Partial<ChartOptions> = {
		series: [
			{
				name: 'box', type: 'boxPlot',
				data: [{ x: new Date('2017-01-01').getTime(), y: [54, 66, 69, 75, 88] },
				{ x: new Date('2018-01-01').getTime(), y: [43, 65, 69, 76, 81] },
				{ x: new Date('2019-01-01').getTime(), y: [31, 39, 45, 51, 59] },
				{ x: new Date('2020-01-01').getTime(), y: [39, 46, 55, 65, 71] },
				{ x: new Date('2021-01-01').getTime(), y: [29, 31, 35, 39, 44] }]
			},
		],
		chart: { height: 350, type: "boxPlot",background:"#ffffff", },
		colors: ['#008FFB'],
		title: { text: 'BoxPlot - Scatter Chart', align: 'left' },
		xaxis: { type: 'datetime' }, tooltip: { shared: false, intersect: true }
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

	/// TEST sumarizado
	public chartOptionsTest: Partial<ChartOptions> = {
		series: [
			{ name: "Income", type: "column", data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6] },
			{ name: "Cashflow", type: "column", data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5] },
			{ name: "Revenue", type: "line", data: [20, 29, 37, 36, 44, 45, 50, 58] }
		],
		chart: { height: 350, type: "line", stacked: false},
		dataLabels: { enabled: false },
		stroke: { width: [1, 1, 4] },
		title: { text: "XYZ - Stock Analysis (2009 - 2016)", align: "left", offsetX: 110 },
		xaxis: { categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016] },
		yaxis: [
			{
				axisTicks: { show: true },
				axisBorder: { show: true, color: "#008FFB" },
				labels: { style: { colors: "#00E396" } },
				title: { text: "Income (thousand crores)", style: { color: "#008FFB" } },
				tooltip: { enabled: true }
			},
			{
				seriesName: "Income",
				opposite: true,
				axisTicks: { show: true },
				axisBorder: { show: true, color: "#00E396" },
				labels: { style: { colors: "#00E396" } },
				title: { text: "Operating Cashflow (thousand crores)", style: { color: "#00E396" } }
			},
			{
				seriesName: "Revenue",
				opposite: true,
				axisTicks: { show: true },
				axisBorder: { show: true, color: "#FEB019" },
				labels: { style: { colors: "#FEB019" } },
				title: { text: "Revenue (thousand crores)", style: { color: "#FEB019" } }
			}
		],
		tooltip: {
			fixed: {
				enabled: true,
				position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
				offsetY: 30,
				offsetX: 60
			}
		},
		legend: {
			horizontalAlign: "left",
			offsetX: 40
		}
	}
}