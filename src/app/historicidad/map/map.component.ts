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
	public lon: number = -70.616334;
	public lat: number = -29.7530093;
	public zoom: number = 9;

	public estacionesDetalle: any[] = [
		{ title: 'Algarrobal', lat: -29.9988307, lng: -70.587333, icon: iconos.iconAzul },
		{ title: 'Coquimbo [El Panul]', lat: -29.998736, lng: -71.39852, icon: iconos.iconAzul },
		{ title: 'El Jote', lat: -30.405266, lng: -70.279483, icon: iconos.iconAzul },
		{ title: 'El Tapado', lat: -30.1583, lng: -69.908179, icon: iconos.iconAzul },
		{ title: 'Estero Derecho', lat: -30.38407, lng: -70.412858, icon: iconos.iconAzul },
		{ title: 'Gabriela Mistral', lat: -29.97852, lng: -71.080386, icon: iconos.iconAzul },
		{ title: 'La Laguna [Elqui]', lat: -30.203112, lng: -70.037224, icon: iconos.iconAzul },
		{ title: 'La Serena [CEAZA]', lat: -29.915015, lng: -71.242214, icon: iconos.iconAzul },
		{ title: 'La Serena [Cerro Grande]', lat: -29.938475, lng: -71.223505, icon: iconos.iconAzul },
		{ title: 'La Serena [El Romeral]', lat: -29.754064, lng: -71.257442, icon: iconos.iconAzul },
		{ title: 'Las Cardas', lat: -30.251452, lng: -71.256903, icon: iconos.iconAzul },
		{ title: 'Llano de Las Liebres', lat: -30.257406, lng: -69.936986, icon: iconos.iconAzul },
		{ title: 'Llanos de Huanta', lat: -29.827418, lng: -70.354471, icon: iconos.iconAzul },
		{ title: 'Los Corrales', lat: -30.161408, lng: -69.875994, icon: iconos.iconAzul },
		{ title: 'Pan de Azucar', lat: -30.074646, lng: -71.238945, icon: iconos.iconAzul },
		{ title: 'Paso Agua Negra', lat: -30.190704, lng: -69.82553, icon: iconos.iconAzul },
		{ title: 'Pisco Elqui', lat: -30.129028, lng: -70.494712, icon: iconos.iconAzul },
		{ title: 'Punta Colorada', lat: -29.3541129, lng: -71.0328595, icon: iconos.iconAzul },
		{ title: 'Punta de Choros', lat: -29.24724, lng: -71.467969, icon: iconos.iconAzul },
		{ title: 'Rivadavia', lat: -29.96173, lng: -70.539081, icon: iconos.iconAzul },
		{ title: 'UCN Guayacan', lat: -29.96663, lng: -71.352844, icon: iconos.iconAzul },
		{ title: 'Vicuna', lat: -30.038318, lng: -70.696553, icon: iconos.iconAzul }
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
			if (this.estaciones.length === 0) {
				this.estacionesDetalle.forEach((estacion, index) => {
					if (estacion.icon === iconos.iconRojo) {
						estacion.icon = iconos.iconAzul
					}
				})
			}

			this.comparativa = state.comparativa

		})

		this.estacionNoSeleccionadas = this.estacionesDetalle.map((estacion) => (estacion.title))
		this.pintarEstaciones()
	}

	pintarEstaciones() {
		for (let i in this.estacionesDetalle) {
			if (this.estaciones.includes(this.estacionesDetalle[i].title)) {
				this.estacionesDetalle[i].icon = iconos.iconRojo
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
			const indice = this.estacionesDetalle.findIndex((elemento) => (elemento.title === estacion_encontrada))
			this.estacionesDetalle[indice].icon = iconos.iconRojo
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
		const indice = this.estacionesDetalle.findIndex((elemento) => (elemento.title === estacion))
		this.estacionesDetalle[indice].icon = iconos.iconAzul

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
		const indice = this.estacionesDetalle.findIndex((elemento) => (elemento.title === estacion))
		this.estacionesDetalle[indice].icon = iconos.iconRojo

		//limpiar
		this.estacionInput.nativeElement.value = '';
		this.estacionCtrl.setValue(null);
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.estacionNoSeleccionadas.filter(fruit => fruit.toLowerCase().includes(filterValue));
	}


	clickEstacion(estacion: any, i: number) {

		if (this.comparativa === false) {
			this.store.dispatch(actionsHistoricidad.quitarAllEstaciones())
		}

		const nombre = estacion.title
		if (!this.estaciones.includes(nombre)) {
			//agregamos
			const index = this.estacionNoSeleccionadas.indexOf(nombre, 0);
			this.estacionNoSeleccionadas.splice(index, 1)
			this.store.dispatch(actionsHistoricidad.agregarEstacion({ estacion: nombre }))

			//cambiar icono
			this.estacionesDetalle[i].icon = iconos.iconRojo

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
			this.store.dispatch(actionsHistoricidad.agregarEstacion({ estacion: this.estacionesDetalle[i].title }))
			this.estacionesDetalle[i].icon = iconos.iconRojo
		}
	}

	clearAll() {
		this.store.dispatch(actionsHistoricidad.quitarAllEstaciones())
		for (let i in this.estacionesDetalle) {
			this.estacionesDetalle[i].icon = iconos.iconAzul
		}
	}
}

//Iconos
const iconos: any = {
	iconAzul: { url: '../../../assets/A.png', scaledSize: { width: 25, height: 30 } },
	iconRojo: { url: '../../../assets/R.png', scaledSize: { width: 25, height: 30 } },
	iconGris: { url: '../../../assets/G.png', scaledSize: { width: 25, height: 30 } }
}
