import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserorderService {
  constructor(private authService: AuthService, private http: HttpClient) {}
  // creating a observable to subscribe to changes that can be triggered from edit modal and add modal
  private dataSubject = new Subject<void>();
  data$ = this.dataSubject.asObservable();

  // emit event to update orders
  notifyDataChange(): void {
    this.dataSubject.next();
  }

  // fetch order
  fetchData() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService?.token}`
    );
    return this.http.get<any>(`${environment.apiUrl}/orders-user`, { headers });
  }
}
