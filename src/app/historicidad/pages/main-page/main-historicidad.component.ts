import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as ActionsHistoricidad from 'src/app/store/actions/historicidad.actions'
import { MatDialog } from '@angular/material/dialog';
import { HelpMainComponent } from '../../components/help-main/help-main.component';


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
		private _dialog: MatDialog,
	) { }

	ngOnInit() { }

	setStationsSelected(stations: string[]) {
		this._store.dispatch(ActionsHistoricidad.setStations({ stations }))
	}

	dialogHelp() { 
		this._dialog.open(HelpMainComponent, { height: "70vh", width: "70vw" }) 
	}
}
