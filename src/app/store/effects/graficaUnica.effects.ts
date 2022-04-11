import { AppState } from './../app.reducers';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as graficaUnicaActions from '../actions/graficaUnica.actions'
import { HistoricidadService } from '../../services/historicidad.service'
import { of } from 'rxjs';
import { Store } from '@ngrx/store';


@Injectable()
export class GraficaUnicaEffects {
    variable$ = createEffect(() =>
        this.actions$.pipe(
            ofType(graficaUnicaActions.loadingVariable),
            concatLatestFrom(() => this.store.select(state => state.graficaUnica.parametros)),
            exhaustMap(([{ altura, variable }, parametros ]) =>{
                console.log({ parametros, altura, variable})
                return this.API_Services.consultarSerie({ ...parametros, altura, variable}).pipe(
                    map(data => graficaUnicaActions.loadingVariableSuccess({ data })),
                    catchError((error) => of(graficaUnicaActions.loadVariableError({ error })))
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