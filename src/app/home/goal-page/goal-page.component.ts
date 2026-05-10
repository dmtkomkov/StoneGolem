import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProject, IProjectFlat } from '../../static/models/project';
import { ProjectService } from '../../services/project.service';
import { GoalService } from '../../services/goal.service';
import { Subscription } from 'rxjs';
import { MenuSelectComponent, MenuSelectOption } from '../../shared/menu-select/menu-select.component';
import { GoalFormService } from '../../services/goal-form.service';

interface GoalForm {
  name: FormControl<string>;
  projectId: FormControl<number>;
  description: FormControl<string>;
  project?: FormGroup<ProjectForm>;
}

interface ProjectForm {
  name: FormControl<string>;
  description: FormControl<string>;
  color: FormControl<string>;
}

@Component({
  selector: 'sg-goal-page',
  imports: [RouterOutlet, ReactiveFormsModule, MenuSelectComponent],
  providers: [GoalFormService],
  templateUrl: './goal-page.component.html',
  styleUrl: './goal-page.component.scss'
})
export class GoalPageComponent {
  goalForm!: FormGroup<GoalForm>;
  projects!: IProjectFlat[];
  projectOptions: MenuSelectOption[] = [];
  formReady: boolean = false;
  isProjectForm: boolean = false;
  private formSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private goalService: GoalService,
  ) {
  }

  ngOnInit(): void {
    this.loadForm();
    this.initProjects();
  }

  private loadForm(): void {
    this.goalForm = this.formBuilder.nonNullable.group({
      name: '',
      projectId: 0,
      description: '',
    });

    this.goalForm.controls.projectId.valueChanges.subscribe({
      next: (value) => {
        if (value === null) {
          this.addProjectForm();
          this.isProjectForm = true;
        } else if (this.isProjectForm) {
          this.removeProjectForm();
          this.isProjectForm = false;
        }
      }
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

  private initProjects(): void {
    this.formSubscription = this.projectService.getProjects().subscribe({
      next: (result: IProject[]) => {
        this.projects = result;
        this.projectOptions = [
          {label: '-- None --', value: 0},
          ...this.projects.map(project => ({label: project.name, value: project.id})),
          {label: '-- New --', value: null},
        ];
        this.formReady = true;
      }
    })
  }

  createGoal() {
    const formValue = this.goalForm.getRawValue();
    this.goalService.createGoal(
      {
        name: formValue.name,
        projectId: formValue.projectId ? formValue.projectId : undefined,
        description: formValue.description,
        project: formValue.project ? {
          name: formValue.project?.name,
          description: formValue.project?.description,
          color: formValue.project?.color
        } : undefined,
      }
    ).subscribe({
      next: () => {
        this.goalService.pushUpdates();
      }
    })
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }
}
