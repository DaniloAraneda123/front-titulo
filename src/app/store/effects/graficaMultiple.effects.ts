import { AppState } from './../app.reducers';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { HistoricidadService } from '../../services/historicidad.service'
import { Store } from '@ngrx/store';


@Injectable()
export class GraficaMultipleEffects {
    // variable$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(graficaUnicaActions.loadingData),
    //         concatLatestFrom(() => this.store.select(state => (state.historicidad))),
    //         exhaustMap(([{ altura, variable }, { parametros, tipoConsulta, estaciones }]) =>
    //             this.API_Services.consultarDatos({ ...parametros, altura, variable}, tipoConsulta, estaciones).pipe(
    //                 map(data => graficaUnicaActions.loadingDataSuccess({ data })),
    //                 catchError((error) => of(graficaUnicaActions.loadDataError({ error })))
    //             )
    //         )
    //     )
    // );

    constructor(
        private actions$: Actions,
        private API_Services: HistoricidadService,
        private store: Store<AppState>,
    ) { }
}