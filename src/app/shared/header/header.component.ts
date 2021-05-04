import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTERURL } from 'src/app/constants/url.constants';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { isAuthenticated } from 'src/app/utils/token.utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;
  avatarName = '';
  navItems = [
    {
      "text": 'Laws',
      "path": '/laws'
    },
    {
      "text": 'Recycling',
      "path": '/recycling'
    },
    {
      "text": 'Events',
      "path": '/events'
    },
    {
      "text": 'Carbon Footprint',
      "path": '/carbondating'
    },
  ];

  profileNav: Array<any> = [{
    text: 'My Events',
    route: ROUTERURL.MY_EVENTS
    }, {
        text: 'Logout',
        route: ROUTERURL.LOGOUT
  }];

  constructor(public router: Router, 
    private userService: UserService,
    private sessionService: SessionService) { 
  }

  profileNavigate(event) {
    this.router.navigate([event.route])
  }

  navLanding() {
    this.router.navigate([ROUTERURL.LANDING]);
  }

  ngOnInit(): void {
    this.sessionService.isAuthenticated.asObservable().subscribe(
      (res) => {
        this.isAuthenticated = res;
        if(this.isAuthenticated) {
          this.avatarName = `${(this.userService.getCurrentUser()).firstName.charAt(0)}${(this.userService.getCurrentUser()).lastName.charAt(0)}`
        }
      }
    )
  }

}
