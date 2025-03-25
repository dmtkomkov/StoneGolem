import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IGoal, IGoalGroup } from '../models/goal';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private updates$: Subject<void> = new Subject();

  constructor(
    private http: HttpClient
  ) {}

  getGoalsAsync(project?: string): Observable<IGoal[]> {
    let params = new HttpParams();
    if (project) {
      params = params.set('project', project);
    }
    return this.http.get<IGoal[]>('goal', { params });
  }

  getGoalGroupsAsync(): Observable<IGoalGroup[]> {
    return this.http.get<IGoalGroup[]>('goal/group');
  }

  getUpdates(): Subject<void> {
    return this.updates$;
  }

  pushUpdates(): void {
    this.updates$.next();
  }
}
