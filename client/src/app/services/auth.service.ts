import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../constants/models';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'https://reqres.in/api/login';
  auth: boolean = false;
  isLoggedIn: boolean = false;
  userRole: string = '';
  constructor(private http: HttpClient) {}

  loginUser(userData: User): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }
  logOut() {
    this.isLoggedIn = false;
  }
}
