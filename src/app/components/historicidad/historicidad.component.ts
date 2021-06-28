//<reference types="@types/googlemaps" />


import { Component, OnInit, ViewChild } from '@angular/core';


declare var $: any;
declare var lat: number;
declare var lon: number;
declare var zoom: number;
declare const icon: any;



@Component({
  selector: 'app-historicidad',
  templateUrl: './historicidad.component.html',
  styleUrls: ['./historicidad.component.scss']
})
export class HistoricidadComponent implements OnInit{

  @ViewChild('content') content: any;

  //let icons: google.maps.Icon();
  lat: -30.0314094;
  lon: -70.7315968;
  zoom: 8;
  url: string='./assets/img/ceazamet.jpeg';
  title: string='Punta de Choros';
  icon = {
    url:this.url, scaledSize: new google.maps.Size(30,30)
  };
  mylocations = [
    { title:'Algarrobal', lat: -29.9988307, lng:-70.587333},
    { title:'Andacollo [Collowara]', lat: -30.248749, lng: -71.065259},
    { title:'Coquimbo [El Panul]', lat: -29.998736, lng: -71.39852},
    { title:'El Jote', lat: -30.405266, lng: -70.279483},
    { title:'El Tapado', lat: -30.1583, lng: -69.908179},
    { title:'Estero Derecho', lat: -30.38407, lng: -70.412858},
    { title:'Gabriela Mistral', lat: -29.97852, lng: -71.080386},
    { title:'La Laguna [Elqui]', lat: -30.203112, lng: -70.037224},
    { title:'La Serena [CEAZA]', lat: -29.915015, lng: -71.242214},
    { title:'La Serena [Cerro Grande]', lat: -29.938475, lng: -71.223505},
    { title:'La Serena [El Romeral]', lat: -29.754064, lng: -71.257442},
    { title:'Las Cardas', lat: -30.251452, lng: -71.256903},
    { title:'Llano de Las Liebres', lat: -30.257406, lng: -69.936986},
    { title:'Llanos de Huanta', lat: -29.827418, lng: -70.354471},
    { title:'Los Corrales', lat: -30.161408, lng: -69.875994},
    { title:'Pan de Azucar', lat: -30.074646, lng: -71.238945},
    { title:'Paso Agua Negra', lat: -30.190704, lng: -69.82553},
    { title:'Pisco Elqui', lat: -30.129028, lng: -70.494712},
    { title:'Punta Colorada', lat: -29.3541129, lng: -71.0328595},
    { title:'Punta de Choros', lat: -29.24724, lng: -71.467969},
    { title:'Rivadavia', lat: -29.96173, lng: -70.539081},
    { title:'UCN Guayacan', lat: -29.96663, lng: -71.352844},
    { title:'Vicuna', lat: -30.038318, lng: -70.696553}];


    clickedMarker(label: string) {
      //alert(`Nombre de la Estación: ${label}`);
      $("#myModal").modal('show');
    }
  ngOnInit() {

    console.log(typeof icon)
  }

  /*
[('Algarrobal', (-29.9988307, -70.587333)),
 ('Andacollo [Collowara]', (-30.248749, -71.065259)),
 ('Coquimbo [El Panul]', (-29.998736, -71.39852)),
 ('El Jote', (-30.405266, -70.279483)),
 ('El Tapado', (-30.1583, -69.908179)),
 ('Estero Derecho', (-30.38407, -70.412858)),
 ('Gabriela Mistral', (-29.97852, -71.080386)),
 ('La Laguna [Elqui]', (-30.203112, -70.037224)),
 ('La Serena [CEAZA]', (-29.915015, -71.242214)),
 ('La Serena [Cerro Grande]', (-29.938475, -71.223505)),
 ('La Serena [El Romeral]', (-29.754064, -71.257442)),
 ('Las Cardas', (-30.251452, -71.256903)),
 ('Llano de Las Liebres', (-30.257406, -69.936986)),
 ('Llanos de Huanta', (-29.827418, -70.354471)),
 ('Los Corrales', (-30.161408, -69.875994)),
 ('Pan de Azucar', (-30.074646, -71.238945)),
 ('Paso Agua Negra', (-30.190704, -69.82553)),
 ('Pisco Elqui', (-30.129028, -70.494712)),
 ('Punta Colorada', (-29.3541129, -71.0328595)),
 ('Punta de Choros', (-29.24724, -71.467969)),
 ('Rivadavia', (-29.96173, -70.539081)),
 ('UCN Guayacan', (-29.96663, -71.352844)),
 ('Vicuna', (-30.038318, -70.696553))]
  */


}
