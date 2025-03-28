import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICreateStep, IStep, IStepGroup } from '../models/step';
import { DateOnly } from '../types/DateOnly';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  private updates$: Subject<void> = new Subject();

  constructor(
    private http: HttpClient,
  ) { }

  getStepsAsync(date: DateOnly): Observable<IStep[]> {
    const params = new HttpParams().set('date', date as string);
    return this.http.get<IStep[]>('step', { params });
  }

  getStepGroupsAsync(): Observable<IStepGroup[]> {
    return this.http.get<IStepGroup[]>('step/group');
  }

  createStep(step: ICreateStep): Observable<IStep> {
    return this.http.post<IStep>('step', step);
  }

  getUpdates(): Subject<void> {
    return this.updates$;
  }

  pushUpdates(): void {
    this.updates$.next();
  }
}
