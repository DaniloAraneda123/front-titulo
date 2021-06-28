import { Component, OnInit } from '@angular/core';
import { HistoricidadService } from 'src/app/services/historicidad.service';
import { Historicidad } from 'src/app/classes/historicidad';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  listdatos:Historicidad[];
  constructor(private _historidadService: HistoricidadService) { }


  cargarTabla(value:any){



  }
  ngOnInit(){

    this._historidadService.getHistoricidad().subscribe(
      data=>
      {
        this.listdatos = data;
        console.log('funciona')

      }

    )



  }


}
