import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

//Componentes
import { MapComponent } from './components/map/map.component';
import { MainHistoricidadComponent } from './pages/main-page/main-historicidad.component';
import { SideBarOptionsComponent } from './components/side-bar-options/side-bar-options.component';
import { MultiEstacionComponent } from './pages/multi-estacion/multi-estacion.component';
import { SingleEstacionComponent } from './pages/single-estacion/single-estacion.component';
import { MultigraficoComponent } from './components/multigrafico/multigrafico.component';
import { MultivariablesComponent } from './components/multivariables/multivariables.component';
import { SelectVariableComponent } from './components/select-variable/select-variable.component';
import { HelpSingleComponent } from './components/help-single/help-single.component';
import { HelpMultipleComponent } from './components/help-multiple/help-multiple.component';
import { HelpMainComponent } from './components/help-main/help-main.component';
import { InfoTsComponent } from './components/info-ts/info-ts.component';

@NgModule({
  declarations: [
    MapComponent,
    SideBarOptionsComponent,
    MainHistoricidadComponent,
    SingleEstacionComponent,
    MultiEstacionComponent,
    MultigraficoComponent,
    MultivariablesComponent,
    SelectVariableComponent,
    HelpSingleComponent,
    HelpMultipleComponent,
    HelpMainComponent,
    InfoTsComponent,
  ],
  imports: [CommonModule, SharedModule
],
})
export class HistoricidadModule {}
