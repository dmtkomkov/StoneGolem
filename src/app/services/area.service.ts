import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IArea } from '../models/Area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private areasSignal = signal<IArea[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  loadAreas(): void {
    this.http.get<IArea[]>('area').subscribe({
      next: (data: IArea[]) => this.areasSignal.set(data),
    });
  }

  getAreas(): Signal<IArea[]> {
    return this.areasSignal.asReadonly();
  }
}
