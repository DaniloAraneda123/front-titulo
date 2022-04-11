import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'src/app/models/apex.interface';
import { SerieData } from 'src/app/models/serie.interface';

@Component({
	selector: 'app-plot',
	templateUrl: './plot.component.html',
	styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnInit {
	//GRAFICO
	chartOptionsLine: Partial<ChartOptions>;
	@Input() titlePlot!: string
	@Input() loadingData:boolean = false

	constructor() {
		this.chartOptionsLine = {
			series: [],
			chart: {
				height: 350, type: "line", stacked: false,
				toolbar: {
					tools: { download: true, selection: true, zoom: true, zoomin: false, zoomout: false, pan: false, },
					show: true, autoSelected: 'selection'
				}
			},
			colors: ['#008FFB', '#00E396', '#775DD0', '#FF4560', '#FEB019'],
			dataLabels: { enabled: false },
			stroke: { width: [1, 2.5] },
			// title: { text: "Horas Frio (9/6/20 - 20/6/20) Vicuña", align: "left", offsetX: 10 },
			xaxis: { type: "datetime" },
			yaxis: [],
			legend: { position: "bottom", horizontalAlign: "center" }
		};
	}

	ngOnInit(): void { }


	@Input() set series(values: SerieData[]) {
		const aux = [...values]
		this.chartOptionsLine.series = [...aux]
	}


}
