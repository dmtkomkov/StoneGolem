import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) {}

  getCategoriesAsync(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('category');
  }
}
