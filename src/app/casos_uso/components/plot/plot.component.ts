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
	charType: ('line'|'bar') = 'line';


	@Input() set typeChar(value: ('line'|'bar')) {
		this.charType = value
		this.chartOptionsLine.chart = {...this.chartOptionsLine.chart, type: value}
	}



	@Input() ytext:string
	@Input() unit: string


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
			//xaxis: { type: "datetime" },
			//yaxis: [],
			yaxis: {
				title:{
					text:"ETo (mm)"
				},
				labels: {
				  formatter: function (value) {
					return value + '';
				  }
				},
			  },
			  xaxis: {
				  
				labels: {
					format:"dd/MM/yyyy"
				},
				type:"datetime",
				title:{
					text:"Fecha"
				}
			  },
			legend: { position: "bottom", horizontalAlign: "center" }
		};
	}

	ngOnInit(): void { }


	@Input() set series(values: SerieData[]) {
		this.chartOptionsLine.chart = {...this.chartOptionsLine.chart, type:this.charType}
		this.chartOptionsLine.yaxis = {... this.chartOptionsLine, title:{text: this.ytext}}
		this.chartOptionsLine.series =  [...values]
	}


}
