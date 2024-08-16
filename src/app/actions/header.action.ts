import { createAction, props } from '@ngrx/store';

export const loadHeader = createAction(
  "[ngx-loading] set show overlay loading",
  props<{ loading: boolean }>()
);


export const setIsHeader = createAction(
  "[ngx-loading] set show header",
  props<{ isHeader: boolean }>()
);




