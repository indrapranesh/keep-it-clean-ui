import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL, BASE_URL } from '../constants/url.constants';
import { UserEmissionReq, UserEmissionRes } from '../interfaces/carbon.interface';
import * as momenttz from 'moment-timezone';
import { monthNames } from '../constants/date.constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintService {

  userEmissions = [];
  chartData = new BehaviorSubject<Array<any>>([]);

  constructor(private http: HttpClient) { }

  getEmissionCategories() {
    return this.http.get(`${BASE_URL}${APIURL.GET_CARBON_CATEGORIES}`);
  }

  addUserCarbonEmission(userId: number, body: UserEmissionReq) {
    return this.http.post(`${BASE_URL}${APIURL.CREATE_USER_EMISSION(userId)}`, body);
  }

  convertDate(emissions: Array<UserEmissionRes>) {
    let timezone = momenttz.tz.guess();
    emissions.map((emission) => {
      emission.date = momenttz(emission.date).tz(timezone).toString();
      emission.disabled = false;
    });
    this.userEmissions = emissions;
    this.generateChartData();
  }

  generateChartData() {
    let chartData = [];
    this.userEmissions.map((emission) => {
      let year = new Date(emission.date).getFullYear();
      let month = new Date(emission.date).getMonth();
      if(chartData.length == 0) {
        chartData.push({
          year: year,
          data: [{
             month: monthNames[month],
             value: emission.carbonEmission
          }]
        })
      } else {
        chartData.map((data) => {
          if(data.year == year) {
            data.data.push({
              month: monthNames[month],
              value: emission.carbonEmission
            })
          } else {
            data.push({
              year: year,
              data: [{
                month: monthNames[month],
                 value: emission.carbonEmission
              }]
            })
          }
        })
      }
    });
    this.chartData.next(chartData);
  }

  getAllUserEmission(userId: number) {
    this.http.get(`${BASE_URL}${APIURL.GET_USER_EMISSION(userId)}`)
    .subscribe(
      (res: Array<UserEmissionRes>) => {
        this.convertDate(res);
      }
    )
  }
}
