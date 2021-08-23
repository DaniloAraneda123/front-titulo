
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as historicidadActions from '../actions/historicidad.actions'
import { HistoricidadService } from '../../services/historicidad.service'
import { of } from 'rxjs';


@Injectable()
export class HistoricidadEffects {
    grafico$ = createEffect(() =>
        this.actions$.pipe(
            ofType(historicidadActions.loadingGrafico),
            exhaustMap(action =>
                this.historicidadServices.consultarDatos(action.parametros, action.tipo, action.estaciones).pipe(
                    map(response => historicidadActions.loadingGraficoSuccess({ data: response })),
                    catchError((error) => of(historicidadActions.loadingGraficoError({ payload: error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private historicidadServices: HistoricidadService
    ) { }
}