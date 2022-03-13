import { NgModule } from '@angular/core';
import { environment } from '@envirnments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { RESULTS_STORE_KEY } from '@app/core/constants/store-keys';

// store
import { effects } from './effects';
import { reducers } from './reducers';

// services
import { ResultsService } from '@app/core/services/results.service';
import { ResultsServiceMock } from '@app/core/mock/results.service.mock';

export const resultStateConfig = {
  stateKey: RESULTS_STORE_KEY, // state-slice name for results state
};


@NgModule({
  declarations: [],
  imports: [    
    StoreModule.forRoot({}),
    StoreModule.forFeature(resultStateConfig.stateKey, reducers), // selector to query entire Feature module state inside reducers/index.ts barrel file
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [] // register devtool but disable for production to avoid expensive compute
  ],
  providers: [
    { provide: ResultsService, useClass: environment.useMockService ? ResultsServiceMock : ResultsService}
  ]
})
export class ResultsStoreModule { }
