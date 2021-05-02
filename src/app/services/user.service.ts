import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private sessionService: SessionService) { 
  }

  getCurrentUser() {
    if(!localStorage.getItem('USER')) {
      this.sessionService.logout();
      return;
    }
    return JSON.parse(atob(localStorage.getItem('USER')));
  }
}
