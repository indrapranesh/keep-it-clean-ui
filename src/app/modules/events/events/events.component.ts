import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { sort } from 'src/app/constants/events.constants';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {

  events = [];
  searchKey = '';
  sort = sort;
  selectedSort = sort[0];

  constructor(private dialogService: DialogService,
    private eventService: EventService,
    private userService: UserService) { }

  host() {
    const createEvent = this.dialogService.open({
      title: 'Host an Event',
      content: CreateEventComponent,
      width: '50%'
    })
  }

  search() {
    this.eventService.searchEvents(this.eventService.state, this.searchKey);
  }

  init() {
    this.eventService.getEventTypes();
    this.userService.currentUser.asObservable().subscribe(
    (res) => {
      if(res?.id) {
        this.eventService.state = res.address.state;
        this.eventService.getEvents(res.address.state);
      }
    })
    this.eventService.getEventsObservable().subscribe((res) => {
      this.events = res;
    })
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy() {

  }

}
