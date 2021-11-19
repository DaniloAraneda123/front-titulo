import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterpolacionComponent } from './interpolacion.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    InterpolacionComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})

export class InterpolacionModule { }
