import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaymentCategoryService } from '../../services/payment-category.service';
import { PaymentService } from '../../services/payment.service';
import { PaymentForm, PaymentFormService } from '../../services/payment-form.service';
import { IOptionSet, SelectComponent } from '../../shared/select/select.component';
import { CURRENCIES } from '../../static/models/currency';

@Component({
  selector: 'sg-payment-page',
  imports: [RouterOutlet, ReactiveFormsModule, SelectComponent],
  providers: [PaymentFormService],
  templateUrl: './payment-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './payment-page.component.scss',
})
export class PaymentPageComponent {
  private paymentCategoryService = inject(PaymentCategoryService);
  private paymentService = inject(PaymentService);
  private paymentFormService = inject(PaymentFormService);

  paymentForm!: FormGroup<PaymentForm>;
  currencyItems: IOptionSet = CURRENCIES.map(currency => ({id: currency, name: currency}));
  categoryItems: IOptionSet = [];
  categoriesLoaded = false;
  saving = false;

  ngOnInit(): void {
    this.paymentForm = this.paymentFormService.getForm();

    this.paymentCategoryService.getPaymentCategories().subscribe({
      next: categories => {
        this.categoryItems = categories.map(category => ({
          id: category.id,
          name: category.name,
        }));
        this.categoriesLoaded = true;
      }
    });
  }

  createPayment() {
    if (this.paymentForm.invalid || this.saving) {
      return;
    }

    this.saving = true;
    this.paymentService.createPayment(this.paymentFormService.getValue()).subscribe({
      next: () => {
        this.saving = false;
        this.paymentService.pushUpdates();
        this.paymentFormService.resetForm();
      },
      error: () => {
        this.saving = false;
      }
    });
  }
}