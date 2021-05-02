import { Component, OnInit } from '@angular/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { EventService } from 'src/app/services/event.service';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events = [];

  constructor(private dialogService: DialogService,
    private eventService: EventService) { }

  host() {
    const createEvent = this.dialogService.open({
      title: 'Host an Event',
      content: CreateEventComponent,
      width: '50%'
    })
  }

  init() {
    this.eventService.getEventTypes();
    this.eventService.getEvents();
    this.eventService.getEventsObservable().subscribe((res) => {
      this.events = res;
    })
  }

  ngOnInit(): void {
    this.init();
  }

}
