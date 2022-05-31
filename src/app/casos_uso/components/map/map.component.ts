import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { HeatmapData, MapCircle } from '@angular/google-maps';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { iconos, ubicacioneEstaciones } from 'src/app/models/estaciones.mapa';
import { EstacionesService } from 'src/app/services/estaciones.service';


@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

	//LOGICA
	estaciones: string[] = [];
	@Output() selectedStations = new EventEmitter<string[]>();
	mapSelectionType: string = "individual"
	stationsFilter: string = "nearest"
	point!: google.maps.LatLngLiteral
	nbrStations: number = 4

	//MAPA
	optionsMaps: google.maps.MapOptions = {
		center: { lat: -29.7530093, lng: -70.616334 },
		zoom: 9,
		restriction: {
			latLngBounds: {
				north: -29.0530093, south: -30.4930093, west: -71.816334, east: -69.616334,
			},
			strictBounds: false
		}
	}
	mapMarkers: { pos: google.maps.LatLngLiteral, opt: google.maps.MarkerOptions }[] = [...ubicacioneEstaciones]

	//AREA CIRCLE MAP
	@ViewChild(MapCircle, { static: false }) circulo!: google.maps.Circle
	cambioCirculo: BehaviorSubject<any> = new BehaviorSubject({})
	cambioCirculo$: Subscription;
	optionsCircle: google.maps.CircleOptions = {
		center: { lat: -29.7530093, lng: -70.616334 },
		radius: 30000, fillColor: 'black', fillOpacity: 0.2,
		editable: true, draggable: true, strokeWeight: 0
	}

	//HEAT MAP
	heatmapOptions = { radius: 40, opacity: 0.8 }
	heatmapData: HeatmapData = [/* { location: new google.maps.LatLng(-29.9988307, -70.587333), weight: 0 }*/];
	heatMapOn: boolean = false

	//HTML OPTIONS
	mapSelectionItems: { value: string, label: string }[] = [
		{ value: "individual", label: "Selección Individual" },
		{ value: "area", label: "Selección por Area" },
		{ value: "point", label: "Selección por Punto" }
	]
	pointSelectionItems: { value: string, label: string }[] = [
		{ value: "nearest", label: "Estacion mas Cercana" },
		{ value: "coastline", label: "Linea de Costa Similar" },
		{ value: "height", label: "Altitud Similar" }
	]


	constructor(
		private _stationsService: EstacionesService
	) { }

	ngOnInit(): void {
		for (let i in this.mapMarkers) {
			this.mapMarkers[i].opt = { ...this.mapMarkers[i].opt, icon: iconos.iconAzul }
		}

		this.cambioCirculo$ = this.cambioCirculo.pipe(debounceTime(400)).subscribe((evento: any) => {
			if (this.circulo) {
				const bordes = this.circulo.getBounds()
				this.estaciones = []
				for (let i in this.mapMarkers) {
					if (bordes?.contains(this.mapMarkers[i].pos)) {
						this.mapMarkers[i].opt = { ...this.mapMarkers[i].opt, icon: iconos.iconRojo }
						this.estaciones.push(this.mapMarkers[i].opt.title)
					} else {
						this.mapMarkers[i].opt = { ...this.mapMarkers[i].opt, icon: iconos.iconAzul }
					}
				}
				this.selectedStations.emit(this.estaciones)
			}
		})
	}

	@Input() set stationsNoData(stationsNoData: string[]) {
		if (stationsNoData.length > 0) {
			for (let i in this.mapMarkers) {
				if (stationsNoData.includes(this.mapMarkers[i].opt.title)) {
					this.mapMarkers[i].opt = { ...this.mapMarkers[i].opt, icon: iconos.iconGris }
				}
			}
		}
	}

	changeCircle($event: any) { this.cambioCirculo.next($event) }

	clickEstacion(i: number) {
		this.estaciones = [...this.estaciones]
		if (this.mapSelectionType == 'individual') {
			const nombre = this.mapMarkers[i].opt.title
			if (!this.estaciones.includes(nombre)) {
				this.estaciones.push(nombre)
				this.mapMarkers[i].opt = { ...this.mapMarkers[i].opt, icon: iconos.iconRojo }
			}
			else {
				this.removerEstacion(nombre)
			}
			this.selectedStations.emit(this.estaciones)
		}
	}

	removerEstacion(estacion: string): void {

		//Sacar de lista
		const index = this.estaciones.indexOf(estacion);
		this.estaciones.splice(index, 1)

		//Cambiar Icono
		const indice = this.mapMarkers.findIndex((elemento) => (elemento.opt.title === estacion))
		this.mapMarkers[indice].opt = { ...this.mapMarkers[indice].opt, icon: iconos.iconAzul }
	}

	changeMapSelectionType(type: string) {
		this.clearMarks()
		this.point = undefined
		this.estaciones = []
		this.mapSelectionType = type
		if (ubicacioneEstaciones.length < this.mapMarkers.length) this.mapMarkers.pop()
	}

	clearMarks() {
		for (let i in this.mapMarkers) {
			if (this.mapMarkers[i].opt.title != "Custom") {
				this.mapMarkers[i].opt = { ...this.mapMarkers[i].opt, icon: iconos.iconAzul }
			}
		}
	}

	addPointCustom(event: google.maps.MapMouseEvent) {
		if (this.mapSelectionType == "point") {
			this.point = event.latLng.toJSON()
			if (ubicacioneEstaciones.length < this.mapMarkers.length) this.mapMarkers.pop()
			this.mapMarkers.push({
				pos: event.latLng.toJSON(),
				opt: {
					title: 'Custom'
				}
			})
			this.requestStationsFilter(this.stationsFilter)
		}
	}

	requestStationsFilter(filter: string) {
		this.clearMarks()
		this.estaciones = []
		this.stationsFilter = filter
		if (filter == "nearest") this._stationsService.requestStationsNearest(this.point).pipe(take(1))
			.subscribe((stations) => {
				for (let i = 0; i < 5; i++) {
					let index = this.mapMarkers.findIndex((el) => el.opt.title == stations.cercano[i][0])
					this.mapMarkers[index].opt = { ...this.mapMarkers[index].opt, icon: iconos.iconRojo }
					this.estaciones.push(stations.cercano[i][0])
				}
				this.selectedStations.emit(this.estaciones)
			})

		if (filter == "coastline") this._stationsService.requestStationsCoastline(this.point).pipe(take(1))
			.subscribe((stations) => {
				for (let i = 0; i < 5; i++) {
					let index = this.mapMarkers.findIndex((el) => el.opt.title == stations.linea_costa[i][0])
					this.mapMarkers[index].opt = { ...this.mapMarkers[index].opt, icon: iconos.iconRojo }
					this.estaciones.push(stations.linea_costa[i][0])
				}
				this.selectedStations.emit(this.estaciones)
			})

			
		if (filter == "height") this._stationsService.requestStationsHeight(this.point).pipe(take(1))
			.subscribe((stations) => {
				for (let i = 0; i < 5; i++) {
					let index = this.mapMarkers.findIndex((el) => el.opt.title == stations.altura[i][0])
					this.mapMarkers[index].opt = { ...this.mapMarkers[index].opt, icon: iconos.iconRojo }
					this.estaciones.push(stations.altura[i][0])

				}
				this.selectedStations.emit(this.estaciones)
			})
	}

	ngOnDestroy(): void {
		this.cambioCirculo$.unsubscribe()
	}
}
