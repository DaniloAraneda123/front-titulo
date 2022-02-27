import { createReducer, on, Action } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';
import * as graficaUnicaActions from '../actions/graficaUnica.actions'

export interface graficaUnicaState {
    loading: boolean,
    loaded: boolean,
    data: ResponseSeries[],
    error: any,
}

const initialState: graficaUnicaState = {
    data: [],
    error: null,
    loading: false,
    loaded: false
}

const _graficaUnicaReducer = createReducer(

    initialState,

    on(graficaUnicaActions.loadingData, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null
    })),

    on(graficaUnicaActions.loadingDataSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        loaded: true,
        variables: [...state.data, data]
    })),

    on(graficaUnicaActions.loadDataError, (state, { error }) => ({
        ...state,
        loading: false,
        loaded: false,
        error
    }))
);

export function graficaUnicaReducer(state: graficaUnicaState | undefined, action: Action) {
    return _graficaUnicaReducer(state, action);
}