import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistoryTransactionDetailComponent } from './view-history-transaction-detail.component';

describe('ViewHistoryTransactionDetailComponent', () => {
  let component: ViewHistoryTransactionDetailComponent;
  let fixture: ComponentFixture<ViewHistoryTransactionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHistoryTransactionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHistoryTransactionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
