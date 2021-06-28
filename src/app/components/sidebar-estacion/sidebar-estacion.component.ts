
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ControlContainer, NgModelGroup } from '@angular/forms';

interface variable{
  id:number;
  name:string;
}

interface altura{
id:number;
name:string;
}

@Component({
  selector: 'app-sidebar-estacion',
  templateUrl: './sidebar-estacion.component.html',
  styleUrls: ['./sidebar-estacion.component.scss'],
  viewProviders:[{provide: ControlContainer, useExisting:NgModelGroup}]
})
export class SidebarEstacionComponent implements OnInit {


  variablesObject : variable[];
  selectedObjectTemperatura : variable;
  alturasObject: altura[];
  selectedObjectAltura: altura;



  constructor() {  this.variablesObject = [
    {id: 1, name: "Temperatura Mínima"},
    {id: 2, name: "Temperatura Máxima"},
    {id: 3, name: "Temperatura Promedio"},
  ]

    this.alturasObject = [
      {id: 1.5, name: "1.5"},
      {id: 2, name: "2"},
      {id: 0.5, name: "0.5"}
    ]

  }
/*
  static addEstacionForm(): FormGroup{
    return new FormGroup(controls: {
      estaciones: new FormArray('');
    }
  }
*/
  ngOnInit(): void {
  }


}
