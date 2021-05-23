import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIURL, BASE_URL } from '../constants/url.constants';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser = new BehaviorSubject<any>(null);

  constructor(private sessionService: SessionService,
    private http: HttpClient) { 
  }

  getCurrentUser() {
    if(!localStorage.getItem('USER')) {
      this.sessionService.logout();
      return;
    }
    return JSON.parse(atob(localStorage.getItem('USER')));
  }

  getUserDetails(userId: number) {
    return this.http.get(`${BASE_URL}${APIURL.GET_USER(userId)}`);
  }

  refreshCurrentUser() {
    this.getUserDetails(this.getCurrentUser().id).subscribe(
      (res: any) => {
        if(res.id) {
          this.currentUser.next(res);
        }
      }
    );
  }
}
