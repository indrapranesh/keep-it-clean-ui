import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEmissionComponent } from './home-emission.component';

describe('HomeEmissionComponent', () => {
  let component: HomeEmissionComponent;
  let fixture: ComponentFixture<HomeEmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
