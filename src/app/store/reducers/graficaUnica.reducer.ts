import { setParametros } from './../actions/graficaMultiple.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';
import * as graficaUnicaActions from '../actions/graficaUnica.actions'

export interface graficaUnicaState {
    loading: boolean,
    loaded: boolean,
    error: any,

    loadingVariable: boolean,
    loadedVariable: boolean,
    errorVariable: any,

    parametros: any,
    estacion: string
    data: ResponseSeries[],

    variablesSelected: { variable: string, altura: string, tipo_operacion: string }[]
}

const initialState: graficaUnicaState = {
    loading: false,
    loaded: false,
    error: undefined,
    loadingVariable: false,
    loadedVariable: false,
    errorVariable: undefined,
    data: [],
    parametros: undefined,
    estacion: undefined,
    variablesSelected: []
}

const _graficaUnicaReducer = createReducer(

    initialState,

    on(graficaUnicaActions.setParametros, (state, { estacion, parametros }) => ({
        ...state,
        loading: true,
        loaded: false,
        error: undefined,
        data: [],
        parametros,
        estacion,
        variablesSelected: [{
            variable: parametros.variable,
            altura: parametros.altura,
            tipo_operacion: parametros.tipo_operacion
        }]
    })),

    ////////////////////////////////////////////////////////////////////////////////////

    on(graficaUnicaActions.loadingNewVariable, (state, { variable, altura, tipo_operacion }) => ({
        ...state,
        loading: true,
        loaded: false,
        error: undefined,
        variablesSelected: [...state.variablesSelected, { variable, altura, tipo_operacion }]
    })),

    on(graficaUnicaActions.loadingVariableSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: undefined,
        data: [...state.data, data]
    })),

    on(graficaUnicaActions.loadVariableError, (state, { error }) => ({
        ...state,
        loading: false,
        loaded: false,
        error
    })),

    on(graficaUnicaActions.deleteVariable, (state, { variable, altura }) => {
        let data = state.data.filter(el => el.variable != variable || el.altura != altura)
        let variablesSelected = state.variablesSelected.filter(el => el.variable != variable || el.altura != altura)
        return ({
            ...state,
            variablesSelected,
            data
        })
    }),

    on(graficaUnicaActions.setNewRange, (state, { start, end }) => ({
        ...state,
        parametros: { ...state.parametros, fecha_inicio: start, fecha_final: end },
    })),

    on(graficaUnicaActions.setNewData, (state, { data }) => ({
        ...state,
        data
    }))
);

export function graficaUnicaReducer(state: graficaUnicaState | undefined, action: Action) {
    return _graficaUnicaReducer(state, action);
}