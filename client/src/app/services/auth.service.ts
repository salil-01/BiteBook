import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../constants/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'https://reqres.in/api/login';
  auth: boolean = false;
  constructor(private http: HttpClient) {}

  loginUser(userData: User): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }
}
