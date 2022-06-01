import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

//STORE
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
//import * as hfActions from 'src/app/store/actions/horasFrio.actions'
import * as evActions from 'src/app/store/actions/evapotranspiracion.actions'

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { DataEstacion, ResponseSeries, ResponseSeriesComparacion } from 'src/app/models/api.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TablaComparacion } from 'src/app/models/tabla.interface';
import { SerieData } from 'src/app/models/serie.interface';
import { environment } from 'src/environments/environment';


@Component({
	selector: 'app-evapotranspiracion',
	templateUrl: './evapotranspiracion.component.html',
	styleUrls: ['./evapotranspiracion.component.scss']
})
export class EvapotranspiracionComponent implements OnInit, OnDestroy {

	//PLOT
	normalSeries: SerieData[] = []
	accumulatedSeries: SerieData[] = []
	normalSeries2: SerieData[] = []
	accumulatedSeries2: SerieData[] = []

	//TABLA
	displayedColumns: string[] = ['estacion', 'acumulado', 'promedio', 'maximo', 'opciones'];
	displayedColumns2: string[] = ['estacion', 'acumulado_1', 'promedio_1', 'maximo_1', 'acumulado_2', 'promedio_2', 'maximo_2'];
	dataSource: { estacion: string, acumulado: number, promedio: number, maxima: number, opciones: boolean }[] = [];
	dataSource2: TablaComparacion[] = [];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	//STORE
	store$: Subscription;
	estaciones: string[] = [];
	consultarDatos: BehaviorSubject<any> = new BehaviorSubject({})
	consultarDatos$: Subscription

	estaciones_real: String[] = [
		"Vicuña", "Rivadavia", "Pisco Elqui"
	]

	//ITEMS HTML
	agrupacionCustom: { value: string, label: string }[] = [
		{ value: "diaria", label: "Diaria" },
		{ value: "semanal", label: "Semanal" },
		{ value: "mensual", label: "Mensual" }
	]
	agrupacionCustom2: { value: string, label: string }[] = [
		{ value: "diaria", label: "Diaria" },
		{ value: "semanal", label: "Semanal" },
		{ value: "mensual", label: "Mensual" }
	]

	agrupacionTemporadas: { value: string, label: string }[] = [
		{ value: "semanal", label: "Semanal" },
		{ value: "mensual", label: "Mensual" },
		{ value: "temporada", label: "Periodo" },
	]


	//TEMPORAL
	maxDate = environment.maxDate
	formTemporal: FormGroup;
	estacionReal: String = "Rivadavia";
	today:any = new Date();
	dd = String(this.today.getDate()).padStart(2, '0');
	mm = String(this.today.getMonth() + 1).padStart(2, '0'); 
	yyyy = this.today.getFullYear();
	fechaActual = this.mm + '/' + this.dd + '/' + this.yyyy;
	/*
	formTemporal = new FormGroup({
		start: new FormControl(),
		end: new FormControl(),
		agrupacionCustom: new FormControl("diaria"),
		agrupacionTemporadas: new FormControl("temporada"),
		tipoConsulta: new FormControl("/serie_custom"),
	});
	formTemporal2 = new FormGroup({
		start2: new FormControl(),
		end2: new FormControl(),
	});
	*/
	formTemporal$: Subscription;

	// LOGIC HTML AND DATA
	complete: boolean = false
	groupCustom: boolean = true
	loadingData: boolean = false
	error: any = null
	data: ResponseSeries = null
	dataComparacion: ResponseSeriesComparacion = null 
	dataEstaciones: any = null
	invalidDates = true
	stationsNoData: string[] = []
	historico: boolean = false
	comparacionIntervalo: boolean = false

	colors_used: number[] = []
	series_activate = 0
	series_activate_grafico_1 = 0
	series_activate_grafico_2 = 0

	constructor(private store: Store<AppState>, private _snackBar: MatSnackBar, private fctrl: FormBuilder){


			// console.log("Ingresa a modal")
			this.formTemporal = fctrl.group({
			start:['',Validators.required],
			start2:[''],
			end:['',Validators.required],
			end2:[''],
			agrupacionCustom:['diaria',Validators.required],
			agrupacionTemporadas:['temporada',Validators.required],
			tipoConsulta:['/serie_custom',Validators.required],
		  })
	}



	ngOnInit(): void {

		setInterval(() => {
				this.mostrarEstacion()
			}, 4000);


		this.store$ = this.store.select("evapotranspiracion").subscribe((state) => {
			this.estaciones = state.estaciones
			this.loadingData = state.loading
			this.error = state.error
			this.data = state.dataEvapotranspiracion
			this.dataComparacion = state.dataEvapotranspiracionLista
			this.dataEstaciones = state.dataEstaciones
			// console.log("arregoTabla", state)

			if(this.formTemporal.controls.tipoConsulta.value == '/serie_comparacion'){
				if (this.dataComparacion != null && this.error == null)  this.mostrarDataComparacion()
			}
			else{
				if (this.data != null && this.error == null)  this.mostrarData()
			}
			
		});


		this.formTemporal$ = this.formTemporal.valueChanges.subscribe((value: any) => {
			value.tipoConsulta == '/serie_comparacion' ? this.comparacionIntervalo = true : this.comparacionIntervalo = false;
	
			(value.tipoConsulta == '/serie_custom' || value.tipoConsulta == '/serie_comparacion') ? this.groupCustom = true : this.groupCustom = false
			this.invalidDates = true
			// // console.log("formTemporalvalid", this.formTemporal)
			// // console.log("value", value)
			if (this.formTemporal.valid && value.start < value.end && value.tipoConsulta !== '/serie_comparacion') {
				this.invalidDates = false
				this.ajustarFechas()
				// // console.log("temporada", value)
				this.store.dispatch(evActions.inputTemporal({
					fechaInicio: value.start.toJSON(),
					fechaTermino: value.end.toJSON(),
					agrupacionCustom: value.agrupacionCustom,
					agrupacionTemporadas: value.agrupacionTemporadas,
					tipoConsulta: value.tipoConsulta
				}))
				this.consultarDatos.next({})
			}
			if (this.formTemporal.valid && value.start2 && value.end2 && value.start < value.end && value.tipoConsulta === '/serie_comparacion') {
				this.invalidDates = false
				// console.log("Antes de ajustar fechas", value)
				//this.ajustarFechas()
				// console.log("Despues de ajustar fechas", value)
				this.store.dispatch(evActions.inputTemporalComparacion({
					fechaInicio1: value.start.toJSON(),
					fechaTermino1: value.end.toJSON(),
					fechaInicio2: value.start2.toJSON(),
					fechaTermino2: value.end2.toJSON(),
					agrupacionCustom: value.agrupacionCustom,
					agrupacionTemporadas: value.agrupacionTemporadas,
					tipoConsulta: value.tipoConsulta
				}))
				this.consultarDatos.next({})
			}
		})

		this.consultarDatos$ = this.consultarDatos.subscribe(() => {
			if (this.formTemporal.valid && this.estaciones.length > 0) {
				this.limpiarVisualizacion()
				this.complete = true
				this.store.dispatch(evActions.loadingData())
			} else {
				this.complete = false
			}
		})
	}

	ngOnDestroy(): void {
		this.store.dispatch(evActions.resetStore())
		this.store$.unsubscribe()
		this.formTemporal$.unsubscribe()
		//this.formTemporal2$.unsubscribe()
		this.consultarDatos$.unsubscribe()
	}

	mostrarEstacion(){
		var myArray = ["Algarrobal", "Coquimbo [El Panul]", "El Jote", "El Tapado","Estero Derecho", "Gabriela Mistral",
				"La Laguna [Elqui]","La Serena [CEAZA]", "La Serena [Cerro Grande]", "La Serena [El Romeral]", "Las Cardas",
			"Llano de Las Liebres", "Llanos de Huanta", "Los Corrales", "Pan de Azucar", "Paso Agua Negra", "Pisco Elqui",
			 "Punta Colorada", "Punta de Choros", "Rivadavia", "UCN Guayacan", "Vicuna"];
		var rand = Math.floor(Math.random()*myArray.length);
		var rValue = myArray[rand];
		this.estacionReal = rValue
	}

	ajustarFechas() {
		const start: Date = this.formTemporal.get('start').value
		const end: Date = this.formTemporal.get('end').value
		let aux: string
		this.formTemporal.get('tipoConsulta').value == "/serie_custom" ? aux = "agrupacionCustom" : aux = "agrupacionTemporadas"

		if(aux === "agrupacionCustom"){
			if (this.formTemporal.get(aux).value == 'mensual') {
				const endMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0);
				start.setDate(1)
				end.setDate(endMonth.getDate())
			}

			if (this.formTemporal.get(aux).value == 'semanal') {
				while (start.getDay() != 1) { start.setDate(start.getDate() - 1) }
				while (end.getDay() != 0) { end.setDate(end.getDate() + 1) }
			}
		}
	}

	checkTabla(evento: MatCheckboxChange, estacion: string, check: MatCheckbox) {

		let estacion_data: DataEstacion = this.data.estaciones.find(el => el.nombre_estacion == estacion)

		if (evento.checked) {
			if (this.series_activate < 5) {
				this.normalSeries = [...this.normalSeries, this._getNormalSerie(estacion_data, false)]
				this.accumulatedSeries = [...this.accumulatedSeries, this._getAccumulatedSerie(estacion_data, false)]
				this.series_activate++
			} else {
				this._snackBar.open("Esta permitido un maximo de 5 series", "Cerrar", { duration: 5000 });
				check.checked = false
			}
		} else {
			this._removeSerie(estacion)
			this.series_activate--
		}
	}

	addStations(stations: string[]) {
		this.stationsNoData = []
		this.store.dispatch(evActions.agregarEstaciones({ estaciones: stations }))
		this.consultarDatos.next({})
	}

	clickTabla(estacion: string, check: any) {
		// console.log(estacion, check)
		// check.toggle()
	}

	mostrarDataComparacion() {
		let arregloTabla = []
		let arregloTabla2 = []
		let todo_vacio = true
		let stationsNoData: string[] = []
		this.series_activate_grafico_1 = 0
		this.series_activate_grafico_2 = 0
		const seriesNormal: SerieData[] = []
		const seriesNormal2: SerieData[] = []
		let stationsNoData1: string[] = []
		let stationsNoData2: string[] = []
		const seriesAccumulated: SerieData[] = []
		const seriesAccumulated2: SerieData[] = []
		let row_estacion: TablaComparacion[] = []
		let cont = 0
		let aux = 0
		let estacionAccepted: string;
		let acumulado1, acumulado2, promedio1, promedio2, maxima1, maxima2;
		for (let estacion of this.dataComparacion.estaciones) {
			estacionAccepted = estacion.nombre_estacion
			// console.log("Data de la estacion", estacion)
			cont = 0
			aux = 0
			for(let periodo of estacion.total_data){
				if (periodo.length != 0) {
						todo_vacio = false				
						var valores_aux = periodo.map(el=>el.promedio)
						var valores = valores_aux.filter(el => el !== undefined)
						var sum = valores.reduce((s, a) => s + a, 0).toFixed(2)
						var avg = ((sum / valores.length) || 0).toFixed(2)
						var max = Math.max(...valores)
					if(cont == 0){
						acumulado1= sum
						promedio1 = Number(avg)
						maxima1 = max
						if(this.series_activate_grafico_1 < 3){
							seriesNormal.push(this._getNormalSerie(periodo, estacionAccepted))
							seriesAccumulated.push(this._getAccumulatedSerie(periodo, estacionAccepted))	
							this.series_activate_grafico_1++
						}
					}
					else{	
							
						acumulado2 = sum
						promedio2= Number(avg)
						maxima2 = max
						if(this.series_activate_grafico_2 < 3){
							seriesNormal2.push(this._getNormalSerie(periodo, estacionAccepted))
							seriesAccumulated2.push(this._getAccumulatedSerie(periodo, estacionAccepted))	
							this.series_activate_grafico_2++
						}
						// console.log(acumulado2)

					}
				}
				else{
					
					if(aux > 0){
					 stationsNoData2.push(estacion.nombre_estacion)
					}
					
					aux++
				}
				cont++;
				
				}
			
			if(estacion.total_data[0].length > 0 || estacion.total_data[1].length > 0){
				
				row_estacion.push({
					estacion: estacionAccepted,
					acumulado1: acumulado1,
					promedio1: promedio1,
					maxima1: maxima1,
					acumulado2: acumulado2,
					promedio2: promedio2,
					maxima2: maxima2
				})
				acumulado1 = null
				promedio1 = null
				maxima1 = null
				acumulado2 = null
				promedio2 = null
				maxima2 = null

			
			}
		}
		
		this.dataSource = arregloTabla
		this.dataSource2 = row_estacion
		this.stationsNoData = stationsNoData2
		this.accumulatedSeries = seriesAccumulated
		this.normalSeries = seriesNormal
		this.accumulatedSeries2 = seriesAccumulated2
		this.normalSeries2 = seriesNormal2
	
	}
	mostrarData() {
		let arregloTabla = []
		let arregloTabla2 = []
		let todo_vacio = true
		let stationsNoData: string[] = []

		this.series_activate = 0
		const seriesNormal: SerieData[] = []
		const seriesNormal2: SerieData[] = []

		const seriesAccumulated: SerieData[] = []
		const seriesAccumulated2: SerieData[] = []

		for (let estacion of this.data.estaciones) {
			if (estacion.data.length != 0) {
				todo_vacio = false
				
				var valores_aux = estacion.data.map(el=>el.p)
				var valores = valores_aux.filter(el => el !== undefined)
				var sum = Number(valores.reduce((s, a) => s + a, 0).toFixed(2))
				var avg = ((sum / valores.length) || 0).toFixed(2)
				var max = Math.max(...valores)

				arregloTabla.push({
					"estacion": estacion.nombre_estacion,
					acumulado: sum,
					promedio: avg,
					maxima: max,
					opciones: (this.series_activate < 3)
				})
				if (this.series_activate < 3) {
					// console.log("ESTACION",estacion)
					seriesNormal.push(this._getNormalSerie(estacion, false))
					seriesAccumulated.push(this._getAccumulatedSerie(estacion, false))
					this.series_activate++
				}
			}
			else {
				stationsNoData.push(estacion.nombre_estacion)
			}
		}
		
		this.dataSource = arregloTabla
		this.stationsNoData = stationsNoData
		this.accumulatedSeries = seriesAccumulated
		this.normalSeries = seriesNormal
		
	}

	limpiarVisualizacion() {
		this.series_activate = 0
		this.dataSource = []
		this.series_activate_grafico_1 = 0
		this.series_activate_grafico_2 = 0
		this.dataSource2 = []
		this.accumulatedSeries = []
		this.normalSeries = []
		this.accumulatedSeries2 = []
		this.normalSeries2 = []
	}

	private _getNormalSerie(estacion: any, comparacion:any): SerieData {
		let datos: {}[] = []
		// console.log("DATOS", estacion)
		if(comparacion){
			for (let tupla of estacion) datos.push({ x: (new Date(tupla.f)).getTime(), y: tupla.p })
			// console.log("comparacionTOTAL,", datos)
			return ({
				name: comparacion,
				type: "line",
				data: datos
			})
		}
		else{
			for (let tupla of estacion.data) datos.push({ x: (new Date(tupla.f)).getTime(), y: tupla.p })

		return ({
			name: `${estacion.nombre_estacion}`,
			type: "column",
			data: datos
		})
		}
		


	}

	private _getAccumulatedSerie(estacion: any, comparacion:any): SerieData {
		let datos: {}[] = []
		let acumulado: number = 0

		if(comparacion){
			for (let tupla of estacion) {
				acumulado += tupla.p
				datos.push({ x: (new Date(tupla.f)).getTime(), y: acumulado })
			}
			return ({
				name: comparacion,
				type: "line",
				data: datos
			})
		}
		else{
			for (let tupla of estacion.data) {
				acumulado += tupla.p
				datos.push({ x: tupla.f, y: acumulado })
			}
			return ({
				name: `${estacion.nombre_estacion}`,
				type: "line",
				data: datos
			})
		}

	}

	private _removeSerie(estacion: string) {
		this.normalSeries = this.normalSeries.filter((el) => {
			if (!el.name.includes(estacion)) return true
			return false
		})

		this.accumulatedSeries = this.accumulatedSeries.filter((el) => {
			if (!el.name.includes(estacion)) return true
			return false
		})
		this.normalSeries2 = this.normalSeries2.filter((el) => {
			if (!el.name.includes(estacion)) return true
			return false
		})

		this.accumulatedSeries2 = this.accumulatedSeries2.filter((el) => {
			if (!el.name.includes(estacion)) return true
			return false
		})
	}
}