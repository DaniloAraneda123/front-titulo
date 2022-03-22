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
			subtitle: "",
			img: "https://www.meteorologiaenred.com/wp-content/uploads/2017/10/lluvia.jpg.webp",
			description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed modi commodi et magnam quae voluptate,
				neque omnis? Consectetur perspiciatis necessitatibus tempore cumque, adipisci nisi maxime quo amet voluptatem
				 laboriosam officiis!`,
			url: "precipitacion"
		},
		{
			name: "Horas Frio",
			subtitle: "",
			img: "https://storage.googleapis.com/portalfruticola/2016/12/plum-tree-1353819_640.jpg",
			description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed modi commodi et magnam quae voluptate,
			neque omnis? Consectetur perspiciatis necessitatibus tempore cumque, adipisci nisi maxime quo amet voluptatem
			 laboriosam officiis!`,
			url: "horas_frio"
		},
		{
			name: "Evapotranspiracion",
			subtitle: "",
			img: "https://ichi.pro/assets/images/max/724/1*VWO_xMK8-w29HY00Wzty9w.jpeg",
			description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed modi commodi et magnam quae voluptate,
			neque omnis? Consectetur perspiciatis necessitatibus tempore cumque, adipisci nisi maxime quo amet voluptatem
			 laboriosam officiis!`,
			url: "evapotranspiracion"
		},
		{
			name: "Grados Día",
			subtitle: "",
			img: "https://ichi.pro/assets/images/max/724/1*VWO_xMK8-w29HY00Wzty9w.jpeg",
			description: "",
			url: ""
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