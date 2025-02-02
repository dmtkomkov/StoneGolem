import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategoryDto } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesSignal = signal<ICategoryDto[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  loadCategories(): void {
    this.http.get<ICategoryDto[]>('category').subscribe({
      next: (data: ICategoryDto[]) => this.categoriesSignal.set(data),
    });
  }

  getCategories(): Signal<ICategoryDto[]> {
    return this.categoriesSignal.asReadonly();
  }
}
