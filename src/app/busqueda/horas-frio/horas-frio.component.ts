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
  { position: "Vicuña", name: 110, weight: 12.0079, symbol: 17 },
  { position: "Otra 1", name: 70, weight: 14.0026, symbol: 19 },
  { position: "Otra 2", name: 81, weight: 16.941, symbol: 21 },
];


@Component({
  selector: 'app-horas-frio',
  templateUrl: './horas-frio.component.html',
  styleUrls: ['./horas-frio.component.scss']
})
export class HorasFrioComponent {
  chartOptionsLine: Partial<ChartOptions>;
  chartOptionsTime: Partial<ChartOptions>;

  displayedColumns: string[] = ['fecha', 'acumulado', 'intensidad', 'duracion', 'detalle'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  zoom: number = 8;
  lat: number = 51.673858;
  lon: number = 7.815982;

  clickedMarker(label: string, index: number) { console.log(`clicked the marker: ${label || index}`) }
  markerDragEnd(m: marker, $event: any) { console.log('dragEnd', m, $event); }
  markers: marker[] = [
    { lat: 51.673858, lng: 7.815982, label: 'A', draggable: false , hf:25  },
    { lat: 51.373858, lng: 7.215982, label: 'B', draggable: false, hf:10 },
    { lat: 51.123858, lng: 7.595982, label: 'C', draggable: false , hf:3}
  ]

  constructor() {
    this.chartOptionsLine = {
      series: [
        {
          name: "Diario", type: "column", color: "#9391FF",
          data: [0.1, 1, 0.2, 2, 0.4, 0.9, 0.3, 0.5, 0, 0.1, 1.3, 0.6],
        },
        {
          name: "Acumulado", type: "line",
          data: [0.1, 1.1, 1.3, 1.5, 1.9, 2.8, 3.1, 3.6, 3.6, 3.7, 5, 5.6],
        }
      ],
      chart: {
        height: 283, type: "line", stacked: false,
        toolbar: {
          tools: { download: true, selection: true, zoom: true, zoomin: false, zoomout: false, pan: false, },
          show: true, autoSelected: 'selection'
        }
      },
      dataLabels: { enabled: false },
      stroke: { width: [1, 2.5] },
      title: { text: "Horas Frio (9/6/20 - 20/6/20) Vicuña", align: "left", offsetX: 10 },
      xaxis: {
        categories: ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18','19', '20']
      },
      yaxis: [
        {
          axisTicks: { show: true }, axisBorder: { show: true, color: "#775DD0" }, labels: { style: { colors: "#775DD0" } },
          title: { text: "Horas Frio Diaria [Hf]", style: { color: "#672E85" } }, tooltip: { enabled: true }
        },
        {
          axisTicks: { show: true }, axisBorder: { show: true, color: "#00E396" }, labels: { style: { colors: "#23814f" } },
          opposite: true, title: { text: "Horas Frio Acumulada [Hf]", style: { color: "#23814f" } }, tooltip: { enabled: true }
        },
      ],
      // tooltip: { fixed: { enabled: true } },
      legend: { position: "bottom", horizontalAlign: "center" }
    };

  }


  private map: google.maps.Map = null;
  private heatmap: google.maps.visualization.HeatmapLayer = null;



  onMapLoad(mapInstance: google.maps.Map) {
    this.map = mapInstance;

    const coords: (google.maps.visualization.WeightedLocation | google.maps.LatLng)[] = [
      { location: new google.maps.LatLng(51.673858, 7.815982), weight:this.markers[0].hf },
      { location: new google.maps.LatLng(51.373858, 7.215982), weight:this.markers[1].hf },
      { location: new google.maps.LatLng(51.123858, 7.595982), weight:this.markers[2].hf },
    ]

    this.heatmap = new google.maps.visualization.HeatmapLayer({
      map: this.map,
      data: coords,
      radius: 45,
      opacity: 0.9,
      maxIntensity: 10,
      gradient: ['rgba(0, 255, 255, 0)', 'rgba(0, 255, 255, 1)', 'rgba(0, 191, 255, 1)', 'rgba(0, 127, 255, 1)', 'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)', 'rgba(0, 0, 223, 1)', 'rgba(0, 0, 191, 1)', 'rgba(0, 0, 159, 1)', 'rgba(0, 0, 127, 1)', 'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)', 'rgba(191, 0, 31, 1)', 'rgba(255, 0, 0, 1)']
    });
  }
}
interface marker { lat: number; lng: number; label?: string; draggable: boolean; hf:number }