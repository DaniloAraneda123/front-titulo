import { createAction, props } from '@ngrx/store';

export const loadingData = createAction(
    '[Multi Variable] Cargando Data Variable',
    props<{ variable: string, altura: string }>()
);

export const loadingDataSuccess = createAction(
    '[Multi Variable] Exito Cargando Variable',
    props<{ data: any }>()
);

export const loadDataError = createAction(
    '[Multi Variable] Error Cargando Variable',
    props<{ error: any }>()
);

