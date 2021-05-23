import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@progress/kendo-angular-dialog';
import { DrawerItem } from '@progress/kendo-angular-layout';
import { ROUTERURL } from './constants/url.constants';
import { AchievementService } from './services/achievement.service';
import { BreakpointService } from './services/breakpoint.service';
import { SessionService } from './services/session.service';
import { UserService } from './services/user.service';
import { AchievementComponent } from './shared/achievement/achievement.component';
import { isAuthenticated } from './utils/token.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'keep-it-clean-ui';
  isSmallDevice = false;
  isAuthenticated = false;

  navItems = [];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event)
    this.smallDeviceCheck(event.target.innerWidth);
  }

  constructor(private sessionService: SessionService, 
    private breakPointService: BreakpointService,
    private userService: UserService,
    private achievementService: AchievementService) {
    if(isAuthenticated()) {
      this.sessionService.isAuthenticated.next(true);
      this.userService.getUserDetails(this.userService.getCurrentUser().id).subscribe(
        (res: any) => {
          if(res.id) {
            this.userService.currentUser.next(res);
          }
        }
      );
      this.achievementService.createAchievements(this.userService.getCurrentUser().id).subscribe(res => console.log(res));
      this.navItems.push()
    } else {
      this.navItems.push()
    }
    this.smallDeviceCheck(window.innerWidth);

  }

  smallDeviceCheck(width) {
    if(width >= 768) {
      this.breakPointService.isTabScreen.next(true);
      this.breakPointService.isMobileScreen.next(false);
    } else {
      this.breakPointService.isMobileScreen.next(true);
      this.breakPointService.isTabScreen.next(false);
    }
    
  }

  ngOnInit() {
    this.breakPointService.isMobileScreen.subscribe(res => this.isSmallDevice = res)
    this.sessionService.isAuthenticated.asObservable().subscribe((res) => {
      this.isAuthenticated = res;
      console.log(res)
      this.navItems = [];
      this.navItems = [
      {
        "text": 'Recycling Centers',
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
      {
        "text": 'US Local Laws',
        "path": '/laws'
      }
      ]
      if(res) {
        this.navItems.push({
          "text": 'My Events',
          "path": ROUTERURL.MY_EVENTS
        },
        {
          "text": 'My Achievements',
          "path": ROUTERURL.MY_ACHIEVEMENTS
        },{
          "text": 'Logout',
          "path": ROUTERURL.LOGOUT
        })
      } else {
        this.navItems.push({
          "text": 'Login',
          "path": ROUTERURL.LOGIN
        })
      }
    })
  }
}
