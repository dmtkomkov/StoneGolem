import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGoalDto } from '../models/Goal';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private goalsSignal = signal<IGoalDto[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  loadGoals(): void {
    this.http.get<IGoalDto[]>('goal').subscribe({
      next: (data: IGoalDto[]) => this.goalsSignal.set(data),
    });
  }

  getGoals(): Signal<IGoalDto[]> {
    return this.goalsSignal.asReadonly();
  }
}
