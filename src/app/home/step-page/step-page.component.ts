import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { GoalService } from '../../services/goal.service';
import { UserService } from '../../services/user.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { StepService } from '../../services/step.service';
import { StepForm, StepFormService } from '../../services/step-form.service';
import { SelectComponent, IOptionSet } from '../../shared/select/select.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPencil, faBullseye, faUser, faCalendarDays, faFolderOpen, faClock } from '@fortawesome/free-solid-svg-icons';
import { NONE_OPTION } from '../../static/consts/default-options';

@Component({
  selector: 'sg-step-page',
  imports: [RouterOutlet, ReactiveFormsModule, SelectComponent, FaIconComponent],
  providers: [StepFormService],
  templateUrl: './step-page.component.html',
  styleUrl: './step-page.component.scss',
})
export class StepPageComponent {
  private categoryService = inject(CategoryService);
  private goalService = inject(GoalService);
  private userService = inject(UserService);
  private stepService = inject(StepService);
  private stepFormService = inject(StepFormService);

  stepForm!: FormGroup<StepForm>;


  userOptions: IOptionSet = [];
  hourOptions: IOptionSet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(h => ({id: h, name: `${h}h`}));
  minuteOptions: IOptionSet = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(m => ({id: m, name: `${m}m`}));
  categoryOptions: IOptionSet = [];
  goalOptions: IOptionSet = [];
  descriptionIcon = faPencil;
  goalIcon = faBullseye;
  userIcon = faUser;
  calendarIcon = faCalendarDays;
  timeIcon = faClock;
  categoryIcon = faFolderOpen;

  ngOnInit(): void {
    this.loadForm();
  }

  private loadForm(): void {
    forkJoin([
      this.userService.getUsersAsync(),
      this.userService.getCurrentUserAsync(),
      this.categoryService.getCategoryGroupsAsync(),
      this.goalService.getGoalGroupsAsync(),
    ]).subscribe({
      next: result => {
        const [users, currentUser, categoryGroups, goalGroups] = result;

        this.userOptions = users.map(user => ({ id: user.userId, name: user.userName }))

        this.categoryOptions = categoryGroups.map(group => ({
          name: group.area.name,
          color: group.area.color,
          options: group.categories.map(category => ({
            id: category.id,
            name: category.name,
          })),
        }));
        this.categoryOptions.unshift(NONE_OPTION);

        this.goalOptions = goalGroups.map(group => ({
          name: group.project?.name || 'No project',
          color: group.project?.color || '#fff',
          options: group.goals.map(goal => ({
            id: goal.id,
            name: goal.name,
          })),
        }));
        this.goalOptions.unshift(NONE_OPTION);

        this.stepFormService.initForm(currentUser.userId);
        this.stepForm = this.stepFormService.getForm();
      }
    })
  }

  createStep() {
    this.stepService.createStep(this.stepFormService.getValue()).subscribe({
      next: () => {
        this.stepService.pushUpdates();
        this.stepFormService.resetForm();
      }
    })
  }
}
