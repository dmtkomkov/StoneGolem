import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DateOnly } from '../static/types/DateOnly';
import {
  ICreatePayment,
  IPagedPaymentDayGroup,
  IPagedPaymentMonthReport,
  IPayment
} from '../static/models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);

  private updates$: Subject<void> = new Subject();

  getPayments(date: DateOnly): Observable<IPayment[]> {
    const params = new HttpParams({fromObject: {date: date as string}});
    return this.http.get<IPayment[]>('payment', {params});
  }

  getPaymentGroups(pageNumber: number, pageSize: number): Observable<IPagedPaymentDayGroup> {
    const params = new HttpParams({fromObject: {pageNumber, pageSize}});
    return this.http.get<IPagedPaymentDayGroup>('payment/group', {params});
  }

  getMonthlyReport(pageNumber: number, pageSize: number): Observable<IPagedPaymentMonthReport> {
    const params = new HttpParams({fromObject: {pageNumber, pageSize}});
    return this.http.get<IPagedPaymentMonthReport>('payment/report', {params});
  }

  createPayment(payment: ICreatePayment): Observable<IPayment> {
    return this.http.post<IPayment>('payment', payment);
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>('payment/' + id);
  }

  getUpdates(): Subject<void> {
    return this.updates$;
  }

  pushUpdates(): void {
    this.updates$.next();
  }
}