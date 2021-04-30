import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getCurrentUser() {
    return JSON.parse(atob(localStorage.getItem('USER')));
  }
}
