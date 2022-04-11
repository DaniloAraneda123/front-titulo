import { createReducer, on, Action } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';
import * as GdActions from '../actions/gradosDia.actions'

export interface GradosDiaState {
    estaciones: string[],
    temporalInput: { fechaInicio: any, fechaTermino: any, agrupacionCustom: string,agrupacionTemporadas: string }
    tipoConsulta: string,
    punto: { lat: number, lon: number },
    loading: boolean,
    loaded: boolean,
    error: any,
    dataGradosDia: ResponseSeries,
    dataEstaciones: any,
}

const initialState: GradosDiaState = {
    estaciones: [],
    temporalInput: null,
    tipoConsulta: null,
    punto: null,
    dataGradosDia: null,
    dataEstaciones: null,
    loading: false,
    loaded: false,
    error: null,
}

const _gradosDiaReducer = createReducer(

    initialState,

    on(GdActions.agregarEstaciones, (state, { estaciones }) => ({
        ...state,
        estaciones: [...estaciones],
        dataGradosDia: null,
    })),

    on(GdActions.quitarEstacion, (state, { estacion }) => {
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

    on(GdActions.quitarAllEstaciones, (state) => ({
        ...state,
        estaciones: []
    })),

    on(GdActions.inputTemporal, (state, { fechaInicio, fechaTermino, agrupacionCustom, agrupacionTemporadas, tipoConsulta }) => ({
        ...state,
        temporalInput: { fechaInicio, fechaTermino, agrupacionCustom, agrupacionTemporadas},
        tipoConsulta
    })),

    on(GdActions.loadingData, (state) => ({
        ...state,
        error:null,
        dataGradosDia: null,
        loading: true
    })),

    on(GdActions.setData, (state, { payload }) => ({
        ...state,
        dataGradosDia: payload,
        loading: false,
        loaded: true,
    })),

    on(GdActions.setDataError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        dataGradosDia: null,
        error: payload
    })),

    // on(historicidadActions.resetear, (state) => (initialState)),
);

export function gradosDiaReducer(state: GradosDiaState | undefined, action: Action) {
    return _gradosDiaReducer(state, action);
}