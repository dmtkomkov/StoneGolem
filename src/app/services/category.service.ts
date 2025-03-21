import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ICategory, ICategoryGroup} from '../models/category';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private updates$: Subject<void> = new Subject();

  constructor(
    private http: HttpClient,
  ) {}

  getCategoriesAsync(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('category');
  }

  getCategoryGroupsAsync(): Observable<ICategoryGroup[]> {
    return this.http.get<ICategoryGroup[]>('category/group');
  }

  getUpdates(): Subject<void> {
    return this.updates$;
  }

  pushUpdates(): void {
    this.updates$.next();
  }
}
