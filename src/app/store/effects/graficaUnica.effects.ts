import { AppState } from './../app.reducers';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import * as graficaUnicaActions from '../actions/graficaUnica.actions'
import { HistoricidadService } from '../../services/historicidad.service'
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';


@Injectable()
export class GraficaUnicaEffects {

    firstLoad$ = createEffect(() =>
        this.actions$.pipe(
            ofType(graficaUnicaActions.setParametros),
            exhaustMap(({ parametros, estacion }) =>
                this.API_Services.consultarSerie({ ...parametros, estaciones: [estacion] }).pipe(
                    map(response => graficaUnicaActions.loadingVariableSuccess({ data: response })),
                    catchError((error) => of(graficaUnicaActions.loadVariableError({ error })))
                )
            )
        )
    )

    newVariable$ = createEffect(() =>
        this.actions$.pipe(
            ofType(graficaUnicaActions.loadingNewVariable),
            concatLatestFrom(() => this.store.select(state => state.graficaUnica)),
            exhaustMap(([newVariable, { parametros, estacion }]) => {
                return this.API_Services.consultarSerie({ ...parametros, estaciones: [estacion], ...newVariable }).pipe(
                    map(data => graficaUnicaActions.loadingVariableSuccess({ data })),
                    catchError((error) => of(graficaUnicaActions.loadVariableError({ error })))
                )
            }
            )
        )
    );

    // newRange$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(graficaUnicaActions.setNewRange),
    //         concatLatestFrom(() => this.store.select(state => state.graficaUnica)),
    //         exhaustMap(([newRange, { parametros, estacion }]) => {
    //             // const { parametros, estacion } = await this._store.select(el => el.graficaUnica).pipe(take(1)).toPromise()
    //             const  data:ResponseSeries[] = []
    //             for (let variable of this.variablesSelected) {
    //             	data.push(this.apiService.consultarSerie({...parametros,estaciones: [estacion]}).toPromise())
    //             }
    //             return this.API_Services.consultarSerie({ ...parametros, estaciones: [estacion], ...newRange }).pipe(
    //                 map(data => graficaUnicaActions.loadingVariableSuccess({ data })),
    //                 catchError((error) => of(graficaUnicaActions.loadVariableError({ error })))
    //             )
    //         }
    //         )
    //     )
    // );

    constructor(
        private actions$: Actions,
        private API_Services: HistoricidadService,
        private store: Store<AppState>,
    ) { }
}