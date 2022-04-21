import { createReducer, on, Action } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';
import { Variable } from 'src/app/models/variables.interface';
import * as historicidadActions from '../actions/historicidad.actions'

export interface HistoricidadState {
    estaciones: string[],
    comparativa: boolean,
    loading: boolean,
    loaded: boolean,
    parametros: any,
    error: any,
    variablesDisponibles: Variable[]
}

const initialState: HistoricidadState = {
    estaciones: [],
    comparativa: false,
    loading: false,
    loaded: false,
    parametros: {},
    error: null,
    variablesDisponibles: []
}



const _historicidadReducer = createReducer(

    initialState,

    on(historicidadActions.setStations, (state, { stations }) => ({
        ...state,
        estaciones: [...stations]
    })),

    on(historicidadActions.setForm, (state, { form }) => ({
        ...state,
        parametros: {...form}
    })),

    on(historicidadActions.setVariables, (state, { payload }) => ({
        ...state,
        variablesDisponibles:payload
    })),

    on(historicidadActions.loadingGrafico, (state) => ({
        ...state,
        loading:true,
        loaded:false
    })),
    
    on(historicidadActions.resetear, (state) => (initialState))

);

export function historicidadReducer(state: HistoricidadState, action: Action) {
    return _historicidadReducer(state, action);
}