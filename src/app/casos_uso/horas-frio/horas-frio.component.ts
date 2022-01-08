import { loadingData } from './../../store/actions/horasFrio.actions';
import { BehaviorSubject, fromEvent, Observable, of, Subscription } from 'rxjs';
import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { HeatmapData, MapCircle, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, take } from 'rxjs/operators';
import { iconos, ubicacioneEstaciones } from '../../models/estaciones.mapa'
import { ChartOptions } from 'src/app/models/apex.interface';

//STORE
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as hfActions from 'src/app/store/actions/horasFrio.actions'
import { FormControl, FormGroup } from '@angular/forms';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
	selector: 'app-horas-frio',
	templateUrl: './horas-frio.component.html',
	styleUrls: ['./horas-frio.component.scss']
})

export class HorasFrioComponent implements OnInit, OnDestroy {

	//GRAFICO
	chartOptionsLine: Partial<ChartOptions>;

	//TABLA
	displayedColumns: string[] = ['estacion', 'acumulado', 'promedio', 'maximo', 'opciones'];
	dataSource: { estacion: string, acumulado: number, promedio: number, maxima: number }[] = [];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	//MAPA
	optionsMaps: google.maps.MapOptions = {
		center: { lat: -29.7530093, lng: -70.616334 },
		zoom: 9,
		restriction: {
			latLngBounds: {
				north: -29.3530093, south: -30.2530093, west: -71.616334, east: -69.816334,
			},
			strictBounds: false
		}
	}
	mapaMarkers: { pos: google.maps.LatLngLiteral, opt: google.maps.MarkerOptions }[] = [...ubicacioneEstaciones]
	mapSelectionType: string = "individual"

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

	//STORE
	store$: Subscription;
	estaciones: string[] = [];
	consultarDatos: BehaviorSubject<any> = new BehaviorSubject({})
	consultarDatos$: Subscription

	//ITEMS HTML
	mapSelectionItems: { value: string, label: string }[] = [
		{ value: "individual", label: "Selección Individual" },
		{ value: "area", label: "Selección por Area" },
		{ value: "punto", label: "Selección por Punto" }
	]
	pointSelectionItems: { value: string, label: string }[] = [
		{ value: "cercana", label: "Estacion mas Cercana" },
		{ value: "linea", label: "Linea de Costa Similar" },
		{ value: "altura", label: "Altura Similar" }
	]
	agrupacionItems: { value: string, label: string }[] = [
		{ value: "diaria", label: "Diaria" },
		{ value: "semanal", label: "Semanal" },
		{ value: "mensual", label: "Mensual" }
	]

	//TEMPORAL
	formTemporal = new FormGroup({ start: new FormControl(), end: new FormControl(), agrupacion: new FormControl("diaria"), });
	formTemporal$: Subscription;

	// LOGIC HTML AND DATA
	complete: boolean = false
	loadingData: boolean = false
	error: any = null
	data: any = null
	dataEstaciones: any = null
	tipoConsulta = '/serie_custom'
	invalidDates = true

	colors:string[] = ['#008FFB','#00E396','#775DD0','#FF4560','#FEB019'];

	constructor(private store: Store<AppState>) {
		this.chartOptionsLine = {
			series: [],
			chart: {
				height: 345, type: "line", stacked: false,
				toolbar: {
					tools: { download: true, selection: true, zoom: true, zoomin: false, zoomout: false, pan: false, },
					show: true, autoSelected: 'selection'
				}
			},
			dataLabels: { enabled: false },
			stroke: { width: [1, 2.5] },
			// title: { text: "Horas Frio (9/6/20 - 20/6/20) Vicuña", align: "left", offsetX: 10 },
			xaxis: { type: "datetime" },
			yaxis: [],
			legend: { position: "bottom", horizontalAlign: "center" }
		};
	}

	ngOnInit(): void {
		this.store$ = this.store.select('horasFrio').subscribe((state) => {
			this.estaciones = state.estaciones
			this.loadingData = state.loading
			this.error = state.error
			this.data = state.dataHorasFrio
			this.dataEstaciones = state.dataEstaciones
			if (this.data != null && this.error == null) this.mostrarData()

		});

		this.cambioCirculo$ = this.cambioCirculo.pipe(debounceTime(200)).subscribe((evento: any) => {
			this.store.dispatch(hfActions.quitarAllEstaciones())
			if (this.circulo) {
				const bordes = this.circulo.getBounds()
				for (let i in this.mapaMarkers) {
					if (bordes?.contains(this.mapaMarkers[i].pos)) {
						this.cambiarIcono(Number(i), iconos.iconRojo)
						this.store.dispatch(hfActions.agregarEstacion({ estacion: this.mapaMarkers[i].opt.title }))
					} else {
						this.cambiarIcono(Number(i), iconos.iconAzul)
					}
				}
				this.consultarDatos.next({})
			}
		})

		this.formTemporal$ = this.formTemporal.valueChanges.subscribe((value: any) => {
			this.invalidDates = true
			if (this.formTemporal.valid && value.start < value.end) {
				this.invalidDates = false
				this.ajustarFechas()
				this.store.dispatch(hfActions.inputTemporal({
					fechaInicio: value.start.toJSON(),
					fechaTermino: value.end.toJSON(),
					agrupacion: value.agrupacion,
					tipoConsulta: this.tipoConsulta
				}))
				this.consultarDatos.next({})
			}
		})

		this.consultarDatos$ = this.consultarDatos.pipe(debounceTime(500)).subscribe(() => {
			if (this.formTemporal.valid && this.estaciones.length > 0) {
				this.complete = true
				this.data = null
				this.dataSource = []
				this.chartOptionsLine.series = []
				this.store.dispatch(hfActions.loadingData())

			} else {
				this.complete = false
			}
		})
	}

	ngOnDestroy(): void {
		this.cambioCirculo$.unsubscribe()
		this.store$.unsubscribe()
		this.formTemporal$.unsubscribe()
		this.consultarDatos$.unsubscribe()
	}

	ajustarFechas() {
		const start: Date = this.formTemporal.get('start').value
		const end: Date = this.formTemporal.get('end').value

		if (this.formTemporal.get('agrupacion').value == 'mensual') {
			const endMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0);
			start.setDate(1)
			end.setDate(endMonth.getDate())
		}

		if (this.formTemporal.get('agrupacion').value == 'semanal') {
			while (start.getDay() != 1) { start.setDate(start.getDate() - 1) }
			while (end.getDay() != 0) { end.setDate(end.getDate() + 1) }
		}
	}

	changeCircle($event: any) {
		this.cambioCirculo.next($event)
	}

	checkTabla(evento: any, estacion: string) {
		// console.log(evento, estacion)
	}

	clickTabla(estacion: string, check: any) {
		// console.log(estacion, check)
		check.toggle()
	}

	clickEstacion(i: number) {
		const nombre = this.mapaMarkers[i].opt.title
		if (this.mapSelectionType == 'individual') {
			if (!this.estaciones.includes(nombre)) {
				this.store.dispatch(hfActions.agregarEstacion({ estacion: nombre }))
				this.mapaMarkers[i].opt = { ...this.mapaMarkers[i].opt, icon: iconos.iconRojo }
			}
			else {
				this.removerEstacion(nombre)
			}
			this.consultarDatos.next({})
		}
	}

	removerEstacion(estacion: string): void {

		//Sacar de lista
		const index = this.estaciones.indexOf(estacion);
		this.store.dispatch(hfActions.quitarEstacion({ estacion: estacion }))

		//Cambiar Icono
		const indice = this.mapaMarkers.findIndex((elemento) => (elemento.opt.title === estacion))
		this.mapaMarkers[indice].opt = { ...this.mapaMarkers[indice].opt, icon: iconos.iconAzul }
	}

	cambiarIcono(i: number, icono: any) {
		this.mapaMarkers[i].opt = { ...this.mapaMarkers[i].opt, icon: icono }
	}

	mostrarData() {
		let arregloTabla = []
		let series = []
		let labelsX = []
		let yaxis = []
		let maximoNormal: number = 0
		let maximoAcumulado: number = 0
		let i_color = 0

		//llenar tabla y grafico
		for (let estacion in this.data.estaciones) {
			const valores = this.data.estaciones[estacion].promedios
			const fechas = this.data.estaciones[estacion].fechas
			labelsX = this.data.estaciones[estacion].fechas
			const sum = valores.reduce((s, a) => s + a, 0)
			const avg = ((sum / valores.length) || 0).toFixed(2)
			const max = Math.max(...valores)
			maximoNormal = max > maximoNormal ? max : maximoNormal

			arregloTabla.push({
				estacion,
				acumulado: sum,
				promedio: avg,
				maxima: max,
				//Activar el check box
			})

			let datos = []
			for (let index in valores) {
				datos.push({
					x: fechas[index],
					y: valores[index]
				})
			}
			series.push({
				name: `${estacion}`,
				type: "column",
				data: datos,
				color: this.colors[i_color]
			})

			let datosAcumlados = this._getSerieAcumulada(valores, fechas)
			maximoAcumulado = datosAcumlados[datosAcumlados.length - 1].y > maximoAcumulado ?
				datosAcumlados[datosAcumlados.length - 1].y : maximoAcumulado
			series.push({
				name: `${estacion} Acumulado`,
				type: "line",
				data: datosAcumlados,
				color: this.colors[i_color]
			})

			i_color++
		}

		//generar axis
		yaxis.push({
			max: maximoNormal+1,
			axisTicks: { show: true },
			title: { text: "Horas Frio Diaria [Hf]" },
			tooltip: { enabled: true },
		})

		yaxis.push({
			max: maximoAcumulado+5,
			axisTicks: { show: true },
			opposite: true,
			title: { text: "Horas Frio Acumulada [Hf]" },
			tooltip: { enabled: true },
		})

		for(let i=2;i<4; i=i+2){
			yaxis.push({ max: maximoNormal+1, show: false })
			yaxis.push({ max: maximoAcumulado+5, show: false })
		}

		// yaxis.push({ max: maximoNormal, show: false })
		// yaxis.push({ max: maximoAcumulado, show: false })
		// yaxis.push({ max: maximoNormal, show: false })
		// yaxis.push({ max: maximoAcumulado, show: false })

		this.dataSource = arregloTabla
		this.chartOptionsLine.series = series
		this.chartOptionsLine.yaxis = yaxis
	}

	private _getSerieAcumulada(datos, fechas): any[] {
		let serie: any[] = []
		let acumulado: number = 0
		for (let i in datos) {
			acumulado += datos[i]
			serie.push({
				x: fechas[i],
				y: acumulado
			})
		}
		return serie
	}
}