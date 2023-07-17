import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../constants/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getLocalStorageItem } from 'src/shared/local-storage.util';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = false;
  role = '';
  token = '';
  email = '';
  constructor(private http: HttpClient) {
    this.auth = getLocalStorageItem('auth');
    this.role = getLocalStorageItem('role');
    this.token = getLocalStorageItem('token');
    this.email = getLocalStorageItem('email');
  }

  loginUser(userData: User): Observable<any> {
    const body = { ...userData };
    return this.http.post<any>(`${environment.apiUrl}/login`, body);
  }
  logOut() {
    this.auth = false;
    this.role = '';
    this.email = '';
    this.token = '';
    localStorage.removeItem('auth');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  }
}
