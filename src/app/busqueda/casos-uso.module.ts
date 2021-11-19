import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasosUsoComponent } from './casos-uso.component';
import { PrecipitacionComponent } from './precipitacion/precipitacion.component';
import { HorasFrioComponent } from './horas-frio/horas-frio.component';
import { EvapotraspitacionComponent } from './evapotraspitacion/evapotraspitacion.component';



@NgModule({
  declarations: [
    CasosUsoComponent,
    PrecipitacionComponent,
    HorasFrioComponent,
    EvapotraspitacionComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CasosUsoModule { }
