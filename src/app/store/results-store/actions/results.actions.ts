import { Sports } from "@app/core/models/sports.model";
import { createAction, props } from "@ngrx/store";

export const loadResults = createAction(
  '[Results] Load Results',
);

export const loadResultsError = createAction(
  '[Results] Load Results Error',
  props<{ error: Error }>()
);

export const loadResultsSuccess = createAction(
  '[Results] Load Results Success',
  props<{ sports: Sports }>()
);
