import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers'


export interface AppState {
    historicidad: reducers.HistoricidadState;
    graficaUnica: reducers.graficaUnicaState
}

export const appReducers: ActionReducerMap<AppState> = {
    historicidad: reducers.historicidadReducer,
    graficaUnica: reducers.graficaUnicaReducer
}