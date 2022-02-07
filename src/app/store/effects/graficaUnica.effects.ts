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
            ofType(graficaUnicaActions.loadingData),
            concatLatestFrom(() => this.store.select(state => (state.historicidad))),
            exhaustMap(([{ altura, variable }, { parametros, tipoConsulta, estaciones }]) =>
                this.API_Services.consultarDatos({ ...parametros, altura, variable}, tipoConsulta, estaciones).pipe(
                    map(data => graficaUnicaActions.loadingDataSuccess({ data })),
                    catchError((error) => of(graficaUnicaActions.loadDataError({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private API_Services: HistoricidadService,
        private store: Store<AppState>,
    ) { }
}