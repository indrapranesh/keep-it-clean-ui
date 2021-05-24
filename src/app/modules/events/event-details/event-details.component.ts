import { AgmMap } from '@agm/core';
import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as momenttz from 'moment-timezone';
import { ROUTERURL } from 'src/app/constants/url.constants';
import { IJoinEvent } from 'src/app/interfaces/event.interface';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  eventId: number;
  event: any;
  timezone = momenttz.tz.guess();
  currentUser;
  joined = false;
  participants = [];
  isLoading=false;
  isJoining = false;

  latitude: number;
  longitude: number;
  twitterShare = `https://twitter.com/intent/tweet?text=Come%20join%20the%20event%20at%20EcoVille ${window.location.href}`;
  facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=Come%20join%20the%20event%20at%20EcoVille ${window.location.href}&display=page`;

  @ViewChild(AgmMap) public agmMap: AgmMap

  constructor(private eventService: EventService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router) { 
    this.eventId = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.currentUser = this.userService.getCurrentUser();
  }

  getDate(startTime) {
    let date = momenttz(startTime);
    return date.tz(this.timezone).format('MM-DD-YYYY')
  }

  getTime(startTime, endTime) {
    return `${momenttz(startTime).tz(this.timezone).format('LT')} - ${momenttz(endTime).tz(this.timezone).format('LT z')}`
  }

  init() {
    this.isLoading = true;
    this.eventService.getEventById(this.eventId).subscribe((res) => {
      this.event = res;
      this.latitude = parseFloat(this.event.latitude);
      this.longitude = parseFloat(this.event.longitude);
      this.event.participants.map((participant) => {
        if(participant.userId == this.currentUser.id) {
          this.joined = true;
        }
      });
      this.isLoading = false;
    });
    this.eventService.getParticipants(this.eventId).subscribe((res: Array<any>) => {
      let participants = [];
      res.map((participant) => {
        participants.push(participant.user);
      });
      this.participants = participants;
    })
  }

  back() {
    this.router.navigate([ROUTERURL.EVENTS])
  }

  join() {
    let body: IJoinEvent = {
      userId: this.currentUser.id,
      eventId: this.eventId
    }
    this.isJoining = true;
    this.eventService.joinEvent(body).subscribe((res) => {
      this.isJoining = false;
      this.init();
    })
  }

  ngOnInit(): void {
    this.init();
  }

}
