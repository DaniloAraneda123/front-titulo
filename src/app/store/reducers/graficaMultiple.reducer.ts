import { createReducer, on, Action } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';
import * as graficaMultipleActions from '../actions/graficaMultiple.actions';

export interface graficaMultipleState {
    loading: boolean,
    loaded: boolean,
    data: ResponseSeries,
    estaciones: string[]
    parametros: {
        variable: string,
        altura: string,
        tipo_operacion: string,
        agrupacion: string
        fecha_inicio: string
        fecha_final: string
    }
    error: any,
}

const initialState: graficaMultipleState = {
    data: undefined,
    error: null,
    loading: false,
    loaded: false,
    estaciones: [],
    parametros: undefined
}

const _graficaMultipleReducer = createReducer(

    initialState,

    on(graficaMultipleActions.loadingDataSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        loaded: true,
        data: data
    })),

    on(graficaMultipleActions.loadDataError, (state, { error }) => ({
        ...state,
        loading: false,
        loaded: false,
        error
    })),

    on(graficaMultipleActions.setParametros, (state, { parametros, estaciones }) => ({
        ...state,
        parametros,
        estaciones
    })),

    on(graficaMultipleActions.changeVariable, (state, { variable, altura }) => ({
        ...state,
        loading: true,
        loaded: false,
        data: undefined,
        parametros: { ...state.parametros, variable, altura }
    })),

    on(graficaMultipleActions.setNewRange, (state, { fecha_inicio, fecha_final }) => ({
        ...state,
        parametros: { ...state.parametros, fecha_inicio, fecha_final },
    })),
);

export function graficaMultipleReducer(state: graficaMultipleState | undefined, action: Action) {
    return _graficaMultipleReducer(state, action);
}