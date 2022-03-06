import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { OptionsSideBar } from '../../components/side-bar-options/side-bar-options.component';
import * as ActionsHistoricidad from 'src/app/store/actions/historicidad.actions'


@Component({
	selector: 'app-main-historicidad',
	templateUrl: './main-historicidad.component.html',
	styleUrls: ['./main-historicidad.component.scss']
})
export class MainHistoricidadComponent implements OnInit {



	stationsSelected: string[] = []
	comparative: boolean = false

	constructor(
		private _store: Store<AppState>,
		private _router: Router
	) { }

	ngOnInit() { }

	setStationsSelected(stations: string[]) {
		this._store.dispatch(ActionsHistoricidad.setStations({ stations }))
	}
}
