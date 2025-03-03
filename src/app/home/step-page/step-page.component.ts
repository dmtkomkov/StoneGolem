import { Component, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ICategory } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { GoalService } from '../../services/goal.service';
import { IGoal } from '../../models/Goal';
import { IUser } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'sg-step-page-page',
  imports: [RouterOutlet],
  templateUrl: './step-page.component.html',
  styleUrl: './step-page.component.scss',
})
export class StepPageComponent {
  hourOptions: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  minuteOptions: number[] = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  categories: Signal<ICategory[]>;
  goals: Signal<IGoal[]>;
  users: Signal<IUser[]>;

  constructor(
    private categoryService: CategoryService,
    private goalService: GoalService,
    private userService: UserService,
  ) {
    this.categories = this.categoryService.getCategories();
    this.goals = this.goalService.getGoals();
    this.users = this.userService.getUsers();
  }

  ngOnInit(): void {
    this.categoryService.loadCategories();
    this.goalService.loadGoals();
    this.userService.loadUsers();
  }
}
