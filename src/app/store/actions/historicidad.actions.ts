import { createAction, props } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';
import { Variable } from 'src/app/models/variables.interface';

export const agregarEstacion = createAction(
    '[Historicidad] Agregar Estacion al Filtro',
    props<{ estacion: string }>()
);

export const quitarEstacion = createAction(
    '[Historicidad] Quitar Estacion del Filtro',
    props<{ estacion: string }>()
);

export const comparativaOnOff = createAction(
    '[Historicidad] On/Off comparacion de Estaciones',
);

export const loadingGrafico = createAction(
    '[Historicidad] Consultando Data para El grafico...',
    props<{ tipo: string, parametros: any, estaciones: string[] }>()
);

export const cargarData = createAction(
    '[Historicidad] Cargando Data',
);

export const quitarAllEstaciones = createAction(
    '[Historicidad] Quitamos todas las estaciones del filtro',
);

export const loadingGraficoSuccess = createAction(
    '[Historicidad] Carga Exitosa, Generando grafico...',
    props<{ newData: ResponseSeries }>()
);

export const loadingGraficoError = createAction(
    '[Historicidad] Carga Fallida',
    props<{ payload: any }>()
);

export const resetear = createAction(
    '[Historicidad] Resetear filtros'
);

export const setVariables = createAction(
    '[Historicidad] Variables Cargadas',
    props<{ payload: Variable[] }>()
);

export const setVariablesError = createAction(
    '[Historicidad] Error Cargar Variables',
    props<{ payload: any }>()
);

