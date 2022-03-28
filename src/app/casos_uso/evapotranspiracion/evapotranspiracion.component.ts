import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

//STORE
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
//import * as hfActions from 'src/app/store/actions/horasFrio.actions'
import * as evActions from 'src/app/store/actions/evapotranspiracion.actions'
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { DataEstacion, ResponseSeries } from 'src/app/models/api.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SerieData } from 'src/app/models/serie.interface';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';

@Component({
	selector: 'app-evapotranspiracion',
	templateUrl: './evapotranspiracion.component.html',
	styleUrls: ['./evapotranspiracion.component.scss']
})
export class EvapotranspiracionComponent implements OnInit {

	//PLOT
	normalSeries: SerieData[] = []
	accumulatedSeries: SerieData[] = []

	//TABLA
	displayedColumns: string[] = ['estacion', 'acumulado', 'promedio', 'maximo', 'opciones'];
	dataSource: { estacion: string, acumulado: number, promedio: number, maxima: number, opciones: boolean }[] = [];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	//STORE
	store$: Subscription;
	estaciones: string[] = [];
	consultarDatos: BehaviorSubject<any> = new BehaviorSubject({})
	consultarDatos$: Subscription

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
		{ value: "temporada", label: "Temporada" },
	]


	//TEMPORAL
	formTemporal = new FormGroup({
		start: new FormControl(),
		end: new FormControl(),
		start2: new FormControl(),
		end2: new FormControl(),
		agrupacionCustom: new FormControl("diaria"),
		agrupacionCustom2: new FormControl("diaria"),
		agrupacionTemporadas: new FormControl("temporada"),
		tipoConsulta: new FormControl("/serie_custom"),
	});
	formTemporal$: Subscription;

	// LOGIC HTML AND DATA
	complete: boolean = false
	groupCustom: boolean = true
	loadingData: boolean = false
	error: any = null
	data: ResponseSeries = null
	data2: ResponseSeries = null
	dataEstaciones: any = null
	invalidDates = true
	stationsNoData: string[] = []
	historico: boolean = false
	comparacionIntervalo: boolean = false

	colors_used: number[] = []
	series_activate = 0

	constructor(
		private store: Store<AppState>,
		private _snackBar: MatSnackBar) { }

	ngOnInit(): void {
		this.store$ = this.store.select("evapotranspiracion").subscribe((state) => {
			this.estaciones = state.estaciones
			this.loadingData = state.loading
			this.error = state.error
			this.data = state.dataEvapotranspiracion
			this.dataEstaciones = state.dataEstaciones
			console.log("arregoTabla", state)

			if (this.data != null && this.error == null) this.mostrarData()
		});


		this.formTemporal$ = this.formTemporal.valueChanges.subscribe((value: any) => {
			if(value.tipoConsulta == '/serie_comparacion'){
				this.comparacionIntervalo = true 
				value.tipoConsulta = '/serie_custom'
			}
			else{
				this.comparacionIntervalo = false 
			}
	
			value.tipoConsulta == '/serie_custom' ? this.groupCustom = true : this.groupCustom = false
			this.invalidDates = true
			console.log("formTemporalvalid", this.formTemporal)
			console.log("value", value)
			if (this.formTemporal.valid && value.start < value.end) {
				this.invalidDates = false
				this.ajustarFechas()
				this.store.dispatch(evActions.inputTemporal({
					fechaInicio: value.start.toJSON(),
					fechaTermino: value.end.toJSON(),
					agrupacionCustom: value.agrupacionCustom,
					agrupacionTemporadas: value.agrupacionTemporadas,
					tipoConsulta: value.tipoConsulta
				}))
				this.consultarDatos.next({})
			}
		})

		this.consultarDatos$ = this.consultarDatos.subscribe(() => {
			console.log("Evento consultar Datos")
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
		this.store$.unsubscribe()
		this.formTemporal$.unsubscribe()
		this.consultarDatos$.unsubscribe()
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
				this.normalSeries = [...this.normalSeries, this._getNormalSerie(estacion_data)]
				this.accumulatedSeries = [...this.accumulatedSeries, this._getAccumulatedSerie(estacion_data)]
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
		this.store.dispatch(evActions.agregarEstaciones({ estaciones: stations }))
		this.consultarDatos.next({})
	}

	clickTabla(estacion: string, check: any) {
		console.log(estacion, check)
		// check.toggle()
	}

	mostrarData() {
		let arregloTabla = []
		let todo_vacio = true
		let stationsNoData: string[] = []
		this.series_activate = 0
		const seriesNormal: SerieData[] = []
		const seriesNormal2: SerieData[] = []

		const seriesAccumulated: SerieData[] = []

		for (let estacion of this.data.estaciones) {
			if (estacion.data.length != 0) {
				todo_vacio = false
				
				const valores_aux = estacion.data.map(el=>el.promedio)
				const valores = valores_aux.filter(el => el !== undefined)
				const sum = valores.reduce((s, a) => s + a, 0)
				const avg = ((sum / valores.length) || 0).toFixed(2)
				const max = Math.max(...valores)

				arregloTabla.push({
					"estacion": estacion.nombre_estacion,
					acumulado: sum,
					promedio: avg,
					maxima: max,
					opciones: (this.series_activate < 3)
				})
				if (this.series_activate < 3) {
					console.log("ESTACION",estacion)
					seriesNormal.push(this._getNormalSerie(estacion))
					seriesAccumulated.push(this._getAccumulatedSerie(estacion))
					this.series_activate++
				}
			}
			else {
				stationsNoData.push(estacion.nombre_estacion)
			}
		}
		console.log("arregoTabla", arregloTabla)
		this.dataSource = arregloTabla
		this.stationsNoData = stationsNoData
		this.accumulatedSeries = seriesAccumulated
		this.normalSeries = seriesNormal
		console.log("SERIESFINAL", this.normalSeries)
	}

	limpiarVisualizacion() {
		this.series_activate = 0
		this.dataSource = []
	}

	private _getNormalSerie(estacion: DataEstacion): SerieData {
		let datos: {}[] = []
		for (let tupla of estacion.data) datos.push({ x: tupla.fecha, y: tupla.promedio })


		return ({
			name: `${estacion.nombre_estacion}`,
			type: "column",
			data: datos
		})
	}

	private _getAccumulatedSerie(estacion: DataEstacion): SerieData {
		let datos: {}[] = []
		let acumulado: number = 0
		for (let tupla of estacion.data) {
			acumulado += tupla.promedio
			datos.push({ x: tupla.fecha, y: acumulado })
		}

		return ({
			name: `${estacion.nombre_estacion}`,
			type: "line",
			data: datos
		})
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
	}
}


























		// 	let datosAcumlados = this._getSerieAcumulada(valores, fechas)
		// 	maximoAcumulado = datosAcumlados[datosAcumlados.length - 1].y > maximoAcumulado ?
		// 		datosAcumlados[datosAcumlados.length - 1].y : maximoAcumulado
		// 	series.push({
		// 		name: `${estacion} Acumulado`,
		// 		type: "line",
		// 		data: datosAcumlados,
		// 		// color: this.colors[this.i_colors]
		// 	})

		// 	this.series_activate++
		// }

		// //generar axis
		// yaxis.push({
		// 	max: maximoNormal + 1,
		// 	axisTicks: { show: true },
		// 	title: { text: "Horas Frio Diaria [Hf]" },
		// 	tooltip: { enabled: true },
		// })

		// yaxis.push({
		// 	max: maximoAcumulado + 5,
		// 	axisTicks: { show: true },
		// 	opposite: true,
		// 	title: { text: "Horas Frio Acumulada [Hf]" },
		// 	tooltip: { enabled: true },
		// })

		// for (let i = 2; i < 4; i = i + 2) {
		// 	yaxis.push({ max: maximoNormal + 1, show: false })
		// 	yaxis.push({ max: maximoAcumulado + 5, show: false })
		// }

		// yaxis.push({ max: maximoNormal, show: false })
		// yaxis.push({ max: maximoAcumulado, show: false })
		// yaxis.push({ max: maximoNormal, show: false })
		// yaxis.push({ max: maximoAcumulado, show: false })

		// this.chartOptionsLine.yaxis = yaxis.slice(0, 8)
















// public _getColor(): string {
// 	// const colores: string[] = ["#00E396", "#008FFB", "#546E7A", "#FF4560"]
// 	// const coloresDisponibles = colores.filter((color) => {
// 	// 	for (let i in this.multiCharts) {
// 	// 		if (this.multiCharts[i].colors[0] === color) {
// 	// 			return false
// 	// 		}
// 	// 	}
// 	// 	return true
// 	// })
// 	// return "coloresDisponibles[0]"
// 	return "sadasd"
// }
