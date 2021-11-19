import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { HomeComponent } from './home/home.component';
import { InterpolacionComponent } from './interpolacion/interpolacion.component';
import { HistoricidadComponent } from './historicidad/historicidad/historicidad.component';
import { CasosUsoComponent } from './busqueda/casos-uso.component';
import { GraficaUnicaComponent } from './historicidad/grafica-unica/grafica-unica.component';
import { GraficaMultipleComponent } from './historicidad/grafica-multiple/grafica-multiple.component';
import { EvapotraspitacionComponent } from './busqueda/evapotraspitacion/evapotraspitacion.component';
import { HorasFrioComponent } from './busqueda/horas-frio/horas-frio.component';
import { PrecipitacionComponent } from './busqueda/precipitacion/precipitacion.component';


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
		path: 'casos_uso',
		component: CasosUsoComponent
	},
	{
		path: 'casos_uso/precipitacion',
		component: PrecipitacionComponent
	},
	{
		path: 'casos_uso/horas_frio',
		component: HorasFrioComponent
	}
	,
	{
		path: 'casos_uso/evapotranspiracion',
		component: EvapotraspitacionComponent
	}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
