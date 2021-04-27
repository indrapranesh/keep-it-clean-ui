import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APIURL, BASE_URL, ROUTERURL } from '../constants/url.constants';
import { ILoginReq, ISignUpReq, IVerifyReq } from '../interfaces/session.interface';
import { clearTokens } from '../utils/token.utils';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient, private router: Router) { }

  login(body: ILoginReq) {
    return this.http.post(`${BASE_URL}${APIURL.LOGIN}`, body);
  }

  signup(body: ISignUpReq) {
    return this.http.post(`${BASE_URL}${APIURL.SIGNUP}`, body);
  }

  logout() {
    clearTokens();
    this.router.navigate([ROUTERURL.LOGIN]);
  }

  verifyUser(body: IVerifyReq) {
    return this.http.post(`${BASE_URL}${APIURL.VERIFY_USER}`, body)
  }
}
