import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { reviewMsg } from '../constants/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private authService: AuthService, private http: HttpClient) {}
  // add review
  postReview(dishId: number, reviewData: reviewMsg) {
    const data = { ...reviewData, dish_id: dishId };
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService?.token}`
    );
    return this.http.post<any>(`${environment.apiUrl}/reviews`, data, {
      headers,
    });
  }

  // update order so that reviews are updated for user on user order page
  updateOrder(orderId: number, rating: number) {
    const data = { rating };
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService?.token}`
    );
    return this.http.patch<any>(
      `${environment.apiUrl}/orders-user/${orderId}`,
      data,
      { headers }
    );
  }
}
