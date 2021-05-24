import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleEmissionComponent } from './vehicle-emission.component';

describe('VehicleEmissionComponent', () => {
  let component: VehicleEmissionComponent;
  let fixture: ComponentFixture<VehicleEmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleEmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleEmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
