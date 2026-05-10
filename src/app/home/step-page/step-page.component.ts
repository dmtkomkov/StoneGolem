import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ICategory } from '../../static/models/category';
import { CategoryService } from '../../services/category.service';
import { GoalService } from '../../services/goal.service';
import { IGoal } from '../../static/models/goal';
import { IUser } from '../../static/models/user';
import { UserService } from '../../services/user.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateOnly } from '../../static/types/DateOnly';
import { forkJoin } from 'rxjs';
import { StepService } from '../../services/step.service';
import { StepForm, StepFormService } from '../../services/step-form.service';
import { MenuSelectComponent, MenuSelectOption } from '../../shared/menu-select/menu-select.component';

@Component({
  selector: 'sg-step-page',
  imports: [RouterOutlet, ReactiveFormsModule, MenuSelectComponent],
  providers: [StepFormService],
  templateUrl: './step-page.component.html',
  styleUrl: './step-page.component.scss',
})
export class StepPageComponent {
  hourOptions: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  minuteOptions: number[] = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  stepForm!: FormGroup<StepForm>;
  users!: IUser[];
  currentUser!: IUser;
  categories!: ICategory[];
  goals!: IGoal[];
  userOptions: MenuSelectOption[] = [];
  hourMenuOptions: MenuSelectOption[] = this.hourOptions.map(hour => ({label: `${hour}h`, value: hour}));
  minuteMenuOptions: MenuSelectOption[] = this.minuteOptions.map(minute => ({label: `${minute}m`, value: minute}));
  categoryOptions: MenuSelectOption[] = [];
  goalOptions: MenuSelectOption[] = [];
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
      this.categoryService.getCategoriesAsync(),
      this.goalService.getGoalsAsync(),
    ]).subscribe({
      next: result => {
        [this.users, this.currentUser, this.categories, this.goals] = result;
        this.userOptions = this.users.map(user => ({label: user.userName, value: user.userId}));
        this.categoryOptions = [
          {label: '-- None --', value: 0},
          ...this.categories.map(category => ({label: category.name, value: category.id})),
        ];
        this.goalOptions = [
          {label: '-- None --', value: 0},
          ...this.goals.map(goal => ({label: goal.name, value: goal.id})),
        ];
        this.stepFormService.initForm(this.currentUser.userId);
        this.stepForm = this.stepFormService.getForm();
      }
    })
  }

  createStep() {
    const formValue = this.stepForm.getRawValue();
    this.stepService.createStep(
      {
        userId: formValue.userId,
        completedOn: formValue.completeOn as DateOnly,
        duration: formValue.hours * 60 + formValue.minutes,
        categoryId: formValue.categoryId,
        goalId: formValue.goalId !== 0 ? formValue.goalId : undefined,
        description: formValue.description,
      }
    ).subscribe({
      next: () => {
        this.stepService.pushUpdates();
        this.stepFormService.resetForm();
      }
    })
  }
}
