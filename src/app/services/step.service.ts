import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICreateStep, IPagedStepGroup, IStep } from '../models/step';
import { DateOnly } from '../types/DateOnly';
import { Observable, Subject } from 'rxjs';
import { EStepParam } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  private updates$: Subject<void> = new Subject();

  constructor(
    private http: HttpClient,
  ) {
  }

  getStepsAsync(date: DateOnly, showSteps: EStepParam): Observable<IStep[]> {
    const params = new HttpParams({fromObject: {date: date as string, showSteps}});
    return this.http.get<IStep[]>('step', {params});
  }

  getStepGroups(showSteps: EStepParam, pageNumber: number, pageSize: number): Observable<IPagedStepGroup> {
    const params = new HttpParams({fromObject: {showSteps, pageNumber, pageSize}});
    return this.http.get<IPagedStepGroup>('step/group', {params});
  }

  createStep(step: ICreateStep): Observable<IStep> {
    return this.http.post<IStep>('step', step);
  }

  toggleStep(id: number): Observable<IStep> {
    return this.http.put<IStep>('step/toggle/' + id, null);
  }

  getUpdates(): Subject<void> {
    return this.updates$;
  }

  pushUpdates(): void {
    this.updates$.next();
  }
}
