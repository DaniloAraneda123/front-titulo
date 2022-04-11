import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { catchError, debounceTime, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import * as gdActions from '../actions/gradosDia.actions'
import { GradosDiaService } from '../../services/gradosDia.service'
import { of } from 'rxjs';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';


@Injectable()
export class GradosDiaEffects {
    data$ = createEffect(() =>
        this.actions$.pipe(
            ofType(gdActions.loadingData),
            debounceTime(100),
            concatLatestFrom(() => this.store.select(state => state.gradosDia)),
            switchMap(([, parametros]) => {
                if (parametros.tipoConsulta == '/serie_custom') {
                    return this.gradosDiaService.consultarSerieCustom(
                        {
                            estaciones: parametros.estaciones,
                            fecha_inicio: parametros.temporalInput.fechaInicio,
                            fecha_final: parametros.temporalInput.fechaTermino,
                            agrupacion: parametros.temporalInput.agrupacionCustom,
                            variable: "grados_dia_base_10",
                            altura: "2m"
                        }).pipe(
                            map(response => gdActions.setData({ payload: response })),
                            catchError((error) => of(gdActions.setDataError({ payload: error })))
                        )
                } else {
                    return this.gradosDiaService.consultarSerieTemporadas(
                        {
                            estaciones: parametros.estaciones,
                            fecha_inicio: parametros.temporalInput.fechaInicio,
                            fecha_final: parametros.temporalInput.fechaTermino,
                            agrupacion: parametros.temporalInput.agrupacionTemporadas,
                            variable: "grados_dia_base_10",
                            altura: "2m"
                        }).pipe(
                            map(response => gdActions.setData({ payload: response })),
                            catchError((error) => of(gdActions.setDataError({ payload: error })))
                        )
                }
            })
        )
    )



    constructor(
        private actions$: Actions,
        private gradosDiaService: GradosDiaService,
        private store: Store<AppState>,
    ) { }
}