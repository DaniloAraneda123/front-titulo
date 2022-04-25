import { createAction, props } from '@ngrx/store';
import { ResponseSeries } from 'src/app/models/api.interface';

export const setParametros = createAction(
    '[Multi Estaciones] setear parametros de consulta y realizando primera consulta',
    props<{ parametros:any, estaciones:string[]}>()
);

export const changeVariable = createAction(
    '[Multi Estaciones] Cargando nueva variable',
    props<{ variable: string, altura: string }>()
);

export const loadingDataSuccess = createAction(
    '[Multi Estaciones] Exito Cargando Variable',
    props<{ data: ResponseSeries }>()
);

export const loadDataError = createAction(
    '[Multi Estaciones] Error Cargando Variable',
    props<{ error: any }>()
);