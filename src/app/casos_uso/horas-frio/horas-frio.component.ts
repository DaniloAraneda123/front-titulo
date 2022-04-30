import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

//STORE
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as hfActions from 'src/app/store/actions/horasFrio.actions'
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { DataEstacion, ResponseSeries } from 'src/app/models/api.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SerieData } from 'src/app/models/serie.interface';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-horas-frio',
	templateUrl: './horas-frio.component.html',
	styleUrls: ['./horas-frio.component.scss']
})

export class HorasFrioComponent implements OnInit, OnDestroy {

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

	agrupacionTemporadas: { value: string, label: string }[] = [
		{ value: "semanal", label: "Semanal" },
		{ value: "mensual", label: "Mensual" },
		{ value: "temporada", label: "Temporada" },
	]


	//TEMPORAL
	formTemporal = new FormGroup({
		start: new FormControl(),
		end: new FormControl(),
		agrupacionCustom: new FormControl("diaria"),
		agrupacionTemporadas: new FormControl("semanal"),
		tipoConsulta: new FormControl("/serie_custom"),
	});
	formTemporal$: Subscription;
	maxDate = environment.maxDate

	// LOGIC HTML AND DATA
	complete: boolean = false
	groupCustom: boolean = true
	loadingData: boolean = false
	error: any = null
	data: ResponseSeries = null
	dataEstaciones: any = null
	invalidDates = true
	stationsNoData: string[] = []

	colors_used: number[] = []
	series_activate = 0

	constructor(
		private store: Store<AppState>,
		private _snackBar: MatSnackBar) { }

	ngOnInit(): void {
		this.store$ = this.store.select('horasFrio').subscribe((state) => {
			this.estaciones = state.estaciones
			this.loadingData = state.loading
			this.error = state.error
			this.data = state.dataHorasFrio
			this.dataEstaciones = state.dataEstaciones
			if (this.data != null && this.error == null) this.mostrarData()
		});


		this.formTemporal$ = this.formTemporal.valueChanges.subscribe((value: any) => {
			value.tipoConsulta == '/serie_custom' ? this.groupCustom = true : this.groupCustom = false
			this.invalidDates = true
			if (this.formTemporal.valid && value.start < value.end) {
				this.invalidDates = false
				this.ajustarFechas()
				this.store.dispatch(hfActions.inputTemporal({
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
			if (this.formTemporal.valid && this.estaciones.length > 0) {
				this.limpiarVisualizacion()
				this.complete = true
				this.store.dispatch(hfActions.loadingData())
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
		this.store.dispatch(hfActions.agregarEstaciones({ estaciones: stations }))
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
		const seriesAccumulated: SerieData[] = []

		for (let estacion of this.data.estaciones) {
			if (estacion.data.length != 0) {
				todo_vacio = false
				const valores = estacion.data.map(el=>el.promedio)
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
					seriesNormal.push(this._getNormalSerie(estacion))
					seriesAccumulated.push(this._getAccumulatedSerie(estacion))
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
	}

	private _getNormalSerie(estacion: DataEstacion): SerieData {

		let datos: {}[] = []
		for (let tupla of estacion.data) datos.push({ x: new Date(tupla.fecha).getTime(), y: tupla.promedio })

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
			datos.push({ x: new Date(tupla.fecha).getTime(), y: acumulado })
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