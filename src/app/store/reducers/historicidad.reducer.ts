import { createReducer, on, Action } from '@ngrx/store';
import * as historicidadActions from '../actions/historicidad.actions'


export interface HistoricidadState {
    estaciones: string[],
    comparativa: boolean,
    loading: boolean,
    loaded: boolean,
    tipoConsulta: string,
    parametros: any,
    data: any
}


const initialState: HistoricidadState = {
    estaciones: [],
    comparativa: false,
    loading: false,
    loaded: false,
    tipoConsulta: "",
    data: {},
    parametros: {}
}

const _historicidadReducer = createReducer(

    initialState,

    on(historicidadActions.agregarEstacion, (state, { estacion }) => ({
        ...state,
        estaciones: [...state.estaciones, estacion]
    })),

    on(historicidadActions.quitarEstacion, (state, { estacion }) => ({
        ...state,
        estaciones: state.estaciones.filter(elemento => elemento !== estacion)
    })),

    on(historicidadActions.comparativaOnOff, (state) => ({
        ...state,
        comparativa: !state.comparativa,
        estaciones: []
    })),

    on(historicidadActions.quitarAllEstaciones, (state) => ({
        ...state,
        estaciones: []
    })),

    on(historicidadActions.loadingGrafico, (state, { parametros, tipo }) => ({
        ...state,
        loading: true,
        tipoConsulta: tipo,
        parametros: parametros
    })),

    on(historicidadActions.loadingGraficoSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        loaded: true,
        data: data
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
    }))

);

export function historicidadReducer(state: HistoricidadState | undefined, action: Action) {
    return _historicidadReducer(state, action);
}