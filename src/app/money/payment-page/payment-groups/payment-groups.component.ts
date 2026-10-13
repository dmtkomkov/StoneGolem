import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, startWith, switchMap } from 'rxjs';
import { PaymentService } from '../../../services/payment.service';
import { PaymentFormService } from '../../../services/payment-form.service';
import { IPagedPaymentDayGroup, IPayment } from '../../../static/models/payment';
import { ICurrencyTotal } from '../../../static/models/currency';
import { PAYMENT_DAYS_PAGE_SIZE } from '../../../static/types/constants';
import { ILabelData, LabelComponent } from '../../../shared/label/label.component';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { DateOnlyFormatPipe } from '../../../pipes/dateonly-format.pipe';
import { DateUtils } from '../../../utils/date-utils';
import { CurrencyUtils } from '../../../utils/currency-utils';

@Component({
  selector: 'sg-payment-groups',
  imports: [RouterLink, AsyncPipe, LabelComponent, PaginationComponent, DateOnlyFormatPipe],
  templateUrl: './payment-groups.component.html',
  styleUrl: './payment-groups.component.scss',
})
export class PaymentGroupsComponent {
  private paymentService = inject(PaymentService);
  private paymentFormService = inject(PaymentFormService);

  paymentGroups$!: Observable<IPagedPaymentDayGroup>;
  pageNumber: number = 1;

  ngOnInit(): void {
    this.paymentFormService.setDate(DateUtils.today(), false);

    this.paymentGroups$ = this.paymentService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.paymentService.getPaymentGroups(this.pageNumber, PAYMENT_DAYS_PAGE_SIZE)),
    );
  }

  changePage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.paymentService.pushUpdates();
  }

  getTotalLabel(total: ICurrencyTotal): ILabelData {
    return CurrencyUtils.getTotalLabel(total);
  }

  getPaymentLabel(payment: IPayment): ILabelData {
    return {
      data: [
        {
          text: payment.category.name,
          color: '#000000',
          background: '#eeeeee',
        },
        {
          text: `${payment.amount} ${payment.currency}`,
          color: '#000000',
          background: CurrencyUtils.getBackground(payment),
        },
      ]
    };
  }
}