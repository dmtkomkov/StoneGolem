import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { ICreateCategory } from '../models/category';

export function categoryFormValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return null;
    // const group = control as FormGroup<GoalForm>;
    //
    // const noName = !group.controls.name.value;
    // const noProjectName = !group.controls.project?.controls.name.value;
    // const isNewProject = group.controls.projectId.value === null;
    //
    // return (noName || (isNewProject && noProjectName)) ? { goalFormInvalid: true } : null;
  };
}

export interface CategoryForm {
  name: FormControl<string>;
  areaId: FormControl<number>;
  description: FormControl<string>;
  area?: FormGroup<AreaForm>;
}

export interface AreaForm {
  name: FormControl<string>;
  description: FormControl<string>;
  color: FormControl<string>;
}

@Injectable()
export class CategoryFormService {
  private readonly categoryForm: FormGroup<CategoryForm>;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.categoryForm = this.formBuilder.nonNullable.group({
      name: '',
      areaId: 0,
      description: '',
    }, {
      validators: categoryFormValidator()
    });

    this.categoryForm.controls.areaId.valueChanges.subscribe({
      next: (value) => {
        if (value === null) {
          this.addAreaForm();
        } else {
          this.removeAreaForm();
        }
      }
    });
  }

  getForm(): FormGroup<CategoryForm> {
    return this.categoryForm;
  }

  setArea(areaId: number, disable: boolean) {
    const areaControl = this.categoryForm.controls.areaId;
    areaControl.setValue(areaId);
    if (disable) {
      areaControl.disable();
    } else {
      areaControl.enable();
    }
  }

  getValue(): ICreateCategory {
    const formValue = this.categoryForm.getRawValue();

    return {
      name: formValue.name,
      areaId: formValue.areaId || undefined,
      description: formValue.description,
      area: formValue.area ? {
        name: formValue.area.name,
        description: formValue.area.description,
        color: formValue.area.color
      } : undefined
    }
  }

  resetForm() {
    this.categoryForm.patchValue({
      name: '',
      description: '',
    });
  }

  private addAreaForm(): void {
    this.categoryForm.addControl('area',
      this.formBuilder.nonNullable.group({
        name: '',
        description: '',
        color: '#ffffff'
      })
    );
  }

  private removeAreaForm(): void {
    this.categoryForm.removeControl('area');
  }
}
