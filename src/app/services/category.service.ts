import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesSignal = signal<ICategory[]>([]);

  constructor(
    private http: HttpClient,
  ) {}

  loadCategories(): void {
    this.http.get<ICategory[]>('category').subscribe({
      next: (data: ICategory[]) => this.categoriesSignal.set(data),
    });
  }

  getCategories(): Signal<ICategory[]> {
    return this.categoriesSignal.asReadonly();
  }
}
