import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers'


export interface AppState {
    historicidad: reducers.HistoricidadState
}

export const appReducers: ActionReducerMap<AppState> = {
    historicidad: reducers.historicidadReducer
}