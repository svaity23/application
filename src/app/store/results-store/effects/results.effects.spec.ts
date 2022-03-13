import { TestBed } from "@angular/core/testing";
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from "rxjs";

import { ResultsEffects } from ".";
import * as AppActions from '../actions'

import { Sports } from "@app/core/models/sports.model";
import { ResultsService } from "@app/core/services/results.service";
import { ResultsServiceMock } from "@app/core/mock/results.service.mock";

const initialState = {
  results: null,
  loaded: false,
  loading: false
};

const mockData: Sports = {
  "f1": [
    {
      "publicationDate": "May 9, 2020 8:09:03 PM",
      "seconds": 5.856,
      "tournament": "Silverstone Grand Prix",
      "winner": "Lewis Hamilton"
    },
    {
      "publicationDate": "Apr 14, 2020 8:09:03 PM",
      "seconds": 7.729,
      "tournament": "VTB RUSSIAN GRAND PRIX",
      "winner": "Valtteri Bottas"
    },
    {
      "publicationDate": "Mar 15, 2020 8:09:03 PM",
      "seconds": 5.856,
      "tournament": "Spa BELGIAN GRAND PRIX",
      "winner": "Lewis Hamilton"
    }
  ],
  "nba": [
    {
      "gameNumber": 6,
      "looser": "Heat",
      "mvp": "Lebron James",
      "publicationDate": "May 9, 2020 9:15:15 AM",
      "tournament": "NBA playoffs",
      "winner": "Lakers"
    },
    {
      "gameNumber": 5,
      "looser": "Lakers",
      "mvp": "Jimmy Butler",
      "publicationDate": "May 7, 2020 3:15:00 PM",
      "tournament": "NBA playoffs",
      "winner": "Heat"
    },
    {
      "gameNumber": 4,
      "looser": "Heat",
      "mvp": "Anthony Davis",
      "publicationDate": "May 5, 2020 1:34:15 PM",
      "tournament": "NBA playoffs",
      "winner": "Lakers"
    },
    {
      "gameNumber": 3,
      "looser": "Lakers",
      "mvp": "Jimmy Butler",
      "publicationDate": "May 3, 2020 9:15:33 PM",
      "tournament": "NBA playoffs",
      "winner": "Heat"
    },
    {
      "gameNumber": 2,
      "looser": "Heat",
      "mvp": "Anthony Davis",
      "publicationDate": "May 2, 2020 6:07:03 AM",
      "tournament": "NBA playoffs",
      "winner": "Lakers"
    }
  ],
  "tennis": [
    {
      "looser": "Schwartzman ",
      "numberOfSets": 3,
      "publicationDate": "May 9, 2020 11:15:15 PM",
      "tournament": "Roland Garros",
      "winner": "Rafael Nadal"
    },
    {
      "looser": "Stefanos Tsitsipas ",
      "numberOfSets": 3,
      "publicationDate": "May 9, 2020 2:00:40 PM",
      "tournament": "Roland Garros",
      "winner": "Novak Djokovic"
    },
    {
      "looser": "Petra Kvitova",
      "numberOfSets": 3,
      "publicationDate": "May 8, 2020 4:33:17 PM",
      "tournament": "Roland Garros",
      "winner": "Sofia Kenin"
    }
  ]
};

describe('ResultsEffects', () => {
  // Define actions block scope variable within the describe callback function that is an Observable. 
  // This observable stream will represent the actions dispatched by the store.
  let actions$: Observable<any>;
  let effects: ResultsEffects;  
  let httpService: ResultsService;
  let sportsServiceMock: ResultsServiceMock;

  beforeEach(() => {
    sportsServiceMock = new ResultsServiceMock();
    TestBed.configureTestingModule({
      providers: [
        ResultsEffects,
        provideMockActions(() => actions$), // Use the provideMockActions function and specify a factory function that returns the actions
        provideMockStore({ initialState }),
        { provide: ResultsService, useClass: ResultsServiceMock }, // Provide the AppEffects service dependency.
      ],
    });

    effects = TestBed.inject(ResultsEffects);    
    httpService = TestBed.inject(ResultsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  // Testing API interaction
  describe('onLoadResults$', () => {
    it('should fire if results is null', (done) => {
      const spy = spyOn(httpService, 'getAll').and.callThrough();
      actions$ = of(AppActions.loadResults);
      effects.onLoadResults$.subscribe((res) => {
        expect(res).toEqual(AppActions.loadResultsSuccess({ sports: mockData }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
