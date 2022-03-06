import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { catchError, debounceTime, exhaustMap, filter, map, tap } from 'rxjs/operators';
import * as historicidadActions from '../actions/historicidad.actions'
import { HistoricidadService } from '../../services/historicidad.service'
import { of } from 'rxjs';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';
import { RequestSerie } from 'src/app/models/api.interface';
import { C } from '@angular/cdk/keycodes';


@Injectable()
export class HistoricidadEffects {
    grafico$ = createEffect(() =>
        this.actions$.pipe(
            ofType(historicidadActions.loadingGrafico),
            concatLatestFrom(() =>
            this.store.select(el => {
                    console.log("sadsadasdasdasd")
                    let aux = el.historicidad
                    let body:RequestSerie = {
                        ...aux.parametros,
                        estaciones:aux.estaciones
                    }
                    return body
                })
            ),
            exhaustMap(([,body]) =>
                this.historicidadServices.consultarSerie(body).pipe(
                    map(response => historicidadActions.loadingGraficoSuccess({ newData: response })),
                    catchError((error) => of(historicidadActions.loadingGraficoError({ payload: error })))
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