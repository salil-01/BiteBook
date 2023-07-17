import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  fetchData() {
    return this.http.get<any>(`${environment.apiUrl}/menu-with-reviews`);
  }
  postOrder(dishId: number, quantity: number) {
    // Set the request body
    const requestBody = {
      id: dishId,
      quantity: quantity,
    };

    // Set the authorization header
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService?.token}`
    );
    return this.http.post<any>(
      `${environment.apiUrl}/place-order`,
      requestBody,
      { headers }
    );
  }
}
