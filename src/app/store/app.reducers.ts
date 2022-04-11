import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers'


export interface AppState {
    historicidad: reducers.HistoricidadState;
    graficaUnica: reducers.graficaUnicaState;
    graficaMultiple: reducers.graficaMultipleState;
    horasFrio: reducers.HorasFrioState;
    evapotranspiracion: reducers.EvapotranspiracionState;
}

export const appReducers: ActionReducerMap<AppState> = {
    historicidad: reducers.historicidadReducer,
    graficaUnica: reducers.graficaUnicaReducer,
    graficaMultiple: reducers.graficaMultipleReducer,
    horasFrio: reducers.horasFrioReducer,
    // gradosDia: reducers.horasFrioReducer,
    evapotranspiracion: reducers.evapotranspiracionReducer
}