import { Component } from '@angular/core';

@Component({
	selector: 'app-interpolacion',
	templateUrl: './interpolacion.component.html',
	styleUrls: ['./interpolacion.component.scss']
})
export class InterpolacionComponent {
	constructor() { }


	// lat: number = 37.774546;
	// lon: number = -122.433523;
	// zoom: number = 13;
	// private map: google.maps.Map = null;
	// private heatmap: google.maps.visualization.HeatmapLayer = null;
	onMapLoad(mapInstance: google.maps.Map) { }
	// 	this.map = mapInstance;
	// 	// here our in other method after you get the coords; but make sure map is loaded
	// 	const coords: (google.maps.visualization.WeightedLocation | google.maps.LatLng)[] = [
	// 		{ location: new google.maps.LatLng(37.782, -122.447), weight: 0.5 },
	// 		new google.maps.LatLng(37.782, -122.445),
	// 		{ location: new google.maps.LatLng(37.782, -122.443), weight: 2 },
	// 		{ location: new google.maps.LatLng(37.782, -122.441), weight: 25 },
	// 		{ location: new google.maps.LatLng(37.782, -122.439), weight: 10 },
	// 		new google.maps.LatLng(37.782, -122.437),
	// 		{ location: new google.maps.LatLng(37.782, -122.435), weight: 1 },
	// 		{ location: new google.maps.LatLng(37.785, -122.447), weight: 3 },
	// 		{ location: new google.maps.LatLng(37.785, -122.445), weight: 2 },
	// 		new google.maps.LatLng(37.785, -122.443),
	// 		{ location: new google.maps.LatLng(37.785, -122.441), weight: 0.5 },
	// 		new google.maps.LatLng(37.785, -122.439),
	// 		{ location: new google.maps.LatLng(37.785, -122.437), weight: 15 },
	// 		{ location: new google.maps.LatLng(37.785, -122.435), weight: 3 }
	// 	] // can also be a google.maps.MVCArray with LatLng[] inside   
	// 	this.heatmap = new google.maps.visualization.HeatmapLayer({
	// 		map: this.map,
	// 		data: coords,
	// 		radius: 15,
	// 		opacity: 0.9,
	// 		maxIntensity: 10,
	// 		gradient: ['rgba(0, 255, 255, 0)', 'rgba(0, 255, 255, 1)', 'rgba(0, 191, 255, 1)', 'rgba(0, 127, 255, 1)', 'rgba(0, 63, 255, 1)',
	// 			'rgba(0, 0, 255, 1)', 'rgba(0, 0, 223, 1)', 'rgba(0, 0, 191, 1)', 'rgba(0, 0, 159, 1)', 'rgba(0, 0, 127, 1)', 'rgba(63, 0, 91, 1)',
	// 			'rgba(127, 0, 63, 1)', 'rgba(191, 0, 31, 1)', 'rgba(255, 0, 0, 1)']
	// 	});
	// }




	zoom: number = 8;
	lat: number = 51.673858;
	lon: number = 7.815982;

	clickedMarker(label: string, index: number) { console.log(`clicked the marker: ${label || index}`) }
	markerDragEnd(m: marker, $event: any) { console.log('dragEnd', m, $event); }

	markers: marker[] = [
		{ lat: 51.673858, lng: 7.815982, label: 'A', draggable: true },
		{ lat: 51.373858, lng: 7.215982, label: 'B', draggable: false },
		{ lat: 51.723858, lng: 7.895982, label: 'C', draggable: true }
	]

	// cambioRadio(event$: number) {

	// 	this.radio = event$
	// 	console.log(event$,'sadasadsdasdasdasd')
	// }

	// cambioPosicion($event: google.maps.MouseEvent) {
	// 	console.log($event)
	// }

	// console($event:any){
	// 	console.log("sadasdas")
	// }

}

interface marker { lat: number; lng: number; label?: string; draggable: boolean; }
