import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ICategoryGroup } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { GoalService } from '../../services/goal.service';
import { IGoal } from '../../models/goal';
import { IUser } from '../../models/user';
import { UserService } from '../../services/user.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateOnly } from '../../types/DateOnly';
import { forkJoin } from 'rxjs';
import { StepService } from '../../services/step.service';
import { StepForm, StepFormService } from '../../services/step-form.service';
import { SelectComponent, IOptionGroup } from '../../shared/select/select.component';

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
  users!: IUser[];
  currentUser!: IUser;
  categoryGroups!: ICategoryGroup[];
  goals!: IGoal[];
  stepFormService = inject(StepFormService);
  categoryOptions: IOptionGroup[] = [];

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
      this.goalService.getGoalsAsync(),
    ]).subscribe({
      next: result => {
        [this.users, this.currentUser, this.categoryGroups, this.goals] = result;
        this.stepFormService.initForm(this.currentUser.userId);
        this.stepForm = this.stepFormService.getForm();
        this.categoryOptions = this.categoryGroups.map(group => ({
          name: group.area.name,
          color: group.area.color,
          options: group.categories.map(category => ({
            id: category.id,
            name: category.name,
          })),
        }));
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
