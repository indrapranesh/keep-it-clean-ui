import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportParticipantsComponent } from './export-participants.component';

describe('ExportParticipantsComponent', () => {
  let component: ExportParticipantsComponent;
  let fixture: ComponentFixture<ExportParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
