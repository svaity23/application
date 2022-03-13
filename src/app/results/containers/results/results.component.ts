import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


import { Sports } from '@app/core/models/sports.model';
import { ResultsStoreFacade } from '@app/store/results-store/results-store.facade';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {  
  results$: Observable<Sports> | undefined;  
  title = 'Sports Results';

  constructor(private appStoreFacade: ResultsStoreFacade) { }

  ngOnInit(): void {
    this.results$ = this.appStoreFacade.results$;    
    this.appStoreFacade.loadResults();
  }
}
