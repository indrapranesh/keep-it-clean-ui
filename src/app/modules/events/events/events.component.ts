import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@progress/kendo-angular-dialog';
import { ROUTERURL } from 'src/app/constants/url.constants';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  host() {
    const createEvent = this.dialogService.open({
      title: 'Host an Event',
      content: CreateEventComponent
    })
  }

  ngOnInit(): void {
  }

}
