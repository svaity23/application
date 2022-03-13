

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { RESULTS_STORE_KEY } from 'src/app/core/constants/store-keys';
import * as fromAppResults from './results.reducer';

export const FEATURE_STORE_KEY = RESULTS_STORE_KEY;

// this is barrel file to group all states and reducers that are defined 
// seperately in the Feature state

// prepare feature module state - appState
export interface ResultsState {
  appResults: fromAppResults.ResultsReducerState;
}

// register the reducers for the HeroesFeatureState
export const reducers: ActionReducerMap<ResultsState> = {
  appResults: fromAppResults.reducer
};

// store slice selection
// retrive the top-level Feature module state
export const getAppResultsState = createFeatureSelector<ResultsState>(FEATURE_STORE_KEY);
