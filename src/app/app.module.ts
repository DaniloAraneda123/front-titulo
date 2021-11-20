//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';

//Modulos
import { SharedModule } from './shared/shared.module';
import { HistoricidadModule } from './historicidad/historicidad.module';
import { CasosUsoModule } from './casos_uso/casos-uso.module';

//Redux
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { Efectos } from './store/effects';


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,

		StoreModule.forRoot(appReducers),
		EffectsModule.forRoot(Efectos),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

		SharedModule,
		HistoricidadModule,
		CasosUsoModule,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
