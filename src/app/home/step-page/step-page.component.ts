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
import { NONE_OPTION } from '../../static/consts/default-options';

@Component({
  selector: 'sg-step-page',
  imports: [RouterOutlet, ReactiveFormsModule, SelectComponent],
  providers: [StepFormService],
  templateUrl: './step-page.component.html',
  styleUrl: './step-page.component.scss',
})
export class StepPageComponent {
  hourOptions: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  minuteOptions: number[] = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  stepForm!: FormGroup<StepForm>;
  userItems: IOptionSet = [];
  hourItems: IOptionSet = this.hourOptions.map(h => ({id: h, name: `${h}h`}));
  minuteItems: IOptionSet = this.minuteOptions.map(m => ({id: m, name: `${m}m`}));
  categoryItems: IOptionSet = [];
  goalItems: IOptionSet = [];
  stepFormService = inject(StepFormService);

  constructor(
    private categoryService: CategoryService,
    private goalService: GoalService,
    private userService: UserService,
    private stepService: StepService,
  ) {
  }

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

        this.userItems = users.map(user => ({id: user.userId, name: user.userName}));

        this.categoryItems = categoryGroups.map(group => ({
          name: group.area.name,
          color: group.area.color,
          options: group.categories.map(category => ({
            id: category.id,
            name: category.name,
          })),
        }));
        this.categoryItems.unshift(NONE_OPTION);

        this.goalItems = goalGroups.map(group => ({
          name: group.project?.name || 'No project',
          color: group.project?.color || '#fff',
          options: group.goals.map(goal => ({
            id: goal.id,
            name: goal.name,
          })),
        }));
        this.goalItems.unshift(NONE_OPTION);

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
