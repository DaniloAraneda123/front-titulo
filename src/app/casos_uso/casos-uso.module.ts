import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasosAvisoComponent, CasosUsoComponent } from './casos-uso.component';
import { PrecipitacionComponent } from './precipitacion/precipitacion.component';
import { HorasFrioComponent } from './horas-frio/horas-frio.component';
import { EvapotraspitacionComponent } from './evapotraspitacion/evapotraspitacion.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    CasosUsoComponent,
    CasosAvisoComponent,
    PrecipitacionComponent,
    HorasFrioComponent,
    EvapotraspitacionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSlideToggleModule
  ]
})
export class CasosUsoModule { }
