import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  isMobileScreen = new BehaviorSubject<boolean>(false);
  isTabScreen = new BehaviorSubject<boolean>(false);

  constructor() { }
}
