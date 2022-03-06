import { createAction, props } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';

export const setStations = createAction(
    '[Historicidad] Agregar Estaciones',
    props<{ stations: string[] }>()
);

export const setForm = createAction(
    '[Historicidad] Set Formulario',
    props<{ form: {} }>()
);

export const loadingGrafico = createAction(
    '[Historicidad] Consultando Data para El grafico...'
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
