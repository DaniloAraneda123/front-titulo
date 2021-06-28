import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HistoricidadComponent } from './components/historicidad/historicidad.component';
import { TableComponent } from './components/table/table.component';
import { SidebarTemperaturaComponent } from './components/sidebar-temperatura/sidebar-temperatura.component';
import { SidebarFechaComponent } from './components/sidebar-fecha/sidebar-fecha.component';
import { SidebarEstacionComponent } from './components/sidebar-estacion/sidebar-estacion.component';
import { InterpolacionComponent } from './components/interpolacion/interpolacion.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HistoricidadService } from './services/historicidad.service';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps'
import * as $ from 'jquery';

//import { AgmComponent } from './components/agm/agm.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    HistoricidadComponent,
    TableComponent,
    SidebarTemperaturaComponent,
    SidebarFechaComponent,
    SidebarEstacionComponent,
    InterpolacionComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({apiKey:"AIzaSyBimBPdTv2i0h0j1Rk8broRLQdBtw-ihmI"})
    // PagadoAgmCoreModule.forRoot({apiKey:"AIzaSyCEm0HnUE4xiOStBQSImvZY5RJuLgfUeKo"})

  ],
  providers: [HistoricidadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
