import { Component, inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { Observable, startWith, switchMap } from 'rxjs';
import { PaymentService } from '../../../services/payment.service';
import { PaymentFormService } from '../../../services/payment-form.service';
import { IPayment } from '../../../static/models/payment';
import { DateOnly } from '../../../static/types/DateOnly';
import { DateOnlyFormatPipe } from '../../../pipes/dateonly-format.pipe';

@Component({
  selector: 'sg-payment-list',
  imports: [AsyncPipe, CdkMenuModule, DateOnlyFormatPipe],
  templateUrl: './payment-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './payment-list.component.scss',
})
export class PaymentListComponent {
  @Input() date!: DateOnly;

  private paymentService = inject(PaymentService);
  private paymentFormService = inject(PaymentFormService);

  payments$!: Observable<IPayment[]>;

  ngOnInit(): void {
    this.paymentFormService.setDate(this.date, true);

    this.payments$ = this.paymentService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.paymentService.getPayments(this.date)),
    );
  }

  delete(id: number): void {
    this.paymentService.deletePayment(id).subscribe({
      next: () => {
        this.paymentService.pushUpdates();
      }
    });
  }
}