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

  getEvents(state: string) {
    this.http.get(`${BASE_URL}${APIURL.GET_EVENTS(state,new Date().toISOString())}`).subscribe((res: any)=> {
      this.events.next(res.rows);
    });
  }

  searchEvents(state:string, key: string) {
    let params = new HttpParams().set('key', key);
    this.http.get(`${BASE_URL}${APIURL.SEARCH_EVENTS(state)}`, {params: params}).subscribe((res: any)=> {
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
