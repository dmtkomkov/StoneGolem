import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGoal } from '../models/Goal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(
    private http: HttpClient
  ) {}

  getGoalsAsync(): Observable<IGoal[]> {
    return this.http.get<IGoal[]>('goal');
  }
}
