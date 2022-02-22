import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { catchError, debounceTime, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
//import * as hfActions from '../actions/horasFrio.actions'
import * as evActions from '../actions/evapotranspiracion.actions'
//import { HorasFrioService } from '../../services/horasFrio.service'
import { EvapotranspiracionService } from '../../services/evapotranspiracion.service'
import { of } from 'rxjs';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';


@Injectable()
export class EvapotranspiracionEffects {
    data$ = createEffect(() =>
        this.actions$.pipe(
            ofType(evActions.loadingData),
            debounceTime(100),
            concatLatestFrom(() => this.store.select(state => state.evapotranspiracion)),
            switchMap(([, parametros]) => {
                if (parametros.tipoConsulta == '/serie_custom') {
                    return this.evapotranspiracionService.consultarSerieCustom(
                        {
                            estaciones: parametros.estaciones,
                            fecha_inicio: parametros.temporalInput.fechaInicio,
                            fecha_final: parametros.temporalInput.fechaTermino,
                            agrupacion: parametros.temporalInput.agrupacionCustom,
                            variable: "evapotranspiracion",
                            altura: "0.1m"
                        }).pipe(
                            map(response => evActions.setData({ payload: response })),
                            catchError((error) => of(evActions.setDataError({ payload: error })))
                        )
                } else {
                    return this.evapotranspiracionService.consultarSerieTemporadas(
                        {
                            estaciones: parametros.estaciones,
                            fecha_inicio: parametros.temporalInput.fechaInicio,
                            fecha_final: parametros.temporalInput.fechaTermino,
                            agrupacion: parametros.temporalInput.agrupacionTemporadas,
                            variable: "evapotranspiracion",
                            altura: "0.1m"
                        }).pipe(
                            map(response => evActions.setData({ payload: response })),
                            catchError((error) => of(evActions.setDataError({ payload: error })))
                        )
                }
            })
        )
    )



    constructor(
        private actions$: Actions,
        private evapotranspiracionService: EvapotranspiracionService,
        private store: Store<AppState>,
    ) { }
}