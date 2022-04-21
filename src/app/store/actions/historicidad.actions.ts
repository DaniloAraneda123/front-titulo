import { createAction, props } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';
import { Variable } from '../../models/variables.interface';

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

export const resetear = createAction(
    '[Historicidad] Resetear filtros'
);

export const setVariables = createAction(
    '[Historicidad] Set Variables disponibles',
    props<{ payload: Variable[] }>()
);