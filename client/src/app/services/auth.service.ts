import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../constants/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from 'src/shared/local-storage.util';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // creating a event that can be listened in components to get auth status
  auth = false;
  role = '';
  token = '';
  email = '';

  constructor(private http: HttpClient, private toast: ToastrService) {
    this.auth = getLocalStorageItem('auth');
    this.role = getLocalStorageItem('role');
    this.token = getLocalStorageItem('token');
    this.email = getLocalStorageItem('email');
  }

  // making post request with user data
  loginUser(userData: User): Observable<any> {
    const body = { ...userData };
    return this.http.post<any>(`${environment.apiUrl}/login`, body);
  }
  updateLoginCredential(email: string, token: string, role: string): void {
    this.email = email;
    this.token = token;
    this.role = role;
    this.auth = true;
    setLocalStorageItem('token', token);
    setLocalStorageItem('auth', true);
    setLocalStorageItem('email', email);
    setLocalStorageItem('role', role);
  }

  // checking if user is logged in
  isUser(): boolean {
    if (this.auth && this.role == 'User' && this.token) {
      return true;
    }
    return false;
  }

  // checking for admin login
  isAdmin(): boolean {
    if (this.auth && this.role == 'Admin' && this.token) {
      return true;
    }
    return false;
  }

  // performing logout and removin data from ls
  logOut(): void {
    this.auth = false;
    this.role = '';
    this.email = '';
    this.token = '';
    localStorage.removeItem('auth');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    this.toast.success('<p>Logout Successfull</p>', '', {
      enableHtml: true,
    });
  }
}
