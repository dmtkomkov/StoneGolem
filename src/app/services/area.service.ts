import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAreaDto } from '../models/Area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private areasSignal = signal<IAreaDto[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  loadAreas(): void {
    this.http.get<IAreaDto[]>('area').subscribe({
      next: (data: IAreaDto[]) => this.areasSignal.set(data),
    });
  }

  getAreas(): Signal<IAreaDto[]> {
    return this.areasSignal.asReadonly();
  }
}
