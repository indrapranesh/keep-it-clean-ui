import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL, BASE_URL } from '../constants/url.constants';
import { ICreateEvent } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventTypes = [];

  constructor(private http: HttpClient) { }

  getEventTypes() {
    this.http.get(`${BASE_URL}${APIURL.GET_EVENT_TYPES}`).subscribe((res: any) => {
      this.eventTypes = res;
    });
  }

  createEvent(body: ICreateEvent) {
    return this.http.post(`${BASE_URL}${APIURL.CREATE_EVENT}`, body);
  }
}
