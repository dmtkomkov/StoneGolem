import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStep, IStepGroup } from '../models/Step';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  private stepsSignal = signal<IStep[]>([]);
  private stepGroupsSignal = signal<IStepGroup[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  loadSteps(): void {
    this.http.get<IStep[]>('step').subscribe({
      next: (data: IStep[]) => this.stepsSignal.set(data),
    });
  }

  loadStepGroups(): void {
    this.http.get<IStepGroup[]>('step/group').subscribe({
      next: (data: IStepGroup[]) => this.stepGroupsSignal.set(data),
    });
  }

  getSteps(): Signal<IStep[]> {
    return this.stepsSignal.asReadonly();
  }

  getStepGroups(): Signal<IStepGroup[]> {
    return this.stepGroupsSignal.asReadonly();
  }
}
