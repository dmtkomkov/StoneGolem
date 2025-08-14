import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateOnly } from '../types/DateOnly';

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
    });
  }

  initForm(userId: string, categoryId: number) {
    this.stepForm.patchValue({
      userId: userId,
      hours: 0,
      minutes: 5,
      categoryId: categoryId,
      goalId: 0,
      description: '',
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
}
