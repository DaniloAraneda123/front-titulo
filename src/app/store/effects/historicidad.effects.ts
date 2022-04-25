import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { HistoricidadService } from '../../services/historicidad.service'
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class HistoricidadEffects {

    constructor(
        // private actions$: Actions,
        // private historicidadServices: HistoricidadService,
        // private store: Store<AppState>,
    ) { }
} 