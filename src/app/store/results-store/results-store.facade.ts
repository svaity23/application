import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";

import * as fromActions from './actions';
import * as fromReducers from './reducers';
import * as fromSelectors from './selectors';

@Injectable({ providedIn: 'root' })
export class ResultsStoreFacade {  
  results$= this.store.pipe(select(fromSelectors.getResults));  
  isLoaded$= this.store.pipe(select(fromSelectors.isLoaded));

  constructor(private store: Store<fromReducers.ResultsState>) { }

  loadResults() {    
    this.store.dispatch(fromActions.loadResults());
    this.results$ = this.store.pipe(select(fromSelectors.getResults));
  }
}