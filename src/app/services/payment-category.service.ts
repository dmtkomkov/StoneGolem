import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPaymentCategory } from '../static/models/payment-category';

@Injectable({
  providedIn: 'root'
})
export class PaymentCategoryService {
  private http = inject(HttpClient);

  getPaymentCategories(): Observable<IPaymentCategory[]> {
    return this.http.get<IPaymentCategory[]>('payment-category');
  }
}