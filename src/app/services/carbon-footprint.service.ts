import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL, BASE_URL } from '../constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintService {

  constructor(private http: HttpClient) { }

  getEmissionCategories() {
    return this.http.get(`${BASE_URL}${APIURL.GET_CARBON_CATEGORIES}`);
  }

}
