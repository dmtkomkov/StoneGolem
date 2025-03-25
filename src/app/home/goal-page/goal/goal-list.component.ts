import { Component } from '@angular/core';
import { IGoal } from '../../../models/goal';
import { GoalService } from '../../../services/goal.service';
import { Observable, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sg-goal',
  imports: [
    AsyncPipe
  ],
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.scss'
})
export class GoalListComponent {
  goals$!: Observable<IGoal[]>;
  projectName: string;

  constructor(
    private goalService: GoalService,
    private route: ActivatedRoute,
  ) {
    this.projectName = this.route.snapshot.paramMap.get('project') as string;
  }

  ngOnInit(): void {
    this.goals$ = this.goalService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.goalService.getGoalsAsync(this.projectName)),
    );
  }
}
