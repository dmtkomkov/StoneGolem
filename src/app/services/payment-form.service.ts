import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateOnly } from '../static/types/DateOnly';
import { Currency, DEFAULT_CURRENCY } from '../static/models/currency';
import { ICreatePayment } from '../static/models/payment';

const MAX_AMOUNT = 2147483647;

export function paymentFormValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup<PaymentForm>;

    const amount = group.controls.amount.value;
    const isAmountInvalid = amount === null || !Number.isInteger(amount) || amount < 1 || amount > MAX_AMOUNT;
    const isCategoryInvalid = group.controls.categoryId.value === 0;
    const isDateInvalid = !group.controls.spentOn.value;

    return (isAmountInvalid || isCategoryInvalid || isDateInvalid) ? { paymentFormInvalid: true } : null;
  };
}

export interface PaymentForm {
  amount: FormControl<number | null>;
  currency: FormControl<Currency>;
  categoryId: FormControl<number>;
  spentOn: FormControl<DateOnly>;
}

@Injectable()
export class PaymentFormService {
  private formBuilder = inject(FormBuilder);

  private readonly paymentForm: FormGroup<PaymentForm>;

  constructor() {
    this.paymentForm = this.formBuilder.nonNullable.group({
      amount: this.formBuilder.control<number | null>(null),
      currency: DEFAULT_CURRENCY as Currency,
      categoryId: 0,
      spentOn: '' as DateOnly,
    }, {
      validators: paymentFormValidator()
    });
  }

  getForm(): FormGroup<PaymentForm> {
    return this.paymentForm;
  }

  setDate(date: DateOnly, disable: boolean) {
    const dateControl = this.paymentForm.controls.spentOn;
    dateControl.setValue(date);
    if (disable) {
      dateControl.disable();
    } else {
      dateControl.enable();
    }
  }

  getValue(): ICreatePayment {
    const formValue = this.paymentForm.getRawValue();

    return {
      amount: formValue.amount as number,
      spentOn: formValue.spentOn,
      currency: formValue.currency,
      categoryId: formValue.categoryId,
    };
  }

  // Currency and date are kept for fast entry of several payments
  resetForm() {
    this.paymentForm.patchValue({
      amount: null,
      categoryId: 0,
    });
  }
}