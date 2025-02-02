import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  private stepsSignal = signal<any[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  loadSteps(): void {
    this.http.get<any[]>('step').subscribe({
      next: (data: any[]) => this.stepsSignal.set(data),
    });
  }

  getSteps(): Signal<any[]> {
    return this.stepsSignal.asReadonly();
  }
}
