import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";

import { ResultsService } from "@app/core/services/results.service";

import * as appActions from '../actions/results.actions';

@Injectable()
export class ResultsEffects {
  // listen to loadResults action, then call service and based on te response status 
  // if response is successful, dispatch loadResultsSuccess action with the result
  // if the request fails, dispatch loadResultsError action with error
  onLoadResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.loadResults),
      switchMap(() =>
        this.sportsService.getAll().pipe(
          map(data => appActions.loadResultsSuccess({ sports: data })),
          catchError(error => of(appActions.loadResultsError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions, // all actions dispatch to the store
    private sportsService: ResultsService // service for API related calls
  ) { }
}