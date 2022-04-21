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

    data: ResponseSeries[],
    parametros: any,
    nombreEstacion: string

    variablesSelected:{variable:string, altura:string}[]
}

const initialState: graficaUnicaState = {
    loading: false,
    loaded: false,
    error: null,

    loadingVariable: false,
    loadedVariable: false,
    errorVariable: null,

    data: [],
    parametros: undefined,
    nombreEstacion: "",
    variablesSelected:[]
}

const _graficaUnicaReducer = createReducer(

    initialState,

    on(graficaUnicaActions.loadingData, (state, { name, parametros }) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
        data: [],
        parametros,
        nombreEstacion: name,
        variablesSelected:[{variable:parametros.variable,altura:parametros.altura}
        ]
    })),

    ////////////////////////////////////////////////////////////////////////////////////

    on(graficaUnicaActions.loadingVariable, (state, { variable, altura }) => ({
        ...state,
        parametros: { ...state.parametros, variable, altura },
        loading: true,
        loaded: false,
        error: null,
        variablesSelected:[...state.variablesSelected,{variable,altura}]
    })),

    on(graficaUnicaActions.loadingVariableSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null,
        data: [...state.data, data]
    })),

    on(graficaUnicaActions.loadVariableError, (state, { error }) => ({
        ...state,
        loading: false,
        loaded: false,
        error
    })),

    on(graficaUnicaActions.deleteVariable, (state, { variable,altura }) => {
        let data = state.data.filter(el=>el.variable!=variable || el.altura != altura)
        let variablesSelected = state.variablesSelected.filter(el=>el.variable!=variable || el.altura != altura)
        return ({
            ...state,
            variablesSelected,
            data
        })
    })
);

export function graficaUnicaReducer(state: graficaUnicaState | undefined, action: Action) {
    return _graficaUnicaReducer(state, action);
}