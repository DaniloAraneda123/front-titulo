import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasosAvisoComponent, CasosUsoComponent } from './casos-uso.component';
import { PrecipitacionComponent } from './precipitacion/precipitacion.component';
import { HorasFrioComponent } from './horas-frio/horas-frio.component';
import { EvapotranspiracionComponent } from './evapotranspiracion/evapotranspiracion.component';
import { MapComponent } from './components/map/map.component';
import { PlotStackedColumnsComponent } from './components/plot-stacked-columns/plot-stacked-columns.component';
import { GradosDiaComponent } from './grados-dia/grados-dia.component';
import { PlotComponent } from './components/plot/plot.component';
import { HelpUseCaseComponent } from './components/help-use-case/help-use-case.component';


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
    HelpUseCaseComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class CasosUsoModule { }
