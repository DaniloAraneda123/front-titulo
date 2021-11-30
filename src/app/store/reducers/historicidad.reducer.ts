import { createReducer, on, Action } from '@ngrx/store';
import * as historicidadActions from '../actions/historicidad.actions'

export interface HistoricidadState {
    estaciones: string[],
    comparativa: boolean,
    loading: boolean,
    loaded: boolean,
    tipoConsulta: string,
    parametros: any,
    data: any,
    error: any,
    variablesDisponibles: any
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
    variablesDisponibles: {}
}



const _historicidadReducer = createReducer(

    initialState,

    on(historicidadActions.agregarEstacion, (state, { estacion }) => ({
        ...state,
        estaciones: [...state.estaciones, estacion],
        loading: true
    })),

    on(historicidadActions.quitarEstacion, (state, { estacion }) => {
        let cargando: boolean = false
        if (state.estaciones.length > 1) {
            cargando = true
        }
        return {
            ...state,
            estaciones: state.estaciones.filter(elemento => elemento !== estacion),
            loading: cargando
        }
    }),

    on(historicidadActions.comparativaOnOff, (state) => ({
        ...state,
        comparativa: !state.comparativa,
        estaciones: []
    })),

    on(historicidadActions.quitarAllEstaciones, (state) => ({
        ...state,
        estaciones: [],
        variablesDisponibles: {}
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
        data
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

    on(historicidadActions.resetear, (state) => (initialState)),

    on(historicidadActions.setVariables, (state, { payload }) => ({
        ...state,
        variablesDisponibles: payload,
        error: null,
        loading: false
    })),

    on(historicidadActions.setVariablesError, (state, { payload }) => ({
        ...state,
        variablesDisponibles: {},
        error: payload,
        loading: false
    }))

);

export function historicidadReducer(state: HistoricidadState | undefined, action: Action) {
    return _historicidadReducer(state, action);
}