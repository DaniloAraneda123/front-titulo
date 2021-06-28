import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HistoricidadComponent } from './components/historicidad/historicidad.component'
import { InterpolacionComponent } from './components/interpolacion/interpolacion.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'historicidad',
    component:HistoricidadComponent
  },
  {
    path:'interpolacion',
    component:InterpolacionComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
