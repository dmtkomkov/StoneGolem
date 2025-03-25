import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, startWith, switchMap } from 'rxjs';
import { IGoalGroup } from '../../../models/goal';
import { GoalService } from '../../../services/goal.service';

@Component({
  selector: 'sg-goal-groups',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './goal-groups.component.html',
  styleUrl: './goal-groups.component.scss'
})
export class GoalGroupsComponent {
  goalGroups$!: Observable<IGoalGroup[]>;

  constructor(
    private goalService: GoalService,
  ) { }

  ngOnInit(): void {
    this.goalGroups$ = this.goalService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.goalService.getGoalGroupsAsync()),
    );
  }
}
