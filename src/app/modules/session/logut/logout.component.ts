import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTERURL } from 'src/app/constants/url.constants';
import { SessionService } from 'src/app/services/session.service';
import { clearTokens } from 'src/app/utils/token.utils';

@Component({
  selector: 'app-logut',
  template: ``
})
export class LogoutComponent{

  constructor(private router: Router,private sessionService: SessionService) {
      clearTokens();
      this.sessionService.isAuthenticated.next(false);
      this.router.navigate([ROUTERURL.LOGIN]);
  }

}
