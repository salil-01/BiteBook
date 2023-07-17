import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { adminOrder } from '../constants/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminorderService {
  constructor(private authService: AuthService, private http: HttpClient) {}
  fetchData() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService?.token}`
    );
    return this.http.get<any>(`${environment.apiUrl}/orders`, { headers });
  }
  updateOrder(order: adminOrder) {
    const status = order.status;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService?.token}`
    );
    return this.http.patch<any>(
      `${environment.apiUrl}/orders/${order?.id}`,
      { status },
      { headers }
    );
  }
}
