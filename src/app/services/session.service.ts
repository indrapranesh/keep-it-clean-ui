import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL, BASE_URL } from '../constants/url.constants';
import { ILoginReq, ISignUpReq, IVerifyReq } from '../interfaces/session.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  login(body: ILoginReq) {
    return this.http.post(`${BASE_URL}${APIURL.LOGIN}`, body);
  }

  signup(body: ISignUpReq) {
    return this.http.post(`${BASE_URL}${APIURL.SIGNUP}`, body);
  }

  verifyUser(body: IVerifyReq) {
    return this.http.post(`${BASE_URL}${APIURL.VERIFY_USER}`, body)
  }
}
