import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, withLatestFrom } from 'rxjs/operators';


//Redux
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import * as actionsHistoricidad from '../../store/actions/historicidad.actions'

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})



export class MapComponent implements OnDestroy {

	//Opciones del mapa
	center: google.maps.LatLngLiteral = { lat: -29.7530093, lng: -70.616334 };
	zoom: number = 9;

	estacionesDetalle: { pos: google.maps.LatLngLiteral, opt: google.maps.MarkerOptions }[] = [
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


	//Chips y filtro de estaciones
	separatorKeysCodes: number[] = [ENTER, COMMA];
	estacionCtrl = new FormControl();
	estacionesFiltradas: Observable<string[]>;
	estaciones: string[] = [];
	estacionNoSeleccionadas: string[];
	comparativa: boolean = false
	suscripcion$: Subscription;
	@ViewChild('estacionInput') estacionInput!: ElementRef<HTMLInputElement>;


	constructor(private store: Store<AppState>) {
		//Filtrador
		this.estacionesFiltradas = this.estacionCtrl.valueChanges.pipe(
			startWith(null),
			map((fruit: string | null) => fruit ? this._filter(fruit) : this.estacionNoSeleccionadas.slice()));

		//State Change
		this.suscripcion$ = this.store.select('historicidad').subscribe((state) => {
			this.estaciones = [...state.estaciones]

			//Volvemos todos los iconos azules si esta vacia la lista
			// if (this.estaciones.length === 0) {
			// 	this.estacionesDetalle.forEach((estacion, index) => {
			// 		if (estacion.opt.icon === iconos.iconRojo) {
			// 			estacion.opt.icon = iconos.iconAzul
			// 			console.log('sadasd')
			// 		}
			// 	})
			// }

			this.comparativa = state.comparativa

		})

		this.estacionNoSeleccionadas = this.estacionesDetalle.map((estacion) => (estacion.opt.title))
		this.pintarEstaciones()
	}

	pintarEstaciones() {
		for (let i in this.estacionesDetalle) {
			if (this.estaciones.includes(this.estacionesDetalle[i].opt.title)) {
				this.estacionesDetalle[i].opt = {
					...this.estacionesDetalle[i].opt,
					icon: { url: `assets/R.png`, scaledSize: new google.maps.Size(25, 25) }
				}
			}
		}
	}

	ngOnDestroy(): void { this.suscripcion$.unsubscribe() }

	addEstacion(event: MatChipInputEvent): void {

		//camparativa Activa
		if (this.comparativa === false && this.estaciones.length === 1) {
			return
		}

		const estacion = (event.value || '').trim().toLowerCase();
		const estacion_encontrada = this.estacionNoSeleccionadas.find((elemento) => (elemento.toLowerCase() === estacion))

		if (estacion_encontrada !== undefined) {
			// Agregamos
			const index = this.estacionNoSeleccionadas.indexOf(estacion_encontrada, 0);
			this.estacionNoSeleccionadas.splice(index, 1)
			this.store.dispatch(actionsHistoricidad.agregarEstacion({ estacion: estacion_encontrada }))

			//Cambiamos el icono
			const indice = this.estacionesDetalle.findIndex((elemento) => (elemento.opt.title === estacion_encontrada))
			this.estacionesDetalle[indice].opt = {
				...this.estacionesDetalle[indice].opt,
				icon: { url: 'assets/R.png', scaledSize: new google.maps.Size(25, 25) }
			}
		}

		// Limpiamos
		event.chipInput!.clear();
		this.estacionCtrl.setValue(null);
	}

	removerEstacion(estacion: string): void {
		//Sacar de lista
		const index = this.estaciones.indexOf(estacion);
		this.estacionNoSeleccionadas.push(this.estaciones[index])
		this.store.dispatch(actionsHistoricidad.quitarEstacion({ estacion: estacion }))

		//Cambiar Icono
		const indice = this.estacionesDetalle.findIndex((elemento) => (elemento.opt.title === estacion))
		this.estacionesDetalle[indice].opt = {
			...this.estacionesDetalle[indice].opt,
			icon: iconos.iconAzul
		}

		//limpiamos el campo
		this.estacionCtrl.setValue(null);
	}

	seleccionEstacion(event: MatAutocompleteSelectedEvent): void {

		//camparativa Activa
		if (this.comparativa === false && this.estaciones.length === 1) return

		//Agregamos
		const estacion = event.option.viewValue
		const index = this.estacionNoSeleccionadas.indexOf(estacion, 0);
		this.estacionNoSeleccionadas.splice(index, 1)
		this.store.dispatch(actionsHistoricidad.agregarEstacion({ estacion: estacion }))

		//cambiar icono
		const indice = this.estacionesDetalle.findIndex((elemento) => (elemento.opt.title === estacion))
		this.estacionesDetalle[indice].opt = {
			...this.estacionesDetalle[indice].opt,
			icon: iconos.iconRojo
		}

		//limpiar
		this.estacionInput.nativeElement.value = '';
		this.estacionCtrl.setValue(null);
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.estacionNoSeleccionadas.filter(fruit => fruit.toLowerCase().includes(filterValue));
	}


	clickEstacion( i: number) {

		if (this.comparativa === false) {
			this.clearAll()
		}

		const nombre = this.estacionesDetalle[i].opt.title
		if (!this.estaciones.includes(nombre)) {
			//agregamos
			const index = this.estacionNoSeleccionadas.indexOf(nombre, 0);
			this.estacionNoSeleccionadas.splice(index, 1)
			this.store.dispatch(actionsHistoricidad.agregarEstacion({ 
				estacion: nombre 
			}))

			//cambiar icono
			this.estacionesDetalle[i].opt = {
				...this.estacionesDetalle[i].opt,
				icon: iconos.iconRojo
			}

			//limpiamos
			this.estacionCtrl.setValue(null);
		}
		else {
			//Si esta, lo quitamos
			this.removerEstacion(nombre)
		}
	}

	addAll() {
		this.store.dispatch(actionsHistoricidad.quitarAllEstaciones())
		for (let i in this.estacionesDetalle) {
			this.store.dispatch(actionsHistoricidad.agregarEstacion({ estacion: this.estacionesDetalle[i].opt.title }))
			this.estacionesDetalle[i].opt = {
				...this.estacionesDetalle[i].opt,
				icon: iconos.iconRojo
			}
		}
	}

	clearAll() {
		this.store.dispatch(actionsHistoricidad.quitarAllEstaciones())
		for (let i in this.estacionesDetalle) {
			this.estacionesDetalle[i].opt = {
				...this.estacionesDetalle[i].opt,
				icon: iconos.iconAzul
			}
		}
	}
}

//Iconos
const iconos: any = {
	iconAzul: { url: 'assets/A.png', scaledSize: new google.maps.Size(25, 30) },
	iconRojo: { url: 'assets/R.png', scaledSize: new google.maps.Size(25, 30) }
}
