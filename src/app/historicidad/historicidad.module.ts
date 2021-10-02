import { NgModule } from '@angular/core';

//Componentes
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapComponent } from './map/map.component';
import { HistoricidadComponent } from './historicidad/historicidad.component';
import { SharedModule } from '../shared/shared.module';
import { GraficaUnicaComponent } from './grafica-unica/grafica-unica.component';
import { CommonModule } from '@angular/common';
import { GraficaMultipleComponent } from './grafica-multiple/grafica-multiple.component';


@NgModule({
	declarations: [
		SidebarComponent,
		MapComponent,
		HistoricidadComponent,
		GraficaUnicaComponent,
		GraficaMultipleComponent
	],
	imports: [
		CommonModule,
		SharedModule
	],
	exports: [
		CommonModule
	]
})

export class HistoricidadModule { }