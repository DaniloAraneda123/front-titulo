import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit {

  public cargando: boolean = false
  public datos: any;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('historicidad').subscribe((state) => {
      this.cargando = state.loading
      this.datos = state.data
    })
  }

}
