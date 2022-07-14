import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ubicacioneEstaciones, iconos } from 'src/app/models/estaciones.mapa';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
	changeDetection:ChangeDetectionStrategy.OnPush
})

export class MapComponent {

	//Comunicacion
	@Output() stationsSelected: EventEmitter<string[]> = new EventEmitter<string[]>(true);
	comparative: boolean
	@Input() set setComparative(value: boolean) {
		this.clearAll()
		this.comparative = value
	}

	//Datos Mapa
	allStations = ubicacioneEstaciones

	//Opciones del mapa
	optionsMaps: google.maps.MapOptions = {
		center: { lat: -29.7530093, lng: -70.616334 },
		zoom: 8,
		/*restriction: {
			latLngBounds: {
				north: -29.3530093,
				south: -30.2530093,
				west: -71.616334,
				east: -69.816334,
			},
			strictBounds: false
		}
		*/
	}

	//Chips y filtro de estaciones
	separatorKeysCodes: number[] = [ENTER, COMMA];
	estacionCtrl = new FormControl();
	estacionesFiltradas: Observable<string[]>;
	_stationsSelected: string[] = [];
	_stationsUnselected: string[] = [];
	@ViewChild('estacionInput') estacionInput!: ElementRef<HTMLInputElement>;


	constructor() {
		//Filtrador
		this.estacionesFiltradas = this.estacionCtrl.valueChanges.pipe(
			startWith(null),
			map((station: string | null) => station ? this._filter(station) : this._stationsUnselected.slice()));

		this._stationsUnselected = this.allStations.map((estacion) => (estacion.opt.title))
		this.paintStations()
	}

	paintStations() {
		for (let i in this.allStations) {
			if (this._stationsSelected.includes(this.allStations[i].opt.title)) {
				this.allStations[i].opt = {
					...this.allStations[i].opt,
					icon: iconos.iconRojo
				}
			}
		}
	}


	addStation(event: MatChipInputEvent): void {

		//camparativa Activa
		if (this.comparative === false && this._stationsSelected.length === 1) return


		const estacion = (event.value || '').trim().toLowerCase();
		const estacion_encontrada = this._stationsUnselected.find((elemento) => (elemento.toLowerCase() === estacion))

		if (estacion_encontrada !== undefined) {
			// Agregamos
			const index = this._stationsUnselected.indexOf(estacion_encontrada, 0);
			this._stationsUnselected.splice(index, 1)
			this._stationsSelected.push(estacion_encontrada)

			//Cambiamos el icono
			const indice = this.allStations.findIndex((elemento) => (elemento.opt.title === estacion_encontrada))
			this.allStations[indice].opt = {
				...this.allStations[indice].opt,
				icon: iconos.iconAzul
			}
			console.log("emitido")
			this.stationsSelected.emit([...this._stationsSelected])
		}

		// Limpiamos
		event.chipInput!.clear();
		this.estacionCtrl.setValue(null);
	}

	removeStation(estacion: string): void {
		//Sacar de lista
		const index = this._stationsSelected.indexOf(estacion)
		this._stationsUnselected.push(this._stationsSelected[index])
		this._stationsSelected.splice(index, 1);

		//Cambiar Icono
		const indice = this.allStations.findIndex((elemento) => (elemento.opt.title === estacion))
		this.allStations[indice].opt = {
			...this.allStations[indice].opt,
			icon: iconos.iconAzul
		}

		//limpiamos el campo
		this.estacionCtrl.setValue(null);

		this.stationsSelected.emit([...this._stationsSelected])
	}

	selectionStation(event: MatAutocompleteSelectedEvent): void {

		//camparativa Activa
		if (this.comparative === false && this._stationsSelected.length === 1) return

		//Agregamos
		const estacion = event.option.viewValue
		const index = this._stationsUnselected.indexOf(estacion, 0);
		this._stationsUnselected.splice(index, 1)
		this._stationsSelected.push(estacion)

		//cambiar icono
		const indice = this.allStations.findIndex((el) => (el.opt.title === estacion))
		this.allStations[indice].opt = {
			...this.allStations[indice].opt,
			icon: iconos.iconRojo
		}

		//limpiar
		this.estacionInput.nativeElement.value = '';
		this.estacionCtrl.setValue(null);

		this.stationsSelected.emit([...this._stationsSelected])
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this._stationsUnselected.filter(fruit => fruit.toLowerCase().includes(filterValue));
	}


	clickMark(i: number) {
		if (this.comparative === false) this.emptyStations()

		const nombre = this.allStations[i].opt.title
		if (!this._stationsSelected.includes(nombre)) {
			//agregamos
			this._stationsSelected.push(nombre)
			const index = this._stationsUnselected.indexOf(nombre, 0);
			this._stationsUnselected.splice(index, 1)

			//cambiar icono
			this.allStations[i].opt = { ...this.allStations[i].opt, icon: iconos.iconRojo }

			//limpiamos
			this.estacionCtrl.setValue(null);
			this.stationsSelected.emit([...this._stationsSelected])
		}
		else {
			//Si esta, lo quitamos
			this.removeStation(nombre)
		}
	}

	addAll() {
		this._stationsSelected = this.allStations.map(el => el.opt.title)
		for (let i in this.allStations) {
			this.allStations[i].opt = {
				...this.allStations[i].opt,
				icon: iconos.iconRojo
			}
		}
		this.stationsSelected.emit([...this._stationsSelected])
	}

	emptyStations(){
		this._stationsSelected = []
		for (let i in this.allStations) {
			this.allStations[i].opt = {
				...this.allStations[i].opt,
				icon: iconos.iconAzul
			}
		}
	}

	clearAll() {
		this.emptyStations()
		this.stationsSelected.emit([])
	}
}