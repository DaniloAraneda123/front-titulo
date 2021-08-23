import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { HomeComponent } from './home/home.component';
import { InterpolacionComponent } from './interpolacion/interpolacion.component';
import { HistoricidadComponent } from './historicidad/main/historicidad.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MapComponent } from './historicidad/map/map.component';
import { GraficaComponent } from './historicidad/grafica/grafica.component';


const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'historicidad',
		component: HistoricidadComponent,
		children: [
			{
				path: 'map',
				component: MapComponent
			},
			{
				path: 'grafico',
				component: GraficaComponent
			}
		]
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
