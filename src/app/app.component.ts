import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@progress/kendo-angular-dialog';
import { ROUTERURL } from './constants/url.constants';
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

  constructor(private sessionService: SessionService, 
    private router: Router, 
    private userService: UserService,) {
    if(isAuthenticated()) {
      this.sessionService.isAuthenticated.next(true);
      this.userService.getUserDetails(this.userService.getCurrentUser().id).subscribe(
        (res: any) => {
          if(res.id) {
            this.userService.currentUser.next(res);
          }
        }
      )
    }
  }

  ngOnInit() {
  }
}
