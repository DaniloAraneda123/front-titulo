import { createAction, props } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';

export const setParametros = createAction(
    '[Uni Variable] Inicializando Uni Estacion y realizar primera consulta',
    props<{ parametros: any, estacion: string }>()
);

export const loadingNewVariable = createAction(
    '[Uni Variable] Cargando variable',
    props<{ variable: string, altura: string, tipo_operacion: string }>()
);

export const loadingVariableSuccess = createAction(
    '[Uni Variable] Variable cargada',
    props<{ data: ResponseSeries }>()
);

export const loadVariableError = createAction(
    '[Uni Variable] Error variable',
    props<{ error: any }>()
);

export const deleteVariable = createAction(
    '[Uni Variable] Delete Variable ',
    props<{ variable: string, altura: string }>()
);

export const setNewRange = createAction(
    '[Uni Variable] Establecer un nuevo rango de fechas',
    props<{ start: string, end: string }>()
)

export const setNewData = createAction(
    '[Uni Variable] Establecer data con los nuevos rangos',
    props<{ data: ResponseSeries[] }>()
)

