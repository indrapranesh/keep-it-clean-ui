import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateCarbonComponent } from './calculate-carbon.component';

describe('CalculateCarbonComponent', () => {
  let component: CalculateCarbonComponent;
  let fixture: ComponentFixture<CalculateCarbonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateCarbonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateCarbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
