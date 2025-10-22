import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { ICreateGoal } from '../static/models/goal';

export function goalFormValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup<GoalForm>;

    const noName = !group.controls.name.value;
    const noProjectName = !group.controls.project?.controls.name.value;
    const isNewProject = group.controls.projectId.value === null;

    return (noName || (isNewProject && noProjectName)) ? { goalFormInvalid: true } : null;
  };
}

export interface GoalForm {
  name: FormControl<string>;
  projectId: FormControl<number>;
  description: FormControl<string>;
  project?: FormGroup<ProjectForm>;
}

export interface ProjectForm {
  name: FormControl<string>;
  description: FormControl<string>;
  color: FormControl<string>;
}

@Injectable()
export class GoalFormService {
  private formBuilder = inject(FormBuilder);

  private readonly goalForm: FormGroup<GoalForm>;

  constructor() {
    this.goalForm = this.formBuilder.nonNullable.group({
      name: '',
      projectId: 0,
      description: '',
    }, {
      validators: goalFormValidator()
    });

    this.goalForm.controls.projectId.valueChanges.subscribe({
      next: (value) => {
        if (value === null) {
          this.addProjectForm();
        } else {
          this.removeProjectForm();
        }
      }
    });
  }

  getForm(): FormGroup<GoalForm> {
    return this.goalForm;
  }

  setProject(projectId: number, disable: boolean) {
    const projectControl = this.goalForm.controls.projectId;
    projectControl.setValue(projectId);
    if (disable) {
      projectControl.disable();
    } else {
      projectControl.enable();
    }
  }

  getValue(): ICreateGoal {
    const formValue = this.goalForm.getRawValue();

    return {
      name: formValue.name,
      projectId: formValue.projectId ? formValue.projectId : undefined,
      description: formValue.description,
      project: formValue.project ? {
        name: formValue.project?.name,
        description: formValue.project?.description,
        color: formValue.project?.color
      } : undefined,
    }
  }

  resetForm() {
    this.goalForm.patchValue({
      name: '',
      description: '',
    });
  }

  private addProjectForm(): void {
    this.goalForm.addControl('project',
      this.formBuilder.nonNullable.group({
        name: '',
        description: '',
        color: '#ffffff'
      })
    );
  }

  private removeProjectForm(): void {
    this.goalForm.removeControl('project');
  }
}
