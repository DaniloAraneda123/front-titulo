import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})

export class MapComponent {

	//Opciones del mapa
	public lon: number = -70.616334;
	public lat: number = -29.7530093;
	public zoom: number = 9;

	//Iconos
	private iconAzul: any = { url: '../../../assets/A.png', scaledSize: { width: 25, height: 30 } };
	private iconRojo: any = { url: '../../../assets/R.png', scaledSize: { width: 25, height: 30 } };
	private iconGris: any = { url: '../../../assets/G.png', scaledSize: { width: 25, height: 30 } };


	public localizacionEstaciones: any[] = [
		{ title: 'Algarrobal', lat: -29.9988307, lng: -70.587333, icon: this.iconAzul },
		{ title: 'Coquimbo [El Panul]', lat: -29.998736, lng: -71.39852, icon: this.iconAzul },
		{ title: 'El Jote', lat: -30.405266, lng: -70.279483, icon: this.iconAzul },
		{ title: 'El Tapado', lat: -30.1583, lng: -69.908179, icon: this.iconAzul },
		{ title: 'Estero Derecho', lat: -30.38407, lng: -70.412858, icon: this.iconAzul },
		{ title: 'Gabriela Mistral', lat: -29.97852, lng: -71.080386, icon: this.iconAzul },
		{ title: 'La Laguna [Elqui]', lat: -30.203112, lng: -70.037224, icon: this.iconAzul },
		{ title: 'La Serena [CEAZA]', lat: -29.915015, lng: -71.242214, icon: this.iconAzul },
		{ title: 'La Serena [Cerro Grande]', lat: -29.938475, lng: -71.223505, icon: this.iconAzul },
		{ title: 'La Serena [El Romeral]', lat: -29.754064, lng: -71.257442, icon: this.iconAzul },
		{ title: 'Las Cardas', lat: -30.251452, lng: -71.256903, icon: this.iconAzul },
		{ title: 'Llano de Las Liebres', lat: -30.257406, lng: -69.936986, icon: this.iconAzul },
		{ title: 'Llanos de Huanta', lat: -29.827418, lng: -70.354471, icon: this.iconAzul },
		{ title: 'Los Corrales', lat: -30.161408, lng: -69.875994, icon: this.iconAzul },
		{ title: 'Pan de Azucar', lat: -30.074646, lng: -71.238945, icon: this.iconAzul },
		{ title: 'Paso Agua Negra', lat: -30.190704, lng: -69.82553, icon: this.iconAzul },
		{ title: 'Pisco Elqui', lat: -30.129028, lng: -70.494712, icon: this.iconAzul },
		{ title: 'Punta Colorada', lat: -29.3541129, lng: -71.0328595, icon: this.iconAzul },
		{ title: 'Punta de Choros', lat: -29.24724, lng: -71.467969, icon: this.iconAzul },
		{ title: 'Rivadavia', lat: -29.96173, lng: -70.539081, icon: this.iconAzul },
		{ title: 'UCN Guayacan', lat: -29.96663, lng: -71.352844, icon: this.iconAzul },
		{ title: 'Vicuna', lat: -30.038318, lng: -70.696553, icon: this.iconAzul }];



	//Chips y filtro de estaciones
	separatorKeysCodes: number[] = [ENTER, COMMA];
	estacionCtrl = new FormControl();
	estacionesFiltradas: Observable<string[]>;
	estaciones: string[] = [];
	allEstaciones: string[] = this.localizacionEstaciones.map((estacion) => estacion.title);
	@ViewChild('estacionInput') estacionInput: ElementRef<HTMLInputElement>;


	constructor() {
		this.estacionesFiltradas = this.estacionCtrl.valueChanges.pipe(
			startWith(null),
			map((fruit: string | null) => fruit ? this._filter(fruit) : this.allEstaciones.slice()));
	}

	addEstacion(event: MatChipInputEvent): void {
		const estacion = (event.value || '').trim().toLowerCase();
		const estacion_encontrada = this.allEstaciones.find((elemento) => (elemento.toLowerCase() === estacion))

		// Agregamos la estacion
		if (estacion_encontrada !== undefined) {
			this.estaciones.push(estacion_encontrada);
			const index = this.allEstaciones.indexOf(estacion_encontrada, 0);
			this.allEstaciones.splice(index, 1)

			//Cambiamos el icono
			const indice = this.localizacionEstaciones.findIndex((elemento) => (elemento.title === estacion_encontrada))
			this.localizacionEstaciones[indice].icon = this.iconRojo
		}

		// Limpiamos el input
		event.chipInput!.clear();
		this.estacionCtrl.setValue(null);
	}

	removerEstacion(estacion: string): void {
		//Sacar de lista
		const index = this.estaciones.indexOf(estacion);
		if (index >= 0) {
			this.allEstaciones.push(this.estaciones[index])
			this.estaciones.splice(index, 1);
			this.estacionCtrl.setValue(null);
		}

		//Cambiar Icono
		const indice = this.localizacionEstaciones.findIndex((elemento) => (elemento.title === estacion))
		this.localizacionEstaciones[indice].icon = this.iconAzul
	}

	seleccionEstacion(event: MatAutocompleteSelectedEvent): void {
		//Agregamos
		const estacion = event.option.viewValue
		this.estaciones.push(estacion);
		const index = this.allEstaciones.indexOf(estacion, 0);
		this.allEstaciones.splice(index, 1)
		this.estacionInput.nativeElement.value = '';
		this.estacionCtrl.setValue(null);

		//Cambiamos el icono
		const indice = this.localizacionEstaciones.findIndex((elemento) => (elemento.title === estacion))
		this.localizacionEstaciones[indice].icon = this.iconRojo
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.allEstaciones.filter(fruit => fruit.toLowerCase().includes(filterValue));
	}

	clickEstacion(estacion: any, i: number) {

		const nombre = estacion.title
		if (!this.estaciones.includes(nombre)) {
			//Si no esta, la agregamos a la lista
			this.estaciones.push(nombre);
			const index = this.allEstaciones.indexOf(nombre, 0);
			this.allEstaciones.splice(index, 1)
			this.estacionCtrl.setValue(null);
			this.localizacionEstaciones[i] = { ...estacion, icon: this.iconRojo }
		} else {
			//Si esta, lo quitamos de la lista
			this.removerEstacion(nombre)
		}


		// this.modalService.open(estacion)
		// 	console.log("Tab Seleccionado", this.tabSeleccionado);
		// 	console.log("TipoCriterioSeleccionad", this.tipoCriterioSeleccionado);

		// 	if (this.tabSeleccionado != "Serie" && this.tabSeleccionado != "Histograma" && this.tabSeleccionado != "Registro") {


		// 	}
		// 	else {

		// 		this.customSerie.estacion = label;
		// 		this.customMes.estacion = label;
		// 		this.customPeriodo.estacion = label;
		// 		this.customHistogram.estacion = label;
		// 		this.customMesHistogram.estacion = label;
		// 		this.customAnioHistogram.estacion = label;
		// 		this.customPeriodoHistogram.estacion = label;
		// 		this.customRegistro.estacion = label;

		// 		// ENDPOINT 1

		// 		// this.customSerie.estacion = label

		// 		if (this.tabSeleccionado == "Serie" && this.criterioSeleccionado == "Customize") {
		// 			this._historicidadService.get_promedio_custom(this.customSerie).subscribe(
		// 				data4 => {

		// 					this.promedioCustom = data4;
		// 					if (Object.keys(this.promedioCustom).length > 0) {
		// 						console.log("Resultado", this.promedioCustom);
		// 						this.modalRef = this.modalService.open(ChartComponent, { size: 'xl' });
		// 						this.modalRef.componentInstance.data = data4;
		// 						this.modalRef.componentInstance.title = label;
		// 					}
		// 					else {
		// 						this.modalRef = this.modalService.open(AlertComponent);
		// 						this.modalRef.componentInstance.title = label;
		// 						this.modalRef.componentInstance.info = true;
		// 					}
		// 				}
		// 			);
		// 		}




		// 		// ENDPOINT 2
		// 		// this.customMes.estacion = label
		// 		if (this.tabSeleccionado == "Serie" && this.criterioSeleccionado == "Análisis por Mes") {
		// 			this._historicidadService.get_promedios_mes_anios(this.customMes).subscribe(
		// 				data4 => {
		// 					this.promedioCustom = data4;
		// 					if (Object.keys(this.promedioCustom).length > 0) {
		// 						console.log("Resultado", this.promedioCustom);
		// 						this.modalRef = this.modalService.open(ChartComponent, { size: 'xl' });
		// 						this.modalRef.componentInstance.data = data4;
		// 						this.modalRef.componentInstance.title = label;
		// 					}
		// 					else {
		// 						this.modalRef = this.modalService.open(AlertComponent);
		// 						this.modalRef.componentInstance.title = label;
		// 						this.modalRef.componentInstance.info = true;
		// 					}

		// 				}

		// 			);
		// 		}


		// 		// ENDPOINT 4
		// 		// this.customPeriodo.estacion = label
		// 		if (this.tabSeleccionado == "Serie" && this.criterioSeleccionado == "Análisis por Años") {
		// 			this._historicidadService.get_promedio_anios(this.customPeriodo).subscribe(
		// 				data4 => {
		// 					this.promedioCustom = data4;
		// 					if (Object.keys(this.promedioCustom).length > 0) {
		// 						console.log("Resultado", this.promedioCustom);
		// 						this.modalRef = this.modalService.open(ChartComponent, { size: 'xl' });
		// 						this.modalRef.componentInstance.data = data4;
		// 						this.modalRef.componentInstance.title = label;
		// 					}
		// 					else {
		// 						this.modalRef = this.modalService.open(AlertComponent);
		// 						this.modalRef.componentInstance.title = label;
		// 						this.modalRef.componentInstance.info = true;
		// 					}

		// 				}

		// 			);
		// 		}


		// 		// ENDPOINT 5
		// 		// this.customSerie = label
		// 		//this._inputs2.llamarSpinner();
		// 		//this.customPeriodoHistogram.altura='323232';
		// 		if (this.tabSeleccionado == "Histograma" && this.tipoCriterioSeleccionado == "Heladas" && this.criterioSeleccionado == "Análisis por Años") {
		// 			this._historicidadService.get_heladas_anios(this.customPeriodoHistogram).subscribe(
		// 				data4 => {
		// 					//this._inputs2.detenerSpinner();
		// 					this.cuentasCustom = data4;
		// 					if (Object.keys(this.cuentasCustom).length > 0) {
		// 						console.log("typeof Funciona", this.cuentasCustom);
		// 						this.modalRef = this.modalService.open(ChartBarComponent, { size: 'xl' });
		// 						this.modalRef.componentInstance.data = data4;
		// 						this.modalRef.componentInstance.title = label;

		// 					}
		// 					else {
		// 						this.modalRef = this.modalService.open(AlertComponent);
		// 						this.modalRef.componentInstance.title = label;
		// 						this.modalRef.componentInstance.info = true;

		// 					}

		// 				}

		// 			);

		// 		}



		// 		// ENDPOINT 6
		// 		// this.customSerie = label
		// 		if (this.tabSeleccionado == "Histograma" && this.tipoCriterioSeleccionado == "Heladas" && this.criterioSeleccionado == "Análisis por Mes") {
		// 			this._historicidadService.get_heladas_mes_anios(this.customMesHistogram).subscribe(
		// 				data4 => {
		// 					this.cuentasCustom = data4;
		// 					if (Object.keys(this.cuentasCustom).length > 0) {
		// 						console.log("typeof Funciona", this.cuentasCustom);
		// 						this.modalRef = this.modalService.open(ChartBarComponent, { size: 'xl' });
		// 						this.modalRef.componentInstance.data = data4;
		// 						this.modalRef.componentInstance.title = label;
		// 					}

		// 					else {
		// 						this.modalRef = this.modalService.open(AlertComponent);
		// 						this.modalRef.componentInstance.title = label;
		// 						this.modalRef.componentInstance.info = true;
		// 					}
		// 				}

		// 			);

		// 		}

		// 		// ENDPOINT 7
		// 		// this.customSerie = label
		// 		if (this.tabSeleccionado == "Histograma" && this.tipoCriterioSeleccionado == "Heladas" && this.criterioSeleccionado == "Análisis en un año") {
		// 			this._historicidadService.get_heladas_meses_anio(this.customAnioHistogram).subscribe(
		// 				data4 => {
		// 					this.cuentasCustom = data4;
		// 					if (Object.keys(this.cuentasCustom).length > 0) {
		// 						console.log("typeof Funciona", this.cuentasCustom);
		// 						this.modalRef = this.modalService.open(ChartBarComponent, { size: 'xl' });
		// 						this.modalRef.componentInstance.data = data4;
		// 						this.modalRef.componentInstance.title = label;

		// 					}
		// 					else {
		// 						this.modalRef = this.modalService.open(AlertComponent);
		// 						this.modalRef.componentInstance.title = label;
		// 						this.modalRef.componentInstance.info = true;
		// 					}

		// 				}

		// 			);
		// 		}

		// 		// ENDPOINT 8
		// 		// this.customSerie = label
		// 		if (this.tabSeleccionado == "Histograma" && this.tipoCriterioSeleccionado == "Heladas" && this.criterioSeleccionado == "Customize") {
		// 			this._historicidadService.get_heladas_custom(this.customHistogram).subscribe(
		// 				data4 => {
		// 					this.cuentasCustom = data4;
		// 					if (Object.keys(this.cuentasCustom).length > 0) {
		// 						console.log("typeof Funciona", this.cuentasCustom);
		// 						this.modalRef = this.modalService.open(ChartBarComponent, { size: 'xl' });
		// 						this.modalRef.componentInstance.data = data4;
		// 						this.modalRef.componentInstance.title = label;

		// 					}
		// 					else {
		// 						this.modalRef = this.modalService.open(AlertComponent);
		// 						this.modalRef.componentInstance.title = label;
		// 						this.modalRef.componentInstance.info = true;
		// 					}

		// 				}

		// 			);

		// 		}



		// 		// ENDPOINT 9
		// 		// this.customSerie = label
		// 		if (this.tabSeleccionado == "Histograma" && this.tipoCriterioSeleccionado == "Máximas" && this.criterioSeleccionado == "Análisis por Años") {
		// 			this._historicidadService.get_maximas_anios(this.customPeriodoHistogram).subscribe(
		// 				data4 => {
		// 					this.cuentasCustom = data4;
		// 					if (Object.keys(this.cuentasCustom).length > 0) {
		// 						console.log("typeof Funciona", this.cuentasCustom);
		// 						this.modalRef = this.modalService.open(ChartBarComponent, { size: 'xl' });
		// 						this.modalRef.componentInstance.data = data4;
		// 						this.modalRef.componentInstance.title = label;

		// 					}

		// 				}

		// 			);
		// 		}
		// 		// ENDPOINT 10
		// 		// this.customSerie = label
		// 		if (this.tabSeleccionado == "Histograma" && this.tipoCriterioSeleccionado == "Máximas" && this.criterioSeleccionado == "Análisis por Mes") {
		// 			this._historicidadService.get_maximas_mes_anios(this.customMesHistogram).subscribe(
		// 				data4 => {
		// 					this.cuentasCustom = data4;
		// 					if (Object.keys(this.cuentasCustom).length > 0) {
		// 						console.log("typeof Funciona", this.cuentasCustom);
		// 						this.modalRef = this.modalService.open(ChartBarComponent, { size: 'xl' });
		// 						this.modalRef.componentInstance.data = data4;
		// 						this.modalRef.componentInstance.title = label;

		// 					}
		// 					else {
		// 						this.modalRef = this.modalService.open(AlertComponent);
		// 						this.modalRef.componentInstance.title = label;
		// 						this.modalRef.componentInstance.info = true;
		// 					}

		// 				}

		// 			);
		// 		}
		// 		// ENDPOINT 11
		// 		// this.customSerie = label
		// 		if (this.tabSeleccionado == "Histograma" && this.tipoCriterioSeleccionado == "Máximas" && this.criterioSeleccionado == "Análisis en un año") {
		// 			this._historicidadService.get_maximas_meses_anio(this.customAnioHistogram).subscribe(
		// 				data4 => {
		// 					this.cuentasCustom = data4;
		// 					if (Object.keys(this.cuentasCustom).length > 0) {
		// 						console.log("typeof Funciona", this.cuentasCustom);
		// 						this.modalRef = this.modalService.open(ChartBarComponent, { size: 'xl' });
		// 						this.modalRef.componentInstance.data = data4;
		// 						this.modalRef.componentInstance.title = label;

		// 					}
		// 					else {
		// 						this.modalRef = this.modalService.open(AlertComponent);
		// 						this.modalRef.componentInstance.title = label;
		// 						this.modalRef.componentInstance.info = true;
		// 					}

		// 				}

		// 			);
		// 		}
		// 		// ENDPOINT 8
		// 		// this.customSerie = label
		// 		if (this.tabSeleccionado == "Histograma" && this.tipoCriterioSeleccionado == "Máximas" && this.criterioSeleccionado == "Customize") {
		// 			this._historicidadService.get_maximas_custom(this.customHistogram).subscribe(
		// 				data4 => {
		// 					this.cuentasCustom = data4;
		// 					if (Object.keys(this.cuentasCustom).length > 0) {
		// 						console.log("typeof Funciona", this.cuentasCustom);
		// 						this.modalRef = this.modalService.open(ChartBarComponent, { size: 'xl' });
		// 						this.modalRef.componentInstance.data = data4;
		// 						this.modalRef.componentInstance.title = label;

		// 					}
		// 					else {
		// 						this.modalRef = this.modalService.open(AlertComponent);
		// 						this.modalRef.componentInstance.title = label;
		// 						this.modalRef.componentInstance.info = true;
		// 					}

		// 				}

		// 			);
		// 		}


		// 		// ENDPOINT 13
		// 		// this.customSerie = label
		// 		if (this.tabSeleccionado == "Registro" && this.tipoCriterioSeleccionado == "Heladas") {
		// 			this._historicidadService.get_busqueda_heladas(this.customRegistro).subscribe(
		// 				data4 => {
		// 					this.cuentasCustom = data4;
		// 					if (Object.keys(this.cuentasCustom).length > 0) {
		// 						console.log("typeof Funciona", this.cuentasCustom);

		// 						var objetos = [];

		// 						for (let i = 0; i < this.cuentasCustom.fecha.length; i++) {
		// 							var object = {};
		// 							object['fecha'] = this.cuentasCustom.fecha[i];
		// 							object['registro'] = this.cuentasCustom.valor[i];

		// 							objetos.push(object);
		// 						}

		// 						this.modalRef = this.modalService.open(ChartTableComponent, { size: 'xl' });
		// 						this.modalRef.componentInstance.data = objetos;
		// 						this.modalRef.componentInstance.title = label;


		// 					}
		// 					else {
		// 						this.modalRef = this.modalService.open(AlertComponent);
		// 						this.modalRef.componentInstance.title = label;
		// 						this.modalRef.componentInstance.info = true;
		// 					}
		// 				}

		// 			);
		// 		}

		// 		// ENDPOINT 14
		// 		// this.customSerie = label
		// 		if (this.tabSeleccionado == "Registro" && this.tipoCriterioSeleccionado == "Máximas") {
		// 			this._historicidadService.get_busqueda_maximas(this.customRegistro).subscribe(
		// 				data4 => {
		// 					this.cuentasCustom = data4;
		// 					console.log(this.cuentasCustom)
		// 					if (Object.keys(this.cuentasCustom).length > 0) {
		// 						console.log("typeof Funciona", this.cuentasCustom);

		// 						var objetos = [];

		// 						for (let i = 0; i < this.cuentasCustom.fecha.length; i++) {
		// 							var object = {};
		// 							object['fecha'] = this.cuentasCustom.fecha[i];
		// 							object['registro'] = this.cuentasCustom.valor[i];

		// 							objetos.push(object);
		// 							console.log("largo", this.cuentasCustom.fecha.length);
		// 						}

		// 						this.modalRef = this.modalService.open(ChartTableComponent, { size: 'xl' });
		// 						this.modalRef.componentInstance.data = objetos;
		// 						this.modalRef.componentInstance.title = label;


		// 					}
		// 					else {
		// 						this.modalRef = this.modalService.open(AlertComponent);
		// 						this.modalRef.componentInstance.title = label;
		// 						this.modalRef.componentInstance.info = true;
		// 					}


		// 				}


		// 			);

		// 		}



		// 	}


		// }
		//constructor(){}



		// ngOnInit() {


		// 	this._inputs.receiveCustom().subscribe(data => {
		// 		this.customSerie = data;
		// 		console.log("Ingresando", this.customSerie);
		// 	}
		// 	);

		// 	this._inputs.receiveMes().subscribe(data => {
		// 		this.customMes = data;
		// 		console.log("Ingresando", this.customMes);
		// 	}
		// 	);

		// 	this._inputs.receivePeriodo().subscribe(data => {
		// 		this.customPeriodo = data;
		// 		console.log("Ingresando", this.customPeriodo);
		// 	}
		// 	);

		// 	this._inputs2.receiveCustomHistogram().subscribe(data2 => {
		// 		this.customHistogram = data2;
		// 		console.log("Ingresando", this.customHistogram);
		// 	}
		// 	);

		// 	this._inputs2.receiveMesHistogram().subscribe(data2 => {
		// 		this.customMesHistogram = data2;
		// 		console.log("Ingresando", this.customMesHistogram);
		// 	}
		// 	);

		// 	this._inputs2.receiveAnioHistogram().subscribe(data2 => {
		// 		this.customAnioHistogram = data2;
		// 		console.log("Ingresando", this.customAnioHistogram);
		// 	}
		// 	);

		// 	this._inputs2.receivePeriodoHistogram().subscribe(data2 => {
		// 		this.customPeriodoHistogram = data2;
		// 		console.log("Ingresando", this.customPeriodoHistogram);
		// 	}
		// 	);

		// 	this._inputs3.receiveCustomRegistro().subscribe(data3 => {
		// 		this.customRegistro = data3;
		// 		console.log("Ingresando", this.customRegistro);
		// 	}
		// 	);

		// 	// Criterios de búsqueda

		// 	this._inputs.receiveTab().subscribe(data5 => {
		// 		this.tabSeleccionado = data5;
		// 		console.log("Ingresando sidebar", this.tabSeleccionado);
		// 	}
		// 	);

		// 	this._inputs2.receiveTab().subscribe(data5 => {
		// 		this.tabSeleccionado = data5;
		// 		console.log("Ingresando histo", this.tabSeleccionado);
		// 	}
		// 	);

		// 	this._inputs3.receiveTab().subscribe(data5 => {
		// 		this.tabSeleccionado = data5;
		// 		console.log("Ingresando registr", this.tabSeleccionado);
		// 	}
		// 	);

		// 	this._inputs.receiveCriterio().subscribe(data6 => {
		// 		this.criterioSeleccionado = data6;
		// 		console.log("Ingresando", this.criterioSeleccionado);
		// 	}
		// 	);



		// 	this._inputs2.receiveCriterio().subscribe(data6 => {
		// 		this.criterioSeleccionado = data6;
		// 		console.log("Ingresando", this.criterioSeleccionado);
		// 	}
		// 	);

		// 	this._inputs3.receiveCriterio().subscribe(data6 => {
		// 		this.tipoCriterioSeleccionado = data6;
		// 		console.log("Ingresando", this.tipoCriterioSeleccionado);
		// 	}
		// 	);

		// 	this._inputs2.receiveTipoCriterio().subscribe(data7 => {
		// 		this.tipoCriterioSeleccionado = data7;
		// 		console.log("Ingresando", this.tipoCriterioSeleccionado);
		// 	}
		// 	);

		// }
	}
}

