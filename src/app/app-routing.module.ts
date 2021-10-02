import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { HomeComponent } from './home/home.component';
import { InterpolacionComponent } from './interpolacion/interpolacion.component';
import { HistoricidadComponent } from './historicidad/historicidad/historicidad.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MapComponent } from './historicidad/map/map.component';
import { GraficaUnicaComponent } from './historicidad/grafica-unica/grafica-unica.component';
import { GraficaMultipleComponent } from './historicidad/grafica-multiple/grafica-multiple.component';


const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'historicidad',
		component: HistoricidadComponent
	},
	{
		path: 'historicidad/grafica_unica',
		component: GraficaUnicaComponent,
	},
	{
		path: 'historicidad/grafica_multiple',
		component: GraficaMultipleComponent
	},
	{
		path: 'interpolacion',
		component: InterpolacionComponent
	},
	{
		path: 'busqueda',
		component: BusquedaComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
