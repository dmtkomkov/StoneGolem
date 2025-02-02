import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Step } from '../models/step';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  private stepsSignal = signal<Step[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  loadSteps(): void {
    this.http.get<Step[]>('step').subscribe({
      next: (data: Step[]) => this.stepsSignal.set(data),
    });
  }

  getSteps(): Signal<Step[]> {
    return this.stepsSignal.asReadonly();
  }
}
