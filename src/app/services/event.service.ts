import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIURL, BASE_URL } from '../constants/url.constants';
import { ICreateEvent, IJoinEvent } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventTypes = [];
  events: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  eventsCount = new BehaviorSubject<number>(0)
  isEventsLoading = new BehaviorSubject<boolean>(false);
  state = '';

  constructor(private http: HttpClient) { }

  getEventsObservable() {
    return this.events.asObservable();
  }

  getEventTypes() {
    this.http.get(`${BASE_URL}${APIURL.GET_EVENT_TYPES}`).subscribe((res: any) => {
      this.eventTypes = res;
    });
  }

  getEvents(state: string, page: number = 0) {
    this.isEventsLoading.next(true);
    let params = new HttpParams().set('page', page.toString());
    this.http.get(`${BASE_URL}${APIURL.GET_EVENTS(state,new Date().toISOString())}`, {params: params}).subscribe((res: any)=> {
      this.events.next(res.rows);
      this.eventsCount.next(res.count);
      this.isEventsLoading.next(false);
    },
    (err) => {
      this.isEventsLoading.next(false);
    });
  }

  searchEvents(state:string, key: string) {
    let params = new HttpParams().set('key', key);
    this.http.get(`${BASE_URL}${APIURL.SEARCH_EVENTS(state, new Date().toISOString())}`, {params: params}).subscribe((res: any)=> {
      this.events.next(res.rows);
    });
  }

  getEventById(id: number) {
    return this.http.get(`${BASE_URL}${APIURL.GET_EVENT(id)}`);
  }

  createEvent(body: ICreateEvent) {
    return this.http.post(`${BASE_URL}${APIURL.CREATE_EVENT}`, body);
  }

  joinEvent(body: IJoinEvent) {
    return this.http.post(`${BASE_URL}${APIURL.JOIN_EVENT}`, body);
  }

  getJoinedEvents(userId: number) {
    return this.http.get(`${BASE_URL}${APIURL.GET_JOINED_EVENTS(userId)}`);
  }

  getHostedEvents(userId: number) {
    return this.http.get(`${BASE_URL}${APIURL.GET_HOSTED_EVENTS(userId)}`);
  }

  getParticipants(eventId: number) {
    return this.http.get(`${BASE_URL}${APIURL.GET_PARTICIPANTS(eventId)}`);
  }
}
