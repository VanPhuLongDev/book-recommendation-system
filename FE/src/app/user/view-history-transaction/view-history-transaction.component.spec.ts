import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistoryTransactionComponent } from './view-history-transaction.component';

describe('ViewHistoryTransactionComponent', () => {
  let component: ViewHistoryTransactionComponent;
  let fixture: ComponentFixture<ViewHistoryTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHistoryTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHistoryTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
