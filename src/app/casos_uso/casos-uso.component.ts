import { MatDialog } from '@angular/material/dialog';
import { Component } from "@angular/core";
import { RouterModule, Router } from '@angular/router';

@Component({
	selector: 'app-busqueda',
	templateUrl: './casos-uso.component.html',
	styleUrls: ['./casos-uso.component.scss']
})
export class CasosUsoComponent {

	constructor(private router: Router, private dialog: MatDialog) { }

	sections = [
		{
			name: "Precipitaciones",
			subtitle: "INCOMPLETO",
			img: "https://www.meteorologiaenred.com/wp-content/uploads/2017/10/lluvia.jpg.webp",
			description: `Caso de Uso que analiza número de eventos de precipitación y la intensidad de ellos, a partir
						 de la cantidad de mm registrados en las diferentes estaciones de monitoreo de Ceazamet`,
			url: "precipitacion"
		},
		{
			name: "Evapotranspiración",
			subtitle: "COMPLETO",
			img: "https://ichi.pro/assets/images/max/724/1*VWO_xMK8-w29HY00Wzty9w.jpeg",
			description: `Caso de Uso que analiza la evapotranspiración en periodos diarios, semanales y por temporadas, además permite
						  analizar evapotranspiración acumulada para los años donde existe registro y sección de comparación de intervalos. Los
						  datos de evapotranspiración son presentados en mm los cuales corresponden a los registros de las estaciones de monitoreo de la red de Ceazamet
						  a 0.1 m de altura.`,
			url: "evapotranspiracion"
		},
		{
			name: "Horas Frío",
			subtitle: "COMPLETO",
			img: "https://storage.googleapis.com/portalfruticola/2016/12/plum-tree-1353819_640.jpg",
			description:  `Caso de Uso que analiza número de horas frío en periodos diarios, semanales y por temporadas, a partir
						   de la cantidad de horas registradas con temperatura menor a 7C`,
			url: "horas_frio"
		},
		{
			name: "Grados Día",
			subtitle:"COMPLETO",
			img: "https://www.journaljaeri.com/public/journals/37/homepageImage_en_US.jpg",
			description: `Caso de Uso que analiza grados día medido en gd para periodos diarios, semanales y por temporadas, a partir
							del registro obtenidos en las estaciones de Ceazamet a una altura de 2m`,
			url: "grados_dia"
		}
	]

	clickCard(caso_uso: string) {
		this.router.navigate(['casos_uso', caso_uso])
	}

	ngAfterViewInit(): void {
		this.dialog.open(CasosAvisoComponent);
	}
}

@Component({
	selector: 'dialog-elements-example-dialog',
	template: `
	  <h1 mat-dialog-title>¡Aviso Importante!</h1>
	  <div mat-dialog-content>
	  Esta sección de la aplicación solo son maquetas como pruebas de concepto.</div>
	  <div mat-dialog-actions>
		<button mat-button mat-dialog-close>Close</button>
	  </div>
	`,
})
export class CasosAvisoComponent { }