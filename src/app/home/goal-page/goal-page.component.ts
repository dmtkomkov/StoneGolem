import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProject } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { GoalService } from '../../services/goal.service';
import { Subscription } from 'rxjs';
import { IOptionSet, SelectComponent } from '../../shared/select/select.component';
import { faPencil, faDiagramProject, faBullseye, faPalette } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

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
  imports: [RouterOutlet, ReactiveFormsModule, SelectComponent, FaIconComponent],
  templateUrl: './goal-page.component.html',
  styleUrl: './goal-page.component.scss'
})
export class GoalPageComponent {
  goalForm!: FormGroup<GoalForm>;
  projectOptions: IOptionSet = [];
  private formSubscription!: Subscription;
  descriptionIcon = faPencil;
  projectIcon = faDiagramProject;
  goalIcon = faBullseye;
  colorIcon = faPalette;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private goalService: GoalService,
  ) {
  }

  ngOnInit(): void {
    this.loadForm();
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

  private loadForm(): void {
    this.projectService.getProjects().subscribe({
      next: (projects: IProject[]) => {
        this.projectOptions = projects.map(project => ({
          id: project.id,
          name: project.name,
        }));
        this.projectOptions.unshift({ id: 0, name: '-- None --' });
        this.projectOptions.push({ id: null, name: '-- New --' });

        this.goalForm = this.formBuilder.nonNullable.group({
          name: '',
          projectId: 0,
          description: '',
        });

        this.formSubscription = this.goalForm.controls.projectId.valueChanges.subscribe({
          next: (value) => {
            if (value === null) {
              this.addProjectForm();
            } else {
              this.removeProjectForm();
            }
          }
        });
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
