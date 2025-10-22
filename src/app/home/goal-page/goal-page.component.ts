import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProject } from '../../static/models/project';
import { ProjectService } from '../../services/project.service';
import { GoalService } from '../../services/goal.service';
import { IOptionSet, SelectComponent } from '../../shared/select/select.component';
import { faPencil, faDiagramProject, faBullseye, faPalette } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { GoalForm, GoalFormService } from '../../services/goal-form.service';
import { NEW_OPTION, NONE_OPTION } from '../../static/consts/default-options';

@Component({
  selector: 'sg-goal-page',
  imports: [RouterOutlet, ReactiveFormsModule, SelectComponent, FaIconComponent],
  providers: [GoalFormService],
  templateUrl: './goal-page.component.html',
  styleUrl: './goal-page.component.scss'
})
export class GoalPageComponent {
  private projectService = inject(ProjectService);
  private goalService = inject(GoalService);
  private goalFormService = inject(GoalFormService);

  goalForm!: FormGroup<GoalForm>;
  projectOptions: IOptionSet = [];
  descriptionIcon = faPencil;
  projectIcon = faDiagramProject;
  goalIcon = faBullseye;
  colorIcon = faPalette;

  ngOnInit(): void {
    this.loadForm();
  }

  private loadForm(): void {
    this.projectService.getProjects().subscribe({
      next: (projects: IProject[]) => {
        this.projectOptions = projects.map(project => ({
          id: project.id,
          name: project.name,
        }));
        this.projectOptions.unshift(NONE_OPTION);
        this.projectOptions.push(NEW_OPTION);

        this.goalForm = this.goalFormService.getForm();
      }
    })
  }

  createGoal() {
    this.goalService.createGoal(this.goalFormService.getValue()).subscribe({
      next: () => {
        this.goalService.pushUpdates();
        this.goalFormService.resetForm();
      }
    })
  }
}
