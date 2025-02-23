import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGoal } from '../models/Goal';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private goalsSignal = signal<IGoal[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  loadGoals(): void {
    this.http.get<IGoal[]>('goal').subscribe({
      next: (data: IGoal[]) => this.goalsSignal.set(data),
    });
  }

  getGoals(): Signal<IGoal[]> {
    return this.goalsSignal.asReadonly();
  }
}
