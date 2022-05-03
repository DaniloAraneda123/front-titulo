import { createReducer, on, Action } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';
import { ResponseSeriesComparacion } from 'src/app/models/api.interface';
import * as EvActions from '../actions/evapotranspiracion.actions'

export interface EvapotranspiracionState {
    estaciones: string[],
    temporalInput: { fechaInicio: any, fechaTermino: any, agrupacionCustom: string, agrupacionTemporadas: string }
    temporalInputComparacion:{fechaInicio1: any, fechaTermino1: any,fechaInicio2: any, fechaTermino2: any,  agrupacionCustom: string, agrupacionTemporadas: string}
    tipoConsulta: string,
    punto: { lat: number, lon: number },
    loading: boolean,
    loaded: boolean,
    error: any,
    dataEvapotranspiracion: ResponseSeries, // Cambiar la serie
    dataEvapotranspiracionLista: ResponseSeriesComparacion,
    dataEstaciones: any,
}

const initialState: EvapotranspiracionState = {
    estaciones: [],
    temporalInput: null,
    temporalInputComparacion: null,
    tipoConsulta: null,
    punto: null,
    dataEvapotranspiracion: null,
    dataEvapotranspiracionLista: null,
    dataEstaciones: null,
    loading: false,
    loaded: false,
    error: null,
}

const _evapotranspiracionReducer = createReducer(

    initialState,

    on(EvActions.agregarEstaciones, (state, { estaciones }) => ({
        ...state,
        estaciones: [...estaciones],
        dataEvapotranspiracion: null,
    })),

    on(EvActions.quitarEstacion, (state, { estacion }) => {
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

    on(EvActions.quitarAllEstaciones, (state) => ({
        ...state,
        estaciones: []
    })),

    on(EvActions.inputTemporal, (state, { fechaInicio, fechaTermino, agrupacionCustom, agrupacionTemporadas, tipoConsulta }) => ({
        ...state,
        temporalInput: { fechaInicio, fechaTermino, agrupacionCustom, agrupacionTemporadas },
        tipoConsulta
    })),

    on(EvActions.inputTemporalComparacion, (state, { fechaInicio1, fechaTermino1, fechaInicio2, fechaTermino2, agrupacionCustom, agrupacionTemporadas, tipoConsulta }) => ({
        ...state,
        temporalInputComparacion: { fechaInicio1, fechaTermino1, fechaInicio2, fechaTermino2, agrupacionCustom, agrupacionTemporadas },
        tipoConsulta
    })),

    on(EvActions.loadingData, (state) => ({
        ...state,
        error: null,
        dataEvapotranspiracion: null,
        loading: true
    })),

    on(EvActions.setData, (state, { payload }) => ({
        ...state,
        dataEvapotranspiracion: payload,
        loading: false,
        loaded: true,
    })),
    on(EvActions.setDataComparacion, (state, { payload }) => ({
        ...state,
        dataEvapotranspiracionLista: payload,
        loading: false,
        loaded: true,
    })),

    on(EvActions.setDataError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        dataEvapotranspiracion: null,
        error: payload
    })),

    on(EvActions.resetStore, (state) => (initialState)),
);

export function evapotranspiracionReducer(state: EvapotranspiracionState | undefined, action: Action) {
    return _evapotranspiracionReducer(state, action);
}