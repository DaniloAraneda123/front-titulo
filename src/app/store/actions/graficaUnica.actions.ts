import { createAction, props } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';

export const loadingData = createAction(
    '[Uni Variable] Inicializando Uni Estacion',
    props<{ name: string, parametros:any }>()
);

/////////////////////////////////////////////////////////////////////////////////////

export const loadingVariable = createAction(
    '[Uni Variable] Cargando variable',
    props<{ variable: string, altura: string }>()
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
    props<{ variable: string; altura: string; }>()
);
