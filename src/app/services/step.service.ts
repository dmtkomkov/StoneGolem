import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStepDto } from '../models/Step';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  private stepsSignal = signal<IStepDto[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  loadSteps(): void {
    this.http.get<IStepDto[]>('step').subscribe({
      next: (data: IStepDto[]) => this.stepsSignal.set(data),
    });
  }

  getSteps(): Signal<IStepDto[]> {
    return this.stepsSignal.asReadonly();
  }
}
