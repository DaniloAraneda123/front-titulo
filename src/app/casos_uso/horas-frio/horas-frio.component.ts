import { BehaviorSubject, fromEvent, Observable, of } from 'rxjs';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HeatmapData, MapCircle, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  ApexAxisChartSeries, ApexChart, ApexFill, ApexTooltip, ApexXAxis, ApexLegend, ApexDataLabels,
  ApexTitleSubtitle, ApexYAxis, ApexPlotOptions, ApexGrid
} from "ng-apexcharts";
import { debounceTime, tap } from 'rxjs/operators';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;a
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
  { position: "Otra 2", name: 81, weight: 16.941, symbol: 21 },
  { position: "Otra 2", name: 81, weight: 16.941, symbol: 21 },
  { position: "Otra 2", name: 81, weight: 16.941, symbol: 21 },
  { position: "Otra 2", name: 81, weight: 16.941, symbol: 21 },
];


@Component({
  selector: 'app-horas-frio',
  templateUrl: './horas-frio.component.html',
  styleUrls: ['./horas-frio.component.scss']
})

export class HorasFrioComponent implements OnInit {
  chartOptionsLine: Partial<ChartOptions>;
  chartOptionsTime: Partial<ChartOptions>;

  displayedColumns: string[] = ['fecha', 'acumulado', 'intensidad', 'duracion', 'detalle'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MapCircle, {static:false}) circulo!: google.maps.Circle
  cambioCirculo: BehaviorSubject<any> = new BehaviorSubject({})


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
        height: 345, type: "line", stacked: false,
        toolbar: {
          tools: { download: true, selection: true, zoom: true, zoomin: false, zoomout: false, pan: false, },
          show: true, autoSelected: 'selection'
        }
      },
      dataLabels: { enabled: false },
      stroke: { width: [1, 2.5] },
      title: { text: "Horas Frio (9/6/20 - 20/6/20) Vicuña", align: "left", offsetX: 10 },
      xaxis: { categories: ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'] },
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

    // this.estaciones = this.markers1.map((el) => (el.opt.title))
  }

  ngOnInit(): void {
    this.cambioCirculo.pipe(
      debounceTime(100)
    ).subscribe((evento: any) => {
      if(this.circulo){
        const bordes = this.circulo.getBounds()
        for (let i in this.markers1) {
          bordes?.contains(this.markers1[i].pos) ?
            this.cambiarIcono(i, iconos.iconRojo) : this.cambiarIcono(i, iconos.iconAzul)
        }
      }
    })
  }

  optionsMaps: google.maps.MapOptions = {
    center: { lat: -29.7530093, lng: -70.616334 },
    zoom: 9,
    restriction: {
      latLngBounds: {
        north: -29.3530093,
        south: -30.2530093,
        west: -71.616334,
        east: -69.816334,
      },
      strictBounds: false
    }
  }

  heatmapOptions = { radius: 40, opacity: 0.8, }
  heatmapData: HeatmapData = [
    { location: new google.maps.LatLng(-29.9988307, -70.587333), weight: 30 },
    { location: new google.maps.LatLng(-30.038318, -70.696553), weight: 20 },
    { location: new google.maps.LatLng(-29.96173, -70.539081), weight: 10 }
  ];

  optionsCircle: google.maps.CircleOptions = {
    center: { lat: -29.7530093, lng: -70.616334 },
    radius: 30000, fillColor: 'black', fillOpacity: 0.2,
    editable: true, draggable: true, strokeWeight: 0
  }

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  markers1: { pos: google.maps.LatLngLiteral, opt: google.maps.MarkerOptions }[] = [
    { pos: { lat: -29.9988307, lng: -70.587333 }, opt: { icon: iconos.iconAzul, title: 'Algarrobal' } },
    { pos: { lat: -29.998736, lng: -71.39852 }, opt: { icon: iconos.iconAzul, title: 'Coquimbo [El Panul]' } },
    { pos: { lat: -30.405266, lng: -70.279483 }, opt: { icon: iconos.iconAzul, title: 'El Jote' } },
    { pos: { lat: -30.1583, lng: -69.908179 }, opt: { icon: iconos.iconAzul, title: 'El Tapado' } },
    { pos: { lat: -30.38407, lng: -70.412858 }, opt: { icon: iconos.iconAzul, title: 'Estero Derecho' } },
    { pos: { lat: -29.97852, lng: -71.080386 }, opt: { icon: iconos.iconAzul, title: 'Gabriela Mistral' } },
    { pos: { lat: -30.203112, lng: -70.037224 }, opt: { icon: iconos.iconAzul, title: 'La Laguna [Elqui]' } },
    { pos: { lat: -29.915015, lng: -71.242214 }, opt: { icon: iconos.iconAzul, title: 'La Serena [CEAZA]' } },
    { pos: { lat: -29.938475, lng: -71.223505 }, opt: { icon: iconos.iconAzul, title: 'La Serena [Cerro Grande]' } },
    { pos: { lat: -29.754064, lng: -71.257442 }, opt: { icon: iconos.iconAzul, title: 'La Serena [El Romeral]' } },
    { pos: { lat: -30.251452, lng: -71.256903 }, opt: { icon: iconos.iconAzul, title: 'Las Cardas' } },
    { pos: { lat: -30.257406, lng: -69.936986 }, opt: { title: 'Llano de Las Liebres', icon: iconos.iconAzul } },
    { pos: { lat: -29.827418, lng: -70.354471 }, opt: { title: 'Llanos de Huanta', icon: iconos.iconAzul } },
    { pos: { lat: -30.161408, lng: -69.875994 }, opt: { title: 'Los Corrales', icon: iconos.iconAzul } },
    { pos: { lat: -30.074646, lng: -71.238945 }, opt: { title: 'Pan de Azucar', icon: iconos.iconAzul } },
    { pos: { lat: -30.190704, lng: -69.82553 }, opt: { title: 'Paso Agua Negra', icon: iconos.iconAzul } },
    { pos: { lat: -30.129028, lng: -70.494712 }, opt: { title: 'Pisco Elqui', icon: iconos.iconAzul } },
    { pos: { lat: -29.3541129, lng: -71.0328595 }, opt: { title: 'Punta Colorada', icon: iconos.iconAzul } },
    { pos: { lat: -29.24724, lng: -71.467969 }, opt: { title: 'Punta de Choros', icon: iconos.iconAzul } },
    { pos: { lat: -29.96173, lng: -70.539081 }, opt: { title: 'Rivadavia', icon: iconos.iconAzul } },
    { pos: { lat: -29.96663, lng: -71.352844 }, opt: { title: 'UCN Guayacan', icon: iconos.iconAzul } },
    { pos: { lat: -30.038318, lng: -70.696553 }, opt: { title: 'Vicuna', icon: iconos.iconAzul } }
  ]


  changeCircle($event: any) {
    this.cambioCirculo.next($event)
  }

  cambiarIcono(i: any, icono: any) {
    this.markers1[i].opt = {
      ...this.markers1[i].opt,
      icon: icono
    }
  }

  mapaArea:boolean
  seleccionMapa(valor:any){
    this.mapaArea = valor.value == 'area' ? true : false
    
  }

  checkTabla(evento:any, estacion:string){
    console.log(evento, estacion)
  }

  clickTabla( estacion:string, check:any){
    console.log(estacion,check)
    check.toggle()
  }
}

const iconos: any = {
  iconAzul: { url: 'assets/A.png', scaledSize: { width: 25, height: 25 } },
  iconRojo: { url: 'assets/R.png', scaledSize: { width: 25, height: 25 } },
  iconGris: { url: 'assets/G.png', scaledSize: { width: 25, height: 25 } }
}
