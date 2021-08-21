import { NgModule } from '@angular/core';

//Componentes
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapComponent } from './map/map.component';
import { HistoricidadComponent } from './historicidad.component';
import { SharedModule } from '../shared/shared.module';
import { GraficaComponent } from './grafica/grafica.component';
import { CommonModule } from '@angular/common';


@NgModule({
	declarations: [
		SidebarComponent,
		MapComponent,
		HistoricidadComponent,
		GraficaComponent
	],
	imports: [
		CommonModule,
		SharedModule
	],
	exports:[
		CommonModule
	]
})

export class HistoricidadModule { }