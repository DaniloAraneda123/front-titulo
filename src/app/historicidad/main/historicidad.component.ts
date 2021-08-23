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
				opciones: [
					{
						valor: "temperatura_de_suelo",
						etiqueta: "Temperatura del Suelo"
					},
					{
						valor: "promedios_mes_anios",
						etiqueta: "Analisis por Mes"
					},
					{
						valor: "promedio_anios",
						etiqueta: "Analisis por Año"
					},

				]
			}, {
				nombre: "Altura",
				descripcion: "Son las alturas disponibles para la variable seleccionada",
				mensajeCombo: "Seleccione una altura",
				formControlName: "altura",
				opciones: [
					{
						valor: "-0.2m",
						etiqueta: "-0.2m"
					},
					{
						valor: "2m",
						etiqueta: "2m"
					},
					{
						valor: "0.5m",
						etiqueta: "0.5m"
					}
				]
			}, {
				nombre: "Criterio de Busqueda",
				descripcion: "Son los tipos de operaciones disponibles",
				mensajeCombo: "Seleccione un Tipo de Analisis",
				formControlName: "criterio",
				opciones: [
					{
						valor: "promedio_custom",
						etiqueta: "Custom"
					},
					{
						valor: "promedios_mes_anios",
						etiqueta: "Analisis por Mes"
					},
					{
						valor: "promedio_anios",
						etiqueta: "Analisis por Año"
					}
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
				opciones: [
					{
						valor: "promedio_custom",
						etiqueta: "Custom"
					},
					{
						valor: "promedios_mes_anios",
						etiqueta: "Analisis por Mes"
					},
					{
						valor: "promedio_anios",
						etiqueta: "Analisis por Año"
					}
				]
			}, {
				nombre: "Altura",
				descripcion: "Son las alturas disponibles para la variable seleccionada",
				mensajeCombo: "Seleccione una altura",
				formControlName: "altura",
				opciones: [
					{
						valor: "1.5m",
						etiqueta: "1.5m"
					},
					{
						valor: "2m",
						etiqueta: "2m"
					},
					{
						valor: "0.5m",
						etiqueta: "0.5m"
					}
				]
			}, {
				nombre: "Criterio de Busqueda",
				descripcion: "Son los tipos de operaciones disponibles",
				mensajeCombo: "Seleccione un Tipo de Analisis",
				formControlName: "criterio",
				opciones: [
					{
						valor: "promedio_custom",
						etiqueta: "Custom"
					},
					{
						valor: "promedios_mes_anios",
						etiqueta: "Analisis por Mes"
					},
					{
						valor: "promedio_anios",
						etiqueta: "Analisis por Año"
					}
				]
			}
		]
	}


	public itemsFiltros: any = {
		series: {
			promedio_custom: [
				{
					tipo: "rango fecha",
					formControlInicio: "fecha_inicio",
					formControlTermino: "fecha_final"
				}, {
					tipo: "rango tiempo",
					formControlInicio: "hora_inicio",
					formControlTermino: "hora_final",
				}
			],
			promedios_mes_anios: [
				{
					tipo: "rango fecha",
					formControlInicio: "fecha_inicio",
					formControlTermino: "fecha_final"
				}, {
					tipo: "rango tiempo",
					formControlInicio: "hora_inicio",
					formControlTermino: "hora_final",
				}
			],
			promedio_anios: [
				{
					tipo: "rango fecha",
					formControlInicio: "fecha_inicio",
					formControlTermino: "fecha_final"
				}
			]
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
