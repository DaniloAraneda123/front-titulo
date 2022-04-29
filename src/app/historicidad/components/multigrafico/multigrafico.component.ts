import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexMarkers, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { SerieData } from 'src/app/models/serie.interface';

export type ChartOptions = {
	series: (SerieData & { tipo: string })[];
	chart: any; //ApexChart;
	dataLabels: ApexDataLabels;
	markers: ApexMarkers;
	title: ApexTitleSubtitle;
	fill: ApexFill;
	yaxis: ApexYAxis[];
	xaxis: ApexXAxis;
	tooltip: ApexTooltip;
	stroke: ApexStroke;
	grid: any; //ApexGrid;
	colors: any;
	toolbar: any;
};

@Component({
	selector: 'app-multigrafico',
	templateUrl: './multigrafico.component.html',
	styleUrls: ['./multigrafico.component.scss']
})
export class MultigraficoComponent {

	multiCharts: (Partial<ChartOptions> & { unidad_medida: string, altura: string, variable: string })[] = []

	commonOptions: Partial<ChartOptions> = {
		dataLabels: { enabled: false },
		// stroke: { curve: "straight" },
		toolbar: { tools: { selection: false } },
		markers: { size: 2, hover: { size: 1 } },
		tooltip: { followCursor: false, theme: "dark", x: { show: false }, marker: { show: false }, y: { title: { formatter: function () { return ""; } } } },
		grid: { clipMarkers: false },
		xaxis: { type: "datetime" }
	};

	coloresMain: string[] = ["#00E396", "#008FFB", "#546E7A", "#FF4560"]
	coloresSec: string[] = ["#00E396", "#008FFB", "#546E7A", "#FF4560"]

	dataSource: (SerieData & { unidad_medida: string; altura: string; })[];

	constructor() { }

	@Input() set subSerie(subSerie: string) {
		this.subSerie = subSerie
		this.createSeries()
	}

	@Input() set data(series: (SerieData & { unidad_medida: string, altura: string })[]) {
		this.dataSource = series
		this.createSeries()
	}

	createSeries() {
		let multiCharts: (Partial<ChartOptions> & { unidad_medida: string, altura: string, variable: string })[] = []
		let i = 0
		for (let serie of this.dataSource) {
			multiCharts.push({
				series: [{ ...serie, tipo: "step", type: "bar", name: `${serie.name} unico` }],
				chart: { id: serie.name + serie.altura, group: "social", type: "bar", height: 180 },
				colors: [this.coloresMain[i]],
				yaxis: [{ tickAmount: 1, labels: { minWidth: 30 }, title: { text: serie.unidad_medida }, seriesName: `${serie.name} unico` }],
				altura: serie.altura,
				unidad_medida: serie.unidad_medida,
				variable: serie.name
			})
			i++
		}
		this.multiCharts = multiCharts
	}

	setSerieAcumulado(change: MatCheckboxChange, i: number) {
		if (change.checked) {
			let serie = { ...this.dataSource[i], tipo: "acumulado", type: "line" }
			serie.name = `${serie.name} acumulado`
			serie.type = "line"

			let acumulator = 0
			const aux = []
			for (let i = 0; i < serie.data.length; i++) {
				acumulator += Number(serie.data[i].y)
				aux.push({ x: serie.data[i].x, y: acumulator.toFixed(2) })
			}

			serie.data = aux
			this.multiCharts[i].chart.type = "line"
			this.multiCharts[i].series = [...this.multiCharts[i].series, serie]
			this.multiCharts[i].yaxis = [
				...this.multiCharts[i].yaxis,
				{ tickAmount: 1, labels: { minWidth: 30 }, title: { text: this.dataSource[i].unidad_medida }, opposite: true, seriesName: serie.name }]
		} else {
			this.multiCharts[i].chart.type = "bar"
			this.multiCharts[i].series = this.multiCharts[i].series.filter(el => el.tipo != "acumulado")
			this.multiCharts[i].yaxis = this.multiCharts[i].yaxis.filter(el => !el.seriesName.includes(`${this.dataSource[i].name} acumulado`))
		}
	}

	setSerieNormal(change: MatCheckboxChange, i: number) {
		if (change.checked) {
			let serie = { ...this.dataSource[i], tipo: "step", type: "bar" }
			serie.data = serie.data.map(el => el)
			serie.name = `${serie.name} unico`
			this.multiCharts[i].series = [serie, ...this.multiCharts[i].series]
			this.multiCharts[i].chart.type = "bar"
			this.multiCharts[i].yaxis = [
				{ tickAmount: 1, labels: { minWidth: 30 }, title: { text: this.dataSource[i].unidad_medida }, seriesName: `${serie.name} unico` },
				...this.multiCharts[i].yaxis,]
		} else {
			this.multiCharts[i].chart.type = "line"
			this.multiCharts[i].series = this.multiCharts[i].series.filter(el => el.tipo != "step")
			this.multiCharts[i].yaxis = this.multiCharts[i].yaxis.filter(el => !el.seriesName.includes("unico"))
		}
	}
}

