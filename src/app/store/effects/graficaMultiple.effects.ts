import { AppState } from './../app.reducers';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { HistoricidadService } from '../../services/historicidad.service'
import { Store } from '@ngrx/store';
import * as graficaMultipleActions from 'src/app/store/actions/graficaMultiple.actions'
import { exhaustMap } from 'rxjs/internal/operators/exhaustMap';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class GraficaMultipleEffects {

    firstLoad$ = createEffect(() =>
        this.actions$.pipe(
            ofType(graficaMultipleActions.setParametros),
            exhaustMap(({ parametros, estaciones }) =>
                this.API_Services.consultarSerie({ ...parametros, estaciones }).pipe(
                    map(response => graficaMultipleActions.loadingDataSuccess({ data: response })),
                    catchError((error) => of(graficaMultipleActions.loadDataError({ error })))
                )
            )
        )
    )

    changeVariable$ = createEffect(() =>
        this.actions$.pipe(
            ofType(graficaMultipleActions.changeVariable),
            concatLatestFrom(() => this.store.select(state => (state.graficaMultiple))),
            exhaustMap(([{ altura, variable }, { parametros, estaciones }]) => {
                return this.API_Services.consultarSerie({ ...parametros, altura, variable, estaciones }).pipe(
                    map(data => graficaMultipleActions.loadingDataSuccess({ data })),
                    catchError((error) => of(graficaMultipleActions.loadDataError({ error })))
                )
            }
            )
        )
    );

    constructor(
        private actions$: Actions,
        private API_Services: HistoricidadService,
        private store: Store<AppState>,
    ) { }
}