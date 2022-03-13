import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Sports } from '../models/sports.model';
import { ResultsService } from './results.service';

const mockData: any = {
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

describe('ResultsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController
  let resultsService: ResultsService;

  // spy on methods
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['getResults']);

  beforeEach(() => {
    // spy on getresults methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    resultsService = new ResultsService(httpClientSpy);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      // import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // provide server under test
      providers: [ResultsService]
    });

    // inject the http, test controller and service-under test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    resultsService = TestBed.inject(ResultsService);
  });

  afterEach(() => {
    // after each test, assert that there are no more pending request
    httpTestingController.verify();
  });

  describe('#getResults', () => {
    let expectedResults: Sports;
    beforeEach(() => {
      resultsService = TestBed.inject(ResultsService);
      expectedResults = Object.assign(mockData);
    });
    it('should return expected data (called once)', () => {
      resultsService.getResults().subscribe({
        next: results => expect(results)
          .withContext('should return expected results')
          .toEqual(expectedResults),
        error: fail
      });

      // sportService should have made one request to GET sports from expected URL
      const req = httpTestingController.expectOne(resultsService.apiUrl);
      expect(req.request.method).toEqual('POST');

      // respond with mock results
      req.flush(expectedResults);
    })
  });
});