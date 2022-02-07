import { createAction, props } from '@ngrx/store';
import { SerieCustom } from 'src/app/models/api.interface';

export const agregarEstaciones = createAction(
    '[Horas Frio - Mapa] Agregar Estaciones al Filtro',
    props<{ estaciones: string[] }>()
);

export const quitarEstacion = createAction(
    '[Horas Frio - Mapa] Quitar Estacion de la lista',
    props<{ estacion: string }>()
);

export const quitarAllEstaciones = createAction(
    '[Horas Frio - Mapa] Removemos todas las estaciones',
);

export const puntoCustom = createAction(
    '[Horas Frio - Mapa] Se establece un punto custom',
    props<{ punto: { lat: number, lon: number } }>()
);

export const inputTemporal = createAction(
    '[Horas Frio - Input Temporal] Actualizamos parametros temporales',
    props<{ fechaInicio: any, fechaTermino: any, agrupacionCustom: string, agrupacionTemporadas: string,  tipoConsulta: string }>()
);

export const loadingData = createAction(
    '[Horas Frio - loading Data]  loading Data...',
);

export const setData = createAction(
    '[Horas Frio - loading Data]  Data loaded SUCCESS',
    props<{ payload: SerieCustom }>()
);

export const setDataError = createAction(
    '[Horas Frio - loading Data] Data loading ERROR',
    props<{ payload: any }>()
);