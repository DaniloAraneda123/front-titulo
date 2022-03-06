import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-multi-estacion',
	templateUrl: './multi-estacion.component.html',
	styleUrls: ['./multi-estacion.component.scss']
})
export class MultiEstacionComponent{

	// //DATA STORE CONTROL
	// cargando: boolean = false
	// datos: any;
	// error: any = null;

	// //Componente
	// tipoGrafico = "Linea"
	// suscripcion$: Subscription

	// //Graficos
	// @ViewChild("chart") chart: ChartComponent;

	// constructor(private store: Store<AppState>, private router: Router) {
	// 	this.suscripcion$ = this.store.select('historicidad').subscribe((state) => {
	// 		this.cargando = state.loading

	// 		if (state.error) {
	// 			this.error = state.error
	// 			setTimeout(() => {
	// 				// this.store.dispatch(actionsHistoricidad.resetear())
	// 				router.navigate(['historicidad'])
	// 			}, 6000)
	// 		}

	// 		if (state.loading === false && state.loaded === true) {
	// 			this.datos = state.data
	// 			this.cargarDatos("promedios")
	// 		}
	// 	})
	// }

	// private cargarDatos(tipo: string) {
	// 	let series = []
	// 	const estaciones = Object.keys(this.datos.estaciones)
	// 	for (let estacion of estaciones) {
	// 		if (Object.keys(this.datos.estaciones[estacion]).length !== 0) {
	// 			series.push({ data: this.datos.estaciones[estacion][tipo], name: estacion, })
	// 		}
	// 	}

	// 	this.chartOptionsLine.series = series
	// 	this.chartOptionsLine.xaxis.categories = this.datos.fechas
	// 	// this.titulo = `Comparativa de  ${tipo} `
	// }

	// public cambiarVariable(evento: any) { this.cargarDatos(evento.value) }

	// ngOnDestroy(): void { this.suscripcion$.unsubscribe() }

	// volverMap() {
	// 	this.router.navigate(['historicidad'])
	// 	this.store.dispatch(actionsHistoricidad.resetear())
	// }


	// /////Graficos
	// chartOptionsLine: Partial<ChartOptions> = {
	// 	series: [],
	// 	chart: {
	// 		type: "line", height: 500,
	// 		toolbar: { autoSelected: "selection", show: true },
	// 		animations: {
	// 			enabled: true, easing: 'easeinout', speed: 400,
	// 			animateGradually: { enabled: true, delay: 100 },
	// 			dynamicAnimation: { enabled: true, speed: 300 }
	// 		},
	// 		events: { click: (event, chartContext, config) => { console.log(config.dataPointIndex) } }
	// 	},
	// 	stroke: { width: 3 },
	// 	fill: { opacity: 1 },
	// 	markers: { size: 0 },
	// 	xaxis: { categories: [], title: { text: "Fecha" } },
	// 	yaxis: { title: { text: "Temperature" }/*, min: 20, max: 100 */ },
	// 	legend: { position: "top", horizontalAlign: "center" }
	// };
}
