import { ApexAxisChartSeries } from 'ng-apexcharts';
import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'src/app/models/apex.interface';
import { SerieData } from 'src/app/models/serie.interface';

@Component({
	selector: 'app-multivariables',
	templateUrl: './multivariables.component.html',
	styleUrls: ['./multivariables.component.scss']
})
export class MultivariablesComponent {

	colores: string[] = ["#00E396", "#008FFB", "#546E7A", "#FF4560"]


	chartOptionsVariables: Partial<ChartOptions> = {
		series: [],
		chart: {
			type: "bar", height: "100vh",
			toolbar: { autoSelected: "selection", show: true },
			animations: {
				enabled: true, easing: 'easeinout', speed: 400,
				animateGradually: { enabled: true, delay: 150 },
				dynamicAnimation: { enabled: true, speed: 350 }
			},
			// events: { click: (event, chartContext, config) => { console.log(config.dataPointIndex) } }
		},
		grid: {
			borderColor: "#e7e7e7",
			row: {
				colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
				opacity: 0.5
			}
		},

		dataLabels: {enabled: false,},
		stroke: { curve: "straight", width: 3 },
		fill: { opacity: 1 },
		markers: { size: 0 },
		xaxis: { type: "datetime", title: { text: "Fecha" } },
		yaxis: { title: { text: "" } },
		legend: { position: "top", horizontalAlign: "center" }
	};
	title: string = ""
	dataSource: (SerieData & { unidad_medida: string; altura: string; })[];

	constructor() { }

	@Input() set subSerie(nombre:string) {
		this.subSerie = nombre
		this.createSeries()
	}
	
	@Input() set data(data: (SerieData & { unidad_medida: string, altura: string })[]) {
		this.dataSource = data
		this.createSeries()
	}

	createSeries(){
		let series: ApexAxisChartSeries = []
		this.title = ""
		for (let serie of this.dataSource) {
			this.title += `${serie.name} vs `
			series.push({
				name: `${serie.name} [${serie.unidad_medida}]`,
				type: 'bar',
				data: serie.data
			})
		}
		this.title = this.title.slice(0, this.title.length - 4)
		this.chartOptionsVariables.series = series
	}
}
