import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, startWith, switchMap } from 'rxjs';
import { IGoalGroup } from '../../../models/goal';
import { GoalService } from '../../../services/goal.service';
import { ColorUtils } from '../../../utils/color-utils';

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
  ) {
  }

  ngOnInit(): void {
    this.goalGroups$ = this.goalService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.goalService.getGoalGroupsAsync()),
    );
  }

  getColor(group: IGoalGroup): string {
    return group.project?.color || ColorUtils.defaultColor;
  }

  getTransparentColor(group: IGoalGroup): string {
    return ColorUtils.hexToRgba(group.project?.color || ColorUtils.defaultColor, ColorUtils.defaultOpacity);
  }
}
