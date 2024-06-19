import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderBookComponent } from './slider-book.component';

describe('SliderBookComponent', () => {
  let component: SliderBookComponent;
  let fixture: ComponentFixture<SliderBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
