import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-export-participants',
  templateUrl: './export-participants.component.html',
  styleUrls: ['./export-participants.component.scss']
})
export class ExportParticipantsComponent implements OnInit, OnChanges {

  @Input() participants: Array<any> = [];
  @Input() eventName: string;
  public fields: string[] = [];

  ngOnChanges() {
    this.eventName = `${this.eventName}`;
    console.log(this.participants)
    if(this.participants.length > 0) {
      this.fields = Object.keys(this.participants[0]);
      console.log(this.fields);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
