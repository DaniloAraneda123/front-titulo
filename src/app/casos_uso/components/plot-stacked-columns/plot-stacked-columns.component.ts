import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  ApexTooltip,
} from "ng-apexcharts";
import { SerieData } from 'src/app/models/serie.interface';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};


@Component({
  selector: 'app-plot-stacked-columns',
  templateUrl: './plot-stacked-columns.component.html',
  styleUrls: ['./plot-stacked-columns.component.scss']
})
export class PlotStackedColumnsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input() loadingData: boolean = false
  @Input() titlePlot: string;
    public chartOptions: Partial<ChartOptions>;
  
    constructor()
     {
      this.chartOptions = {
        series: [],
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [
          {
            
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        xaxis: {
          type: "datetime",
        },
        


  }
}
  ngOnInit(): void {}


	@Input() set series(values: SerieData[]) {
		const aux = [...values]
		this.chartOptions.series = [...aux]
	}

}