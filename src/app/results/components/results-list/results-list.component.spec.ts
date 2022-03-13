import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ResultsServiceMock } from '@app/core/mock/results.service.mock';

import { ResultsListComponent } from './results-list.component';

import { SportTypeKey } from '@app/core/enums/sport-type.enum';
import { ResultsStoreModule } from '@app/store/results-store/results-store.module';



describe('ResultsListComponent', () => {
  let component: ResultsListComponent;
  let fixture: ComponentFixture<ResultsListComponent>;
  let mockData: any;
  let sportsServiceMock: ResultsServiceMock;
  let store: Store;

  beforeEach(async () => {
    mockData = jasmine.createSpyObj(['getAll']);
    sportsServiceMock = new ResultsServiceMock();
    sportsServiceMock.getAll().subscribe((data: any) => {
      mockData = data;
    });
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), ResultsStoreModule],
      declarations: [ResultsListComponent],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all sports results', () => {
    component.selectedSport = SportTypeKey.all;
    component.tennisResults = mockData.tennis;
    component.nbaResults = mockData.nba;
    component.f1Results = mockData.f1;
    fixture.detectChanges();

    const tennisHTMLElement = fixture.nativeElement.querySelector('.tennis-results');
    const nbaElement = fixture.nativeElement.querySelector('.nba-Results');
    const f1Element = fixture.nativeElement.querySelector('.f1-Results');

    expect(tennisHTMLElement).toBeTruthy();
    expect(nbaElement).toBeTruthy();
    expect(f1Element).toBeTruthy();
  });

  it('should show Tennis results', () => {
    component.selectedSport = SportTypeKey.tennis;
    component.tennisResults = mockData.tennis;
    component.nbaResults = mockData.nba;
    component.f1Results = mockData.f1;
    fixture.detectChanges();

    const tennisHTMLElement = fixture.nativeElement.querySelector('.tennis-results');
    const nbaElement = fixture.nativeElement.querySelector('.nba-Results');
    const f1Element = fixture.nativeElement.querySelector('.f1-Results');

    expect(tennisHTMLElement).toBeTruthy();
    expect(nbaElement).toBeFalsy();
    expect(f1Element).toBeFalsy();
  });

  it('should show NBA results', () => {
    component.selectedSport = SportTypeKey.nba;
    component.tennisResults = mockData.tennis;
    component.nbaResults = mockData.nba;
    component.f1Results = mockData.f1;
    fixture.detectChanges();

    const tennisHTMLElement = fixture.nativeElement.querySelector('.tennis-results');
    const nbaElement = fixture.nativeElement.querySelector('.nba-Results');
    const f1Element = fixture.nativeElement.querySelector('.f1-Results');

    expect(tennisHTMLElement).toBeFalsy();
    expect(nbaElement).toBeTruthy();
    expect(f1Element).toBeFalsy();
  });

  it('should show F1 results', () => {
    component.selectedSport = SportTypeKey.f1;
    component.tennisResults = mockData.tennis;
    component.nbaResults = mockData.nba;
    component.f1Results = mockData.f1;
    fixture.detectChanges();

    const tennisHTMLElement = fixture.nativeElement.querySelector('.tennis-results');
    const nbaElement = fixture.nativeElement.querySelector('.nba-Results');
    const f1Element = fixture.nativeElement.querySelector('.f1-Results');

    expect(tennisHTMLElement).toBeFalsy();
    expect(nbaElement).toBeFalsy();
    expect(f1Element).toBeTruthy();
  });

  /*
    // fixture.changeDetectorRef.markForCheck();
    const cdRef = fixture.componentRef.injector.get(ChangeDetectorRef);
    cdRef.detectChanges();
   */
});
