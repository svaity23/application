import { createSelector } from "@ngrx/store";

import * as fromFeature from '../reducers'
import * as fromAppResults from '../reducers/results.reducer';


// retrive slices of the store from the top-level Feature module state
export const getAppResultsState = createSelector(
  fromFeature.getAppResultsState,
  (state: fromFeature.ResultsState) => state.appResults
);

export const getResults = createSelector(
  getAppResultsState,
  fromAppResults.selectResults 
);

export const isLoaded = createSelector(
  getAppResultsState,
  fromAppResults.selectLoaded
);