import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

//Componentes
import { MapComponent } from './components/map/map.component';
import { MainHistoricidadComponent } from './pages/main-page/main-historicidad.component';
import { SideBarOptionsComponent } from './components/side-bar-options/side-bar-options.component';
import { MultiEstacionComponent } from './pages/multi-estacion/multi-estacion.component';
import { SingleEstacionComponent } from './pages/single-estacion/single-estacion.component';


@NgModule({
	declarations: [
		MapComponent,
		SideBarOptionsComponent,
		MainHistoricidadComponent,
		SingleEstacionComponent,
		MultiEstacionComponent,
	],
	imports: [
		CommonModule,
		SharedModule
	]
})

export class HistoricidadModule { }