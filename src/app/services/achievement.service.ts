import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL, BASE_URL } from '../constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  constructor(private http: HttpClient) { }

  getUserAchievements(userId: number) {
    return this.http.get(BASE_URL+APIURL.GET_USER_ACHIEVEMENTS(userId));
  }

  getAllAchievements() {
    return this.http.get(`${BASE_URL}${APIURL.GET_ACHIEVEMENTS}`);
  }

  achievementShown(id: number) {
    console.log('fjkdsj')
    return this.http.patch(`${BASE_URL}${APIURL.ACHIEVEMENT_SHOWN(id)}`, {});
  }

  createAchievements(userId: number) {
    return this.http.post(`${BASE_URL}${APIURL.ADD_USER_ACHIEVEMENTS(userId)}`,{})
  }
}
