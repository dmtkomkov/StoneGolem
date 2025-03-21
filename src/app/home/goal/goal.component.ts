import { Component } from '@angular/core';
import { IGoal } from '../../models/goal';
import { GoalService } from '../../services/goal.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'sg-goal',
  imports: [
    AsyncPipe
  ],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss'
})
export class GoalComponent {
  goals$!: Observable<IGoal[]>;

  constructor(
    private goalService: GoalService,
  ) {

  }

  ngOnInit(): void {
    this.goals$ = this.goalService.getGoalsAsync();
  }
}
