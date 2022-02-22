import { createAction, props } from '@ngrx/store';
import { SerieCustom } from 'src/app/models/api.interface';

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

export const loadingData = createAction(
    '[Evapotranspiracion - loading Data]  loading Data...',
);

export const setData = createAction(
    '[Evapotranspiracion - loading Data]  Data loaded SUCCESS',
    props<{ payload: SerieCustom }>()
);

export const setDataError = createAction(
    '[Evapotranspiracion - loading Data] Data loading ERROR',
    props<{ payload: any }>()
);