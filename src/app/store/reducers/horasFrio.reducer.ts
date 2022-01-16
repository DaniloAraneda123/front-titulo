import { createReducer, on, Action } from '@ngrx/store';
import { SerieCustom } from 'src/app/models/api.interface';
import * as HfActions from '../actions/horasFrio.actions'

export interface HorasFrioState {
    estaciones: string[],
    temporalInput: { fechaInicio: any, fechaTermino: any, agrupacion: string }
    tipoConsulta: string,
    punto: { lat: number, lon: number },
    loading: boolean,
    loaded: boolean,
    error: any,
    dataHorasFrio: SerieCustom,
    dataEstaciones: any,
}

const initialState: HorasFrioState = {
    estaciones: [],
    temporalInput: null,
    tipoConsulta: null,
    punto: null,
    dataHorasFrio: null,
    dataEstaciones: null,
    loading: false,
    loaded: false,
    error: null,
}

const _horasFrioReducer = createReducer(

    initialState,

    on(HfActions.agregarEstaciones, (state, { estaciones }) => ({
        ...state,
        estaciones: [...estaciones],
        dataHorasFrio: null,
        loading: true
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

    on(HfActions.inputTemporal, (state, { fechaInicio, fechaTermino, agrupacion, tipoConsulta }) => ({
        ...state,
        temporalInput: { fechaInicio, fechaTermino, agrupacion },
        tipoConsulta
    })),

    on(HfActions.loadingData, (state) => ({
        ...state,
        error:null,
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
        dataHorasFrio: null,
        error: payload
    })),

    // on(historicidadActions.resetear, (state) => (initialState)),
);

export function horasFrioReducer(state: HorasFrioState | undefined, action: Action) {
    return _horasFrioReducer(state, action);
}