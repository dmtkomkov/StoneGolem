import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProject, IProjectFlat } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { GoalService } from '../../services/goal.service';

interface GoalForm {
  name: FormControl<string>;
  projectId: FormControl<number | undefined>;
  description: FormControl<string>;
}

@Component({
  selector: 'sg-goal-page',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './goal-page.component.html',
  styleUrl: './goal-page.component.scss'
})
export class GoalPageComponent {
  formGroup!: FormGroup<GoalForm>;
  projects!: IProjectFlat[];
  formReady: boolean = false;

  constructor(
    private fromBuilder: FormBuilder,
    private projectService: ProjectService,
    private goalService: GoalService,
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  private loadForm(): void {
    this.projectService.getProjectsAsync().subscribe({
      next: (result: IProject[]) => {
        this.projects = result;
        this.formGroup = this.fromBuilder.nonNullable.group({
          name: '',
          projectId: this.projects[0]?.id || undefined,
          description: '',
        });
        this.formReady = true;
      }
    })
  }

  createGoal() {
    const formValue = this.formGroup.getRawValue();
    this.goalService.createGoal(
      {
        name: formValue.name,
        projectId: formValue.projectId,
        color: '#eee',
        description: formValue.description,
      }
    ).subscribe({
      next: () => {
        this.goalService.pushUpdates();
      }
    })
  }
}
