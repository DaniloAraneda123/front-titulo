import { MainHistoricidadComponent } from './historicidad/pages/main-page/main-historicidad.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//General
import { HomeComponent } from './home/home.component';

//Casos uso
import { CasosUsoComponent } from './casos_uso/casos-uso.component';
import { HorasFrioComponent } from './casos_uso/horas-frio/horas-frio.component';
import { PrecipitacionComponent } from './casos_uso/precipitacion/precipitacion.component';
import { EvapotranspiracionComponent } from './casos_uso/evapotranspiracion/evapotranspiracion.component';
//import { EvapotranspiracionComponent } from './casos_uso/evapotranspiracion/evapotranspiracion.component';


const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'historicidad',
		component: MainHistoricidadComponent
	},
	// {
	// 	path: 'historicidad/grafica_unica',
	// 	component: GraficaUnicaComponent,
	// },
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
		component: EvapotranspiracionComponent
	}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
