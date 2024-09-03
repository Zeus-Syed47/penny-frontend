import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'https://test-penny-backend-977383227665.us-central1.run.app/';
  constructor(public http: HttpClient) {}

  public signupFunction(data: any): Observable<any> {
    const params = new HttpParams()
      .set('first_name', data.first_name)
      .set('last_name', data.last_name)
      .set('phone_number', data.phone_number)
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(this.url + '/user/register', params);
  }

  public signinFunction(data: any): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
    return this.http.post(this.url + '/user/login', data);
  }
  public setUserInfoInLocalStorage = (data: any) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  };
  public getUserInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo') ?? '');
  };
  public logout(): Observable<any> {
    const params = new HttpParams().set('user_id', Cookie.get('user_id'));
    return this.http.post(`${this.url}/user/logout`, params);
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${this.url}/user`);
  }
}
