import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as momenttz from 'moment-timezone';
import { ROUTERURL } from 'src/app/constants/url.constants';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input() events: Array<any>;
  timezone = momenttz.tz.guess();
  constructor(private eventService: EventService,
    private router: Router) { }


  openDetails(event: any) {
    this.router.navigate([ROUTERURL.EVENT_DETAILS, event.id])
  }

  getDate(startTime) {
    let date = momenttz(startTime);
    return date.tz(this.timezone).format('MM-DD-YYYY')
  }

  getTime(startTime, endTime) {
    return `${momenttz(startTime).tz(this.timezone).format('LT')} - ${momenttz(endTime).tz(this.timezone).format('LT z')}`
  }

  ngOnInit(): void {
  }

}
