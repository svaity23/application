import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SportTypeKey } from '@app/core/enums/sport-type.enum';
import { F1 } from '@app/core/models/f1.model';
import { Nba } from '@app/core/models/nba.model';
import { Sports } from '@app/core/models/sports.model';
import { Tennis } from '@app/core/models/tennis.model';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnChanges, OnInit {
  f1Results: F1[] = [];
  nbaResults: Nba[] = [];
  options: string[] = [];
  @Input() results: Sports | undefined;
  sportTypeKeyEnum = SportTypeKey;
  selectedSport = this.sportTypeKeyEnum.all;
  tennisResults: Tennis[] = [];

  constructor() {
    this.options = Object.values(this.sportTypeKeyEnum);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['results']?.currentValue != null) {
      this.tennisResults = (changes['results'].currentValue?.tennis != null) ? this.sortResults([...(changes['results'].currentValue.tennis)]) : '';
      this.nbaResults = (changes['results'].currentValue?.nba != null) ? this.sortResults([...(changes['results'].currentValue.nba)]) : '';
      this.f1Results = (changes['results'].currentValue?.f1 != null) ? this.sortResults([...(changes['results'].currentValue.f1)]) : '';
    }
  }

  ngOnInit(): void {
  }

  // set selected sport. this.selectedSport is used on html
  selectSport(e: any) {
    this.selectedSport = e.target.value;
  }

  // arranging results in reverse chronological order (by date)
  private sortResults(res: any): any {
    return res.sort((d1: any, d2: any) => new Date(d2.publicationDate).getTime() - new Date(d1.publicationDate).getTime());
  }

}
