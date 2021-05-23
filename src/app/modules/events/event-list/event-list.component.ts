import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangeEvent } from '@progress/kendo-angular-dropdowns/dist/es2015/common/models/page-change-event';
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

  public pageSize = 10;
  public skip = 0;
  public total;
  public width = 300;


  constructor(private eventService: EventService,
    private router: Router) { 
      this.eventService.eventsCount.subscribe((res)=> this.total = res)
    }


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

  public onPageChange(e: PageChangeEvent): void {
    this.skip = e.skip;
    this.pageSize = e.take;
    this.eventService.getEvents(this.eventService.state, (this.skip/10))
  }

  ngOnInit(): void {
  }

}
