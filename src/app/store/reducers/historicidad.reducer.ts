import { createReducer, on, Action } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';
import { Variable } from 'src/app/models/variables.interface';
import * as historicidadActions from '../actions/historicidad.actions'

export interface HistoricidadState {
    estaciones: string[],
    comparativa: boolean,
    loading: boolean,
    loaded: boolean,
    tipoConsulta: string,
    parametros: any,
    data: ResponseSeries[],
    error: any,
    variablesDisponibles: Variable[]
}

const initialState: HistoricidadState = {
    estaciones: [],
    comparativa: false,
    loading: false,
    loaded: false,
    tipoConsulta: "",
    data: null,
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

    on(historicidadActions.loadingGrafico, (state) => ({
        ...state,
        loading: true,
    })),

    on(historicidadActions.loadingGraficoSuccess, (state, { newData }) => ({
        ...state,
        loading: false,
        loaded: true,
        data: [...state.data, newData]
    })),

    on(historicidadActions.loadingGraficoError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),

    on(historicidadActions.resetear, (state) => (initialState))

);

export function historicidadReducer(state: HistoricidadState, action: Action) {
    return _historicidadReducer(state, action);
}