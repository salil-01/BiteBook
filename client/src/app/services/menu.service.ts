import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}
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
      'Bearer YOUR_AUTH_TOKEN'
    );
    return this.http.post<any>(
      `${environment.apiUrl}/place-order`,
      requestBody,
      { headers }
    );
  }
}
