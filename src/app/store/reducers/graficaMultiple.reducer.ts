import { createReducer, on, Action } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';
import * as graficaMultipleActions from '../actions/graficaMultiple.actions';

export interface graficaMultipleState {
    loading: boolean,
    loaded: boolean,
    data: ResponseSeries[],
    error: any,
}

const initialState: graficaMultipleState = {
    data: [],
    error: null,
    loading: false,
    loaded: false
}

const _graficaMultipleReducer = createReducer(

    initialState,

    on(graficaMultipleActions.loadingData, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null
    })),

    on(graficaMultipleActions.loadingDataSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        loaded: true,
        variables: [...state.data, data]
    })),

    on(graficaMultipleActions.loadDataError, (state, { error }) => ({
        ...state,
        loading: false,
        loaded: false,
        error
    }))
);

export function graficaMultipleReducer(state: graficaMultipleState | undefined, action: Action) {
    return _graficaMultipleReducer(state, action);
}