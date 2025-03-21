import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/category';
import {Observable, tap} from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'sg-category',
  templateUrl: './category.component.html',
  imports: [
    AsyncPipe
  ],
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categories$!: Observable<ICategory[]>;

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategoriesAsync();
    this.categoryService.getCategoryGroupsAsync().subscribe({
      next: data => {console.log(data)},
    })
  }
}
