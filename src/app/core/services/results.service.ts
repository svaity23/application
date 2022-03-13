import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// models
import { Sports } from '../models/sports.model';
import { Tennis } from '../models/tennis.model';
import { F1 } from '../models/f1.model';
import { Nba } from '../models/nba.model';

export interface ResultsServiceInterface {
  getAll(): Observable<Sports>;
}

@Injectable({
  providedIn: 'root'
})
export class ResultsService implements ResultsServiceInterface {
  readonly apiUrl = 'https://ancient-wood-1161.getsandbox.com:443/results';

  constructor(private http: HttpClient) { }

  // get sports results from server
  public getAll(): Observable<Sports> {
    const headers = new Headers().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl, { headers }).
      pipe(map((data: any) => {
        return this.mapResults(data);
      }), catchError(error => {
        return of(error);
      })
    );    
  }

  // get sports results from server testing purpose only
  public getResults(): Observable<Sports> {
    const headers = new Headers().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl, { headers }).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return of(error);
        })
      )
  }

  private mapResults(data: any): Sports {
    if (data == null) {
      return {};
    }
    const tennis: Tennis[] = data.Tennis;
    const nba: Nba[] = data.nbaResults;
    const f1: F1[] = data.f1Results;
    const results: Sports = {
      tennis,
      nba,
      f1
    };
    return results;
  }
}
