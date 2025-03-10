import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ICategory } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { GoalService } from '../../services/goal.service';
import { IGoal } from '../../models/Goal';
import { IUser } from '../../models/User';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateOnly } from '../../types/DateOnly';
import { forkJoin } from 'rxjs';
import { StepService } from '../../services/step.service';

interface StepForm {
  userId: FormControl<string>;
  completeOn: FormControl<DateOnly>;
  hours: FormControl<number>;
  minutes: FormControl<number>;
  categoryId: FormControl<number>;
  goalId: FormControl<number>;
  description: FormControl<string>;
}

@Component({
  selector: 'sg-step-page-page',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './step-page.component.html',
  styleUrl: './step-page.component.scss',
})
export class StepPageComponent {
  hourOptions: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  minuteOptions: number[] = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  formGroup!: FormGroup<StepForm>;
  users!: IUser[];
  currentUser!: IUser;
  categories!: ICategory[];
  goals!: IGoal[];
  formReady: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private goalService: GoalService,
    private userService: UserService,
    private stepService: StepService,
    private fromBuilder: FormBuilder,
  ) { }

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
        this.formGroup = this.fromBuilder.nonNullable.group({
          userId: this.currentUser.userId,
          completeOn: new Date().toISOString().split('T')[0] as DateOnly,
          hours: 0,
          minutes: 0,
          categoryId: this.categories[0].id,
          goalId: this.goals[0].id,
          description: '',
        });
        this.formReady = true;
      }
    })
  }

  createStep() {
    const formValue = this.formGroup.getRawValue();
    this.stepService.createStep(
      {
        userId: formValue.userId,
        completedOn: formValue.completeOn as DateOnly,
        duration: formValue.hours * 60 + formValue.minutes,
        categoryId: formValue.categoryId,
        goalId: formValue.goalId,
        description: formValue.description,
      }
    ).subscribe({
      next: result => {
        this.stepService.pushUpdates();
      }
    })
  }
}
