import { Sports } from "@app/core/models/sports.model";
import { Action, createReducer, on } from "@ngrx/store";

import * as resultActions from '../actions';

// define the state shape
export interface ResultsReducerState {
  results: Sports,
  loaded: boolean;
  loading: boolean;
}

// setting the initial state
export const initialState: ResultsReducerState = {
  results: {},
  loaded: false,
  loading: false
};

// create reducer function to handle actions for managing state useing createReducer function
const resultsReducer = createReducer<any>(
  initialState,
  on(
    resultActions.loadResultsSuccess,
    (state, { sports }) => {
      const res: Sports = {
        nba: sports.nba,
        f1: sports.f1,
        tennis: sports.tennis
      }
      return {
        ...state,
        results: res,
        loaded: true,
        loading: false
      }
    }
  )
)

export function reducer(state: ResultsReducerState | undefined, action: Action): ResultsReducerState {
  return resultsReducer(state, action);
}

export const selectResults = (state: ResultsReducerState) => state.results;
export const selectLoaded = (state: ResultsReducerState) => state.loaded;
export const selectLoading = (state: ResultsReducerState) => state.loading;
