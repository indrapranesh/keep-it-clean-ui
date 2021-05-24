import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL, BASE_URL } from '../constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class LawService {

  constructor(private http: HttpClient) { }

  getLaws() {
      return this.http.get(`${BASE_URL}${APIURL.GET_LAWS}`)
  }
}
