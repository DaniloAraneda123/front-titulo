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
						valor: "custom",
						etiqueta: "Custom"
					},
					{
						valor: "mes",
						etiqueta: "Analisis por Mes"
					},
					{
						valor: "año",
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
						valor: "custom",
						etiqueta: "Custom"
					},
					{
						valor: "mes",
						etiqueta: "Analisis por Mes"
					},
					{
						valor: "año",
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
						valor: "custom",
						etiqueta: "Custom"
					},
					{
						valor: "mes",
						etiqueta: "Analisis por Mes"
					},
					{
						valor: "año",
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
						valor: "custom",
						etiqueta: "Custom"
					},
					{
						valor: "mes",
						etiqueta: "Analisis por Mes"
					},
					{
						valor: "año",
						etiqueta: "Analisis por Año"
					}
				]
			}
		]
	}


	public itemsFiltros: any = {
		series: [
			{
				tipo: "rango fecha"
			},
			{
				tipo: "rango tiempo"
			}
		]
		,
		histogramas: [
			{},
			{},
			{}
		]
	}

	constructor() { }

	ngOnInit() { }

}
