import { Component, Signal } from '@angular/core';
import { IGoalDto } from '../../models/Goal';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'sg-goal',
  imports: [],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss'
})
export class GoalComponent {
  goals: Signal<IGoalDto[]>;

  constructor(
    private goalService: GoalService,
  ) {
    this.goals = this.goalService.getGoals();
  }

  ngOnInit(): void {
    this.goalService.loadGoals();
  }
}
