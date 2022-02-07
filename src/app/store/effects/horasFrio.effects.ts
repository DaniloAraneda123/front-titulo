import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { catchError, debounceTime, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import * as hfActions from '../actions/horasFrio.actions'
import { HorasFrioService } from '../../services/horasFrio.service'
import { of } from 'rxjs';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';


@Injectable()
export class HorasFrioEffects {
    data$ = createEffect(() =>
        this.actions$.pipe(
            ofType(hfActions.loadingData),
            debounceTime(100),
            concatLatestFrom(() => this.store.select(state => state.horasFrio)),
            switchMap(([, parametros]) => {
                if (parametros.tipoConsulta == '/serie_custom') {
                    return this.horasFrioService.consultarSerieCustom(
                        {
                            estaciones: parametros.estaciones,
                            fecha_inicio: parametros.temporalInput.fechaInicio,
                            fecha_final: parametros.temporalInput.fechaTermino,
                            agrupacion: parametros.temporalInput.agrupacionCustom,
                            variable: "horas_frio_base_7",
                            altura: "2m"
                        }).pipe(
                            map(response => hfActions.setData({ payload: response })),
                            catchError((error) => of(hfActions.setDataError({ payload: error })))
                        )
                } else {
                    return this.horasFrioService.consultarSerieTemporadas(
                        {
                            estaciones: parametros.estaciones,
                            fecha_inicio: parametros.temporalInput.fechaInicio,
                            fecha_final: parametros.temporalInput.fechaTermino,
                            agrupacion: parametros.temporalInput.agrupacionTemporadas,
                            variable: "horas_frio_base_7",
                            altura: "2m"
                        }).pipe(
                            map( response => hfActions.setData({ payload: response }) ),
                            catchError((error) => of(hfActions.setDataError({ payload: error })))
                        )
                }
            })
        )
    )



    constructor(
        private actions$: Actions,
        private horasFrioService: HorasFrioService,
        private store: Store<AppState>,
    ) { }
}