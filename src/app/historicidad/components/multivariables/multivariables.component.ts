import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'src/app/models/apex.interface';

@Component({
	selector: 'app-multivariables',
	templateUrl: './multivariables.component.html',
	styleUrls: ['./multivariables.component.scss']
})
export class MultivariablesComponent{

	colores: string[] = ["#00E396", "#008FFB", "#546E7A", "#FF4560"]



	constructor() { }

	chartOptionsVariables: Partial<ChartOptions> = {
		series: [],
		chart: {
			type: "line", height: 500, background: "#ffffff",
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
		yaxis: { title: { text: "" }},
		legend: { position: "top", horizontalAlign: "center" }
	};

}
