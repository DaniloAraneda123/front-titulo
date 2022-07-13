import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';

//STORE
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as gdActions from 'src/app/store/actions/gradosDia.actions';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { DataEstacion, ResponseSeries } from 'src/app/models/api.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SerieData } from 'src/app/models/serie.interface';
import { ajustarFechas } from 'src/app/utils/ajustar-fecha';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { HelpUseCaseComponent } from '../components/help-use-case/help-use-case.component';

@Component({
	selector: 'app-grados-dia',
	templateUrl: './grados-dia.component.html',
	styleUrls: ['./grados-dia.component.scss']
})
export class GradosDiaComponent implements OnInit, OnDestroy {



	//PLOT
	normalSeries: SerieData[] = []
	accumulatedSeries: SerieData[] = []

	//TABLA
	displayedColumns: string[] = ['estacion', 'acumulado', 'promedio', 'maximo', 'contador', 'opciones'];
	dataSource: { estacion: string, acumulado: number, promedio: number, maxima: number, contador: number, opciones: boolean }[] = [];
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
		{ value: "temporada", label: "Periodo" },
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
	estacionReal: String = "Rivadavia";
	today: any = new Date();
	dd = String(this.today.getDate()).padStart(2, '0');
	mm = String(this.today.getMonth() + 1).padStart(2, '0');
	yyyy = this.today.getFullYear();
	fechaActual = this.mm + '/' + this.dd + '/' + this.yyyy;

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
	allowForm: boolean = true;

	typeChar: ('line' | 'bar') = 'line'

	constructor(
		private store: Store<AppState>,
		private _snackBar: MatSnackBar,
		private _dialog: MatDialog
	) { }

	ngOnInit(): void {

		setInterval(() => {
			this.mostrarEstacion()
		}, 4000);

		this.store$ = this.store.select('gradosDia').subscribe((state) => {
			// console.log(state)
			this.estaciones = state.estaciones
			this.loadingData = state.loading
			this.error = state.error
			this.data = state.dataGradosDia
			this.dataEstaciones = state.dataEstaciones
			if (this.data != null && this.error == null) this.mostrarData()
		});

		this.formTemporal$ = this.formTemporal.valueChanges.pipe(filter(el => this.allowForm)).subscribe((value: any) => {

			value.tipoConsulta == '/serie_custom' ? this.groupCustom = true : this.groupCustom = false
			this.invalidDates = true
			if (this.formTemporal.valid && value.start < value.end) {
				this.allowForm = false
				this.invalidDates = false
				const { start, end } = ajustarFechas(value.start, value.end, value.agrupacionCustom)
				this.store.dispatch(gdActions.inputTemporal({
					fechaInicio: start.toISOString(),
					fechaTermino: end.toISOString(),
					agrupacionCustom: value.agrupacionCustom,
					agrupacionTemporadas: value.agrupacionTemporadas,
					tipoConsulta: value.tipoConsulta
				}))
				this.formTemporal.controls["start"].setValue(start)
				this.formTemporal.controls["end"].setValue(end)
				this.consultarDatos.next({})
				this.allowForm = true
			}
		})

		this.consultarDatos$ = this.consultarDatos.subscribe(() => {
			if (this.formTemporal.valid && this.estaciones.length > 0) {
				this.limpiarVisualizacion()
				this.complete = true
				this.store.dispatch(gdActions.loadingData())
			} else {
				this.complete = false
			}
		})
	}

	ngOnDestroy(): void {
		this.store.dispatch(gdActions.resetData())
		this.store$.unsubscribe()
		this.formTemporal$.unsubscribe()
		this.consultarDatos$.unsubscribe()
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

		if (this.series_activate == 1) this.typeChar = "bar"
		else this.typeChar = "line"
	}

	addStations(stations: string[]) {
		this.store.dispatch(gdActions.agregarEstaciones({ estaciones: stations }))
		this.stationsNoData = []
		this.consultarDatos.next({})
	}

	mostrarEstacion() {
		var myArray = ["Algarrobal", "Coquimbo [El Panul]", "El Jote", "El Tapado", "Estero Derecho", "Gabriela Mistral",
			"La Laguna [Elqui]", "La Serena [CEAZA]", "La Serena [Cerro Grande]", "La Serena [El Romeral]", "Las Cardas",
			"Llano de Las Liebres", "Llanos de Huanta", "Los Corrales", "Pan de Azucar", "Paso Agua Negra", "Pisco Elqui",
			"Punta Colorada", "Punta de Choros", "Rivadavia", "UCN Guayacan", "Vicuna"];
		var rand = Math.floor(Math.random() * myArray.length);
		var rValue = myArray[rand];
		this.estacionReal = rValue
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
				const valores = estacion.data.map(el => el.p).filter(el => el != undefined)
				const conteos = estacion.data.map(el => el.c).filter(el => el != undefined)
				let sum: any = valores.reduce((s, a) => (s + a), 0)
				let cont: any = conteos.reduce((s, a) => {
					if (a == undefined) a = 0
					return (s + a)
				}, 0)
				const avg = ((sum / valores.length) || 0).toFixed(2)
				const max = Math.max(...valores)
				sum = sum.toFixed(2)

				arregloTabla.push({
					estacion: estacion.nombre_estacion,
					acumulado: sum,
					promedio: avg,
					maxima: max,
					contador: cont,
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

		if (this.series_activate == 1) this.typeChar = "bar"
		else this.typeChar = "line"

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
		for (let tupla of estacion.data) datos.push({ x: tupla.f, y: (tupla.p == undefined) ? null : tupla.p })
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
			let y: any = 0
			if (tupla.p != undefined) {
				acumulado += tupla.p
				y = acumulado.toFixed(2)
			}
			else { y = null }
			datos.push({ x: tupla.f, y })
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

	dialogHelp() { 
		this._dialog.open(HelpUseCaseComponent, { height: "70vh", width: "70vw" }) 
	}
}