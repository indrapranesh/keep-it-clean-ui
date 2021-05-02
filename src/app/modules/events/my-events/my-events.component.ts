import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {

  type = {
    joined: 'joined',
    hosted: 'hosted'
  }

  currentTab = this.type.joined;

  events = [];

  constructor(private eventService: EventService, 
  private userService: UserService) { 
  }

  navigate(type) {
    if(this.currentTab == type) {
      return;
    }
    if(type == 'joined') {
      this.currentTab = type;
      this.getJoinedEvents();
    } else {
      this.currentTab = type;
      this.getHostedEvents();
    }
  }

  getJoinedEvents() {
    this.eventService.getJoinedEvents(this.userService.getCurrentUser().id).subscribe(
      (res: any) => {
        this.events = res
      }
    )
  }

  getHostedEvents() {
    this.eventService.getHostedEvents(this.userService.getCurrentUser().id).subscribe(
      (res: any) => {
        this.events = res;
      }
    )
  }

  ngOnInit(): void {
    this.getJoinedEvents();
  }

}
