import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativeSummaryComponent } from './cumulative-summary.component';

describe('CumulativeSummaryComponent', () => {
  let component: CumulativeSummaryComponent;
  let fixture: ComponentFixture<CumulativeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CumulativeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulativeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
