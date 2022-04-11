import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasosAvisoComponent, CasosUsoComponent } from './casos-uso.component';
import { PrecipitacionComponent } from './precipitacion/precipitacion.component';
import { HorasFrioComponent } from './horas-frio/horas-frio.component';
import { EvapotranspiracionComponent } from './evapotranspiracion/evapotranspiracion.component';
import { MapComponent } from './horas-frio/components/map/map.component';
import { PlotComponent } from './horas-frio/components/plot/plot.component';
import { PlotStackedColumnsComponent } from './evapotranspiracion/components/plot-stacked-columns/plot-stacked-columns.component';
import { GradosDiaComponent } from './grados-dia/grados-dia.component';


@NgModule({
  declarations: [
    CasosUsoComponent,
    CasosAvisoComponent,
    PrecipitacionComponent,
    HorasFrioComponent,
    EvapotranspiracionComponent,
    MapComponent,
    PlotComponent,
    PlotStackedColumnsComponent,
    GradosDiaComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class CasosUsoModule { }
