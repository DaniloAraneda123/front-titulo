import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-historicidad',
	templateUrl: './historicidad.component.html',
	styleUrls: ['./historicidad.component.scss']
})
export class HistoricidadComponent implements OnInit {


	public itemsVariables: any = {
		series: [
			{
				nombre: "Variables Disponibles",
				descripcion: "Son las variables que es encuentran disponibles en la o las estaciones seleccionadas",
				mensajeCombo: "Seleccione una Variable",
				formControlName: "variable",
				opciones: []
			}, {
				nombre: "Altura",
				descripcion: "Son las alturas disponibles para la variable seleccionada",
				mensajeCombo: "Seleccione una altura",
				formControlName: "altura",
				opciones: []
			}, {
				nombre: "Criterio de Busqueda",
				descripcion: "Son los tipos de operaciones disponibles",
				mensajeCombo: "Seleccione un Tipo de Analisis",
				formControlName: "criterio",
				opciones: [
					{ valor: "promedio_custom", etiqueta: "Custom" },
					{ valor: "promedios_mes_anios", etiqueta: "Analisis por Mes" },
					{ valor: "promedio_anios", etiqueta: "Analisis por Año" }
				]
			}
		]
		,
		histogramas: [
			{
				nombre: "Variables Disponibles",
				descripcion: "Son las variables que es encuentran disponibles en la o las estaciones seleccionadas",
				mensajeCombo: "Seleccione una Variable",
				formControlName: "variable",
				opciones: [{ valor: "promedio_custom", etiqueta: "Custom" },]
			}, {
				nombre: "Altura",
				descripcion: "Son las alturas disponibles para la variable seleccionada",
				mensajeCombo: "Seleccione una altura",
				formControlName: "altura",
				opciones: [{ valor: "1.5m", etiqueta: "1.5m" },]
			}, {
				nombre: "Criterio de Busqueda",
				descripcion: "Son los tipos de operaciones disponibles",
				mensajeCombo: "Seleccione un Tipo de Analisis",
				formControlName: "criterio",
				opciones: [
					{ valor: "promedio_custom", etiqueta: "Custom" },
					{ valor: "promedios_mes_anios", etiqueta: "Analisis por Mes" },
					{ valor: "promedio_anios", etiqueta: "Analisis por Año" }
				]
			}
		]
	}


	public itemsFiltros: any = {
		series: {
			promedio_custom: [
				{
					tipo: "rango fecha",
					descripcion: "Escoja el rango de fechas de interes, se calculara el promedio de cada dia dentro del rango de fechas.",
					formControlInicio: "fecha_inicio",
					formControlTermino: "fecha_final"
				}, {
					tipo: "rango tiempo",
					descripcion: "Escoja el rango horario de interes, se calcular el promedio con las horas dentro del rango horario.",
					formControlInicio: "hora_inicio",
					formControlTermino: "hora_final",
				}
			],
			promedios_mes_anios: [
				{
					tipo: "combo box",
					nombre: "Mes",
					descripcion: "Escoja un mes de interes, se calculara el promedio mensual de un mes en concreto para todos los años",
					mensajeCombo: "Seleccione un Mes",
					formControlName: "mes",
					opciones: [
						{ valor: "1", etiqueta: "Enero" },
						{ valor: "2", etiqueta: "Febrero" },
						{ valor: "3", etiqueta: "Marzo" },
						{ valor: "4", etiqueta: "Abril" },
						{ valor: "5", etiqueta: "Mayo" },
						{ valor: "6", etiqueta: "Junio" },
						{ valor: "7", etiqueta: "Julio" },
						{ valor: "8", etiqueta: "Agosto" },
						{ valor: "9", etiqueta: "Septiembre" },
						{ valor: "10", etiqueta: "Octubre" },
						{ valor: "11", etiqueta: "Noviembre" },
						{ valor: "12", etiqueta: "Diciembre" },
					]
				}
			],
			promedio_anios: []
		},
		histogramas: {
			promedio_custom: [
				{
					tipo: "rango fecha",
					formControlInicio: "fechaI",
					formControlTermino: "fechaT"
				}
			],
			promedios_mes_anios: [
				{
					tipo: "rango fecha",
					formControlInicio: "fechaI",
					formControlTermino: "fechaT"
				}
			],
			promedio_anios: [
				{
					tipo: "rango fecha",
					formControlInicio: "fechaI",
					formControlTermino: "fechaT"
				}
			]
		}
	}

	constructor() { }

	ngOnInit() { }

}
