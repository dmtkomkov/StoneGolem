import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ICategory } from '../../../models/category';
import { Observable, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sg-category-list',
  templateUrl: './category-list.component.html',
  imports: [AsyncPipe],
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  categories$!: Observable<ICategory[]>;
  areaName: string;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
  ) {
    this.areaName = this.route.snapshot.paramMap.get('area') as string;
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.categoryService.getCategoriesAsync(this.areaName)),
    );
  }
}
