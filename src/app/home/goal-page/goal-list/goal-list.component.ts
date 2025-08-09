import { Component, Input } from '@angular/core';
import { IGoal } from '../../../models/goal';
import { GoalService } from '../../../services/goal.service';
import { map, Observable, startWith, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IProject } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'sg-goal',
  imports: [
    AsyncPipe
  ],
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.scss'
})
export class GoalListComponent {
  private _projectName!: string;

  @Input() set project(value: string) {
    this._projectName = value;
  }

  goals$!: Observable<IGoal[]>;
  project$!: Observable<IProject>;
  private projectUpdates$: Subject<void> = new Subject();

  constructor(
    private goalService: GoalService,
    private projectService: ProjectService,
  ) {
  }

  ngOnInit(): void {
    this.goals$ = this.goalService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.goalService.getGoalsAsync(this.projectName)),
      map(goals =>
        goals.sort((a, b) => Number(a.status) - Number(b.status))
      )
    );
    this.project$ = this.projectUpdates$.pipe(
      startWith(undefined),
      switchMap(() => this.projectService.getProjectByName(this.projectName)),
    );
  }

  get projectName(): string {
    return this._projectName;
  }

  delete(id: number): void {
    this.goalService.deleteGoal(id).subscribe({
      next: () => {
        this.goalService.pushUpdates();
      }
    })
  }

  toggle(id: number) {
    this.goalService.toggleGoal(id).subscribe({
      next: () => {
        this.goalService.pushUpdates();
      }
    });
  }

  toggleProject(id: number) {
    this.projectService.toggleProject(id).subscribe({
      next: () => {
        this.projectUpdates$.next();
      }
    });
  }

  isClosed(goalOrProject: IGoal | IProject | null) {
    return goalOrProject ? goalOrProject.status === 1 : true;
  }
}
