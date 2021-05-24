import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSkeletonComponent } from './events-skeleton.component';

describe('EventsSkeletonComponent', () => {
  let component: EventsSkeletonComponent;
  let fixture: ComponentFixture<EventsSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
