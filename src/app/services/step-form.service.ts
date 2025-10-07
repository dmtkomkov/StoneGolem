import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateOnly } from '../types/DateOnly';

export function stepFormValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup<StepForm>;

    const hours = group.controls.hours.value;
    const minutes = group.controls.minutes.value;
    const categoryId = group.controls.categoryId.value;

    const isTimeZero = hours === 0 && minutes === 0;
    const isCategoryInvalid = categoryId === 0;

    return (isTimeZero || isCategoryInvalid) ? { stepFormInvalid: true } : null;
  };
}

export interface StepForm {
  userId: FormControl<string>;
  completeOn: FormControl<DateOnly>;
  hours: FormControl<number>;
  minutes: FormControl<number>;
  categoryId: FormControl<number>;
  goalId: FormControl<number>;
  description: FormControl<string>;
}

@Injectable()
export class StepFormService {
  private readonly stepForm: FormGroup<StepForm>;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.stepForm = this.formBuilder.nonNullable.group({
      userId: '',
      completeOn: '' as DateOnly,
      hours: 0,
      minutes: 0,
      categoryId: 0,
      goalId: 0,
      description: '',
    }, {
      validators: stepFormValidator()
    });
  }

  initForm(userId: string) {
    this.stepForm.patchValue({
      userId: userId,
    }, {
      emitEvent: false,
    });
  }

  getForm(): FormGroup<StepForm> {
    return this.stepForm;
  }

  setDate(date: DateOnly, disable: boolean) {
    const dateControl = this.stepForm.controls.completeOn;
    dateControl.setValue(date);
    if (disable) {
      dateControl.disable();
    } else {
      dateControl.enable();
    }
  }

  resetForm() {
    this.stepForm.patchValue({
      hours: 0,
      minutes: 0,
      categoryId: 0,
      goalId: 0,
      description: '',
    });
  }
}
