//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';

//Propio
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';

//Modulos
import { SharedModule } from './shared/shared.module';
import { HistoricidadModule } from './historicidad/historicidad.module';
import { BusquedaModule } from './busqueda/busqueda.module';
import { InterpolacionModule } from './interpolacion/interpolacion.module';

//Redux
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,

		AppRoutingModule,

		StoreModule.forRoot({}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

		SharedModule,
		HistoricidadModule,
		BusquedaModule,
		InterpolacionModule
	],
	// providers: [NgbActiveModal],
	bootstrap: [AppComponent]
})
export class AppModule { }
