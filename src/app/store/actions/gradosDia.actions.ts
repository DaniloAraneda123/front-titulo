import { createAction, props } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';

export const agregarEstaciones = createAction(
    '[Grados Día - Mapa] Agregar Estaciones al Filtro',
    props<{ estaciones: string[] }>()
);

export const quitarEstacion = createAction(
    '[Grados Día - Mapa] Quitar Estacion de la lista',
    props<{ estacion: string }>()
);

export const quitarAllEstaciones = createAction(
    '[Grados Día - Mapa] Removemos todas las estaciones',
);

export const puntoCustom = createAction(
    '[Grados Día - Mapa] Se establece un punto custom',
    props<{ punto: { lat: number, lon: number } }>()
);

export const inputTemporal = createAction(
    '[Grados Día - Input Temporal] Actualizamos parametros temporales',
    props<{ fechaInicio: any, fechaTermino: any, agrupacionCustom: string, agrupacionTemporadas: string,  tipoConsulta: string }>()
);

export const loadingData = createAction(
    '[Grados Día - loading Data]  loading Data...',
);

export const setData = createAction(
    '[Grados Día - loading Data]  Data loaded SUCCESS',
    props<{ payload: ResponseSeries }>()
);

export const setDataError = createAction(
    '[Grados Día - loading Data] Data loading ERROR',
    props<{ payload: any }>()
);

export const resetData = createAction(
    '[Grados Día - Reset Store] resetenado store',
);