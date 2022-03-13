import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './containers/results/results.component';
import { ResultsListComponent } from './components/results-list/results-list.component';
import { ResultsRoutingModule } from './results-routing.module';

@NgModule({
  declarations: [ResultsComponent, ResultsListComponent],
  imports: [
    CommonModule,
    ResultsRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ResultsModule { }
