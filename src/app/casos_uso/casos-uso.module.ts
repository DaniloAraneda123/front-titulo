import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasosAvisoComponent, CasosUsoComponent } from './casos-uso.component';
import { PrecipitacionComponent } from './precipitacion/precipitacion.component';
import { HorasFrioComponent } from './horas-frio/horas-frio.component';
import { EvapotraspitacionComponent } from './evapotraspitacion/evapotraspitacion.component';
import { MapComponent } from './horas-frio/components/map/map.component';
import { PlotComponent } from './horas-frio/components/plot/plot.component';


@NgModule({
  declarations: [
    CasosUsoComponent,
    CasosAvisoComponent,
    PrecipitacionComponent,
    HorasFrioComponent,
    EvapotraspitacionComponent,
    MapComponent,
    PlotComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class CasosUsoModule { }
