import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICreateGoal, IGoal, IGoalFlat, IGoalGroup } from '../static/models/goal';
import { Observable, Subject } from 'rxjs';
import { IStep } from '../static/models/step';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private http = inject(HttpClient);

  private updates$: Subject<void> = new Subject();

  getGoalsAsync(project?: string): Observable<IGoal[]> {
    let params = new HttpParams();
    if (project) {
      params = params.set('project', project);
    }
    return this.http.get<IGoal[]>('goal', {params});
  }

  getGoalGroupsAsync(): Observable<IGoalGroup[]> {
    return this.http.get<IGoalGroup[]>('goal/group');
  }

  createGoal(goal: ICreateGoal): Observable<IGoalFlat> {
    return this.http.post<IGoalFlat>('goal', goal);
  }

  toggleGoal(id: number): Observable<IStep> {
    return this.http.put<IStep>('goal/toggle/' + id, null);
  }

  deleteGoal(id: number): Observable<void> {
    return this.http.delete<void>('goal/' + id);
  }

  getUpdates(): Subject<void> {
    return this.updates$;
  }

  pushUpdates(): void {
    this.updates$.next();
  }
}
