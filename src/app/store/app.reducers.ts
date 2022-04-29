import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers'


export interface AppState {
    historicidad: reducers.HistoricidadState;
    graficaUnica: reducers.graficaUnicaState;
    graficaMultiple: reducers.graficaMultipleState;
    horasFrio: reducers.HorasFrioState;
    gradosDia: reducers.GradosDiaState;
    evapotranspiracion: reducers.EvapotranspiracionState;
}

export const appReducers: ActionReducerMap<AppState> = {
    historicidad: reducers.historicidadReducer,
    graficaUnica: reducers.graficaUnicaReducer,
    horasFrio: reducers.horasFrioReducer,
    gradosDia: reducers.gradosDiaReducer,
    graficaMultiple: reducers.graficaMultipleReducer,
    evapotranspiracion: reducers.evapotranspiracionReducer
}