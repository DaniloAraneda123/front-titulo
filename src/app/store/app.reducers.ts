import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers'


export interface AppState {
    historicidad: reducers.HistoricidadState;
    graficaUnica: reducers.graficaUnicaState;
    horasFrio: reducers.HorasFrioState,
    evapotranspiracion: reducers.EvapotranspiracionState
}

export const appReducers: ActionReducerMap<AppState> = {
    historicidad: reducers.historicidadReducer,
    graficaUnica: reducers.graficaUnicaReducer,
    horasFrio: reducers.horasFrioReducer,
    evapotranspiracion: reducers.evapotranspiracionReducer
}