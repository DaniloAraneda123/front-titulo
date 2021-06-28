import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../table/table.component';


declare var $: any;




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers:[TableComponent]

})
export class SidebarComponent implements OnInit {




  onSubmit(value: any){
    console.log(value);
    //this.table.cargarTabla(value);
  }

  constructor(private table: TableComponent) { }

  ngOnInit(): void {

  }





}
