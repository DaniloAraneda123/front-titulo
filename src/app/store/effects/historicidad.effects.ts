import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { catchError, debounceTime, exhaustMap, filter, map, tap } from 'rxjs/operators';
import * as historicidadActions from '../actions/historicidad.actions'
import { HistoricidadService } from '../../services/historicidad.service'
import { of } from 'rxjs';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';


@Injectable()
export class HistoricidadEffects {
    grafico$ = createEffect(() =>
        this.actions$.pipe(
            ofType(historicidadActions.loadingGrafico),
            exhaustMap(action =>
                this.historicidadServices.consultarDatos(action.parametros, action.tipo, action.estaciones).pipe(
                    map(response => historicidadActions.loadingGraficoSuccess({ newData: response })),
                    catchError((error) => of(historicidadActions.loadingGraficoError({ payload: error })))
                )
            )
        )
    );

    variables$ = createEffect(() =>
        this.actions$.pipe(
            ofType(historicidadActions.agregarEstacion, historicidadActions.quitarEstacion),
            concatLatestFrom(() => this.store.select(state => state.historicidad.estaciones)),
            debounceTime(800),
            filter( ([, estaciones]) => estaciones.length>0),
            exhaustMap(([, estaciones]) =>
                this.historicidadServices.consultarVariables(estaciones).pipe(
                    map(response => historicidadActions.setVariables({ payload: response.variables })),
                    catchError((error) => of(historicidadActions.setVariablesError({ payload: error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private historicidadServices: HistoricidadService,
        private store: Store<AppState>,
    ) { }
}