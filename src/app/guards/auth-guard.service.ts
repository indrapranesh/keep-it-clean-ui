import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ROUTERURL } from '../constants/url.constants';
import { isAuthenticated } from '../utils/token.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (isAuthenticated()) {
      return true;
    }
    this.router.navigate([ROUTERURL.LOGIN]);
    return false;
  }
}


@Injectable({
  providedIn: 'root'
})
export class UnAuthGuardService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (isAuthenticated()) {
        //navigate to landing page
      return false;
    } else {
      return true;
    }
  }

  constructor(private router: Router) { }
}
