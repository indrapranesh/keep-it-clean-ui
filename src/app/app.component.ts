import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTERURL } from './constants/url.constants';
import { SessionService } from './services/session.service';
import { isAuthenticated } from './utils/token.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'keep-it-clean-ui';

  constructor(private sessionService: SessionService, 
    private router: Router) {
    if(isAuthenticated) {
      this.sessionService.isAuthenticated.next(true);
    } else {
      this.router.navigate([ROUTERURL.LOGOUT]);
    }
  }
}
