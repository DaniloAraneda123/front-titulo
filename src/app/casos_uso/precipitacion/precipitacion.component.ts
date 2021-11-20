import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  ChartComponent, ApexAxisChartSeries, ApexChart, ApexFill, ApexTooltip, ApexXAxis, ApexLegend, ApexDataLabels,
  ApexTitleSubtitle, ApexYAxis, ApexPlotOptions, ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  colors: any;
  grid: ApexGrid;
};

const ELEMENT_DATA: any[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'app-precipitacion',
  templateUrl: './precipitacion.component.html',
  styleUrls: ['./precipitacion.component.scss']
})

export class PrecipitacionComponent  {

  chartOptionsLine: Partial<ChartOptions>;
  chartOptionsTime: Partial<ChartOptions>;

  displayedColumns: string[] = ['fecha', 'acumulado', 'intensidad', 'duracion', 'detalle'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {


    this.chartOptionsLine = {
      series: [
        {
          name: "Instantaneo", type: "column", color: "#9391FF",
          data: [0.1, 1, 0.2, 2, 0.4, 0.9, 0.3, 0.5, 0, 0.1, 1.3, 0.6, 1.7, 1.1, 0.8],
        },
        {
          name: "Acumulado", type: "line",
          data: [0.1, 1.1, 1.3, 1.5, 1.9, 2.8, 3.1, 3.6, 3.6, 3.7, 5, 5.6, 7.3, 8.4, 9.2],
        }
      ],
      chart: {
        height: 400, type: "line", stacked: false,
        toolbar: {
          tools: { download: true, selection: true, zoom: true, zoomin: false, zoomout: false, pan: false, },
          show: true, autoSelected: 'selection'
        }
      },
      dataLabels: { enabled: false },
      stroke: { width: [1, 2.5] },
      title: { text: "Precipitación (23/05/2019)", align: "left", offsetX: 10 },
      xaxis: {
        categories: ['5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00',
          '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
      },
      yaxis: [
        {
          axisTicks: { show: true }, axisBorder: { show: true, color: "#775DD0" }, labels: { style: { colors: "#775DD0" } },
          title: { text: "Precipitacion [mm]", style: { color: "#672E85" } }, tooltip: { enabled: true }
        },
        {
          axisTicks: { show: true }, axisBorder: { show: true, color: "#00E396" }, labels: { style: { colors: "#23814f" } },
          opposite: true, title: { text: "Precipitacion Acumulada [mm]", style: { color: "#23814f" } }, tooltip: { enabled: true }
        },
      ],
      tooltip: { fixed: { enabled: true } },
      legend: { position: "bottom", horizontalAlign: "center" }
    };

    this.chartOptionsTime = {
      series: [
        {
          name: "Bob",
          data: [
            { x: " Vicuña", y: [new Date("2019-03-02").getTime(), new Date("2019-03-04").getTime()], fillColor: "" },
            { x: " Serena", y: [new Date("2019-03-05").getTime(), new Date("2019-03-07").getTime()], fillColor: "#00E396" },
            { x: " Vicuña", y: [new Date("2019-03-09").getTime(), new Date("2019-03-11").getTime()], fillColor: "" }
          ]
        }, {
          name: "Danilo",
          data: [
            { x: " Serena", y: [new Date("2019-03-02").getTime(), new Date("2019-03-04").getTime()], fillColor: "" },
            { x: " Vicuña", y: [new Date("2019-03-05").getTime(), new Date("2019-03-07").getTime()], fillColor: "#00E396" },
            { x: " Serena", y: [new Date("2019-03-09").getTime(), new Date("2019-03-11").getTime()], fillColor: "" }
          ]
        },
      ],
      chart: {
        type: "rangeBar", height: 200,
        toolbar: {
          tools: { download: true, selection: false, zoom: true, zoomin: true, zoomout: true, pan: false, },
          show: true, autoSelected: 'selection'
        },
        events: {
          click: function (event, chartContext, config) {
            console.log(config)
          }
        }
      },
      title: { text: "Ocurrencia de Precipitaciones", align: "left", offsetX: 10 },
      plotOptions: { bar: { horizontal: true } },
      xaxis: { type: "datetime" },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light", type: "vertical", shadeIntensity: 0.25, gradientToColors: undefined,
          inverseColors: true, opacityFrom: 1, opacityTo: 1, stops: [50, 0, 100, 100]
        }
      },
      legend: { position: "bottom", horizontalAlign: "center" }
    };
  }
}
