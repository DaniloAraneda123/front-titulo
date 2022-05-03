import { createReducer, on, Action } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';
import * as HfActions from '../actions/horasFrio.actions'

export interface HorasFrioState {
    estaciones: string[],
    temporalInput: { fechaInicio: any, fechaTermino: any, agrupacionCustom: string,agrupacionTemporadas: string }
    tipoConsulta: string,
    punto: { lat: number, lon: number },
    loading: boolean,
    loaded: boolean,
    error: any,
    dataHorasFrio: ResponseSeries,
    dataEstaciones: any,
}

const initialState: HorasFrioState = {
    estaciones: [],
    temporalInput: undefined,
    tipoConsulta: undefined,
    punto: undefined,
    dataHorasFrio: undefined,
    dataEstaciones: undefined,
    loading: false,
    loaded: false,
    error: undefined,
}

const _horasFrioReducer = createReducer(

    initialState,

    on(HfActions.agregarEstaciones, (state, { estaciones }) => ({
        ...state,
        estaciones: [...estaciones],
        dataHorasFrio: undefined,
    })),

    on(HfActions.quitarEstacion, (state, { estacion }) => {
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

    on(HfActions.quitarAllEstaciones, (state) => ({
        ...state,
        estaciones: []
    })),

    on(HfActions.inputTemporal, (state, { fechaInicio, fechaTermino, agrupacionCustom, agrupacionTemporadas, tipoConsulta }) => ({
        ...state,
        temporalInput: { fechaInicio, fechaTermino, agrupacionCustom, agrupacionTemporadas},
        tipoConsulta
    })),

    on(HfActions.loadingData, (state) => ({
        ...state,
        error:undefined,
        dataHorasFrio: null,
        loading: true
    })),

    on(HfActions.setData, (state, { payload }) => ({
        ...state,
        dataHorasFrio: payload,
        loading: false,
        loaded: true,
    })),

    on(HfActions.setDataError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        dataHorasFrio: undefined,
        error: payload
    })),

    on(HfActions.resetData, (state) => (initialState)),
);

export function horasFrioReducer(state: HorasFrioState | undefined, action: Action) {
    return _horasFrioReducer(state, action);
}