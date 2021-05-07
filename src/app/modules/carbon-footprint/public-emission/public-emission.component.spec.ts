import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicEmissionComponent } from './public-emission.component';

describe('PublicEmissionComponent', () => {
  let component: PublicEmissionComponent;
  let fixture: ComponentFixture<PublicEmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicEmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicEmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
