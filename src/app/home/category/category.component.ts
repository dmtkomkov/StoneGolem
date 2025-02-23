import { Component, Signal } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/Category';

@Component({
  selector: 'sg-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categories: Signal<ICategory[]>;

  constructor(
    private categoryService: CategoryService,
  ) {
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit(): void {
    this.categoryService.loadCategories();
  }
}
