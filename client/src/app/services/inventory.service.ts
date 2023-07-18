import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { addDishItem, dishInventory } from '../constants/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  // creating a observable to subscribe to changes that can be triggered from edit modal and add modal
  private dataSubject = new Subject<void>();
  data$ = this.dataSubject.asObservable();

  // constructor
  constructor(private authService: AuthService, private http: HttpClient) {}

  // emit event to update dishes
  notifyDataChange(): void {
    this.dataSubject.next();
  }

  // fetch dish
  fetchData() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService?.token}`
    );
    return this.http.get<any>(`${environment.apiUrl}/dish`, { headers });
  }

  // add dish
  addData(item: addDishItem) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService?.token}`
    );
    return this.http.post<any>(`${environment.apiUrl}/dish`, item, { headers });
  }

  // update dish
  updateData(dish: dishInventory) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService?.token}`
    );
    return this.http.patch<any>(
      `${environment.apiUrl}/dish/${dish?.id}`,
      dish,
      { headers }
    );
  }

  // delete dish
  deleteData(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService?.token}`
    );
    return this.http.delete<any>(`${environment.apiUrl}/dish/${id}`, {
      headers,
    });
  }
}
