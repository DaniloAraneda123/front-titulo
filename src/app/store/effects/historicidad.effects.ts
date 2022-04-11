import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { catchError, debounceTime, exhaustMap, filter, map, switchMap, tap } from 'rxjs/operators';
import * as historicidadActions from '../actions/historicidad.actions'
import * as graficaUnicaActions from '../actions/graficaUnica.actions'
import * as graficaMultipleActions from '../actions/graficaUnica.actions'
import { HistoricidadService } from '../../services/historicidad.service'
import { of } from 'rxjs';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';
import { RequestSerie } from 'src/app/models/api.interface';



@Injectable()
export class HistoricidadEffects {

    graficos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(historicidadActions.loadingGrafico),
            debounceTime(100),
            concatLatestFrom(() => this.store.select(el => {
                let aux = el.historicidad
                let body: RequestSerie = {
                    ...aux.parametros,
                    estaciones: aux.estaciones
                }
                return body
            })),
            switchMap(([, parametros]) => {
                console.log(parametros)
                if (parametros.estaciones.length == 1) {
                    console.log({name:parametros.estaciones[0],parametros:parametros})
                    this.store.dispatch(graficaUnicaActions.loadingData({name:parametros.estaciones[0],parametros:parametros}))
                    return this.historicidadServices.consultarSerie(parametros).pipe(
                            map(response => graficaUnicaActions.loadingVariableSuccess({ data: response })),
                            catchError((error) => of(graficaUnicaActions.loadVariableError({ error })))
                        )
                }
                else {

                    ////Remplazar por multiple
                    return this.historicidadServices.consultarSerie(parametros).pipe(
                        map(response => graficaUnicaActions.loadingVariableSuccess({ data: response })),
                        catchError((error) => of(graficaUnicaActions.loadVariableError({ error })))
                    )
                }
            })
        )
    )

    // grafico$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(historicidadActions.loadingGrafico),
    //         concatLatestFrom(() =>
    //         this.store.select(el => {
    //                 console.log("sadsadasdasdasd")
    //                 let aux = el.historicidad
    //                 let body:RequestSerie = {
    //                     ...aux.parametros,
    //                     estaciones:aux.estaciones
    //                 }
    //                 return body
    //             })
    //         ),
    //         exhaustMap(([,body]) =>
    //             this.historicidadServices.consultarSerie(body).pipe(
    //                 map(response => historicidadActions.loadingGraficoSuccess({ newData: response })),
    //                 catchError((error) => of(historicidadActions.loadingGraficoError({ payload: error })))
    //             )
    //         )
    //     )
    // );

    constructor(
        private actions$: Actions,
        private historicidadServices: HistoricidadService,
        private store: Store<AppState>,
    ) { }
}