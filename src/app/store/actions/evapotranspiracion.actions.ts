import { createAction, props } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';
import { ResponseSeriesComparacion } from 'src/app/models/api.interface';

export const agregarEstaciones = createAction(
    '[Evapotranspiracion - Mapa] Agregar Estaciones al Filtro',
    props<{ estaciones: string[] }>()
);

export const quitarEstacion = createAction(
    '[Evapotranspiracion - Mapa] Quitar Estacion de la lista',
    props<{ estacion: string }>()
);

export const quitarAllEstaciones = createAction(
    '[Evapotranspiracion - Mapa] Removemos todas las estaciones',
);

export const puntoCustom = createAction(
    '[Evapotranspiracion - Mapa] Se establece un punto custom',
    props<{ punto: { lat: number, lon: number } }>()
);

export const inputTemporal = createAction(
    '[Evapotranspiracion - Input Temporal] Actualizamos parametros temporales',
    props<{ fechaInicio: any, fechaTermino: any, agrupacionCustom: string, agrupacionTemporadas: string, tipoConsulta: string }>()
);

export const inputTemporalComparacion = createAction(
    '[Evapotranspiracion - Input Temporal Comparacion] Actualizamos parametros temporales',
    props<{ fechaInicio1: any, fechaTermino1: any, fechaInicio2: any, fechaTermino2: any, agrupacionCustom: string, agrupacionTemporadas: string, tipoConsulta: string }>()
);

export const loadingData = createAction(
    '[Evapotranspiracion - loading Data]  loading Data...',
);

export const setData = createAction(
    '[Evapotranspiracion - loading Data]  Data loaded SUCCESS',
    props<{ payload: ResponseSeries  }>()
);
export const setDataComparacion = createAction(
    '[Evapotranspiracion - loading Data Comparación]  Data loaded SUCCESS',
    props<{ payload: ResponseSeriesComparacion  }>()
);

export const setDataError = createAction(
    '[Evapotranspiracion - loading Data] Data loading ERROR',
    props<{ payload: any }>()
);