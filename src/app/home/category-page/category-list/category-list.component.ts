import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ICategory } from '../../../static/models/category';
import { Observable, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from '../../../services/area.service';
import { CategoryFormService } from '../../../services/category-form.service';

@Component({
  selector: 'sg-category-list',
  templateUrl: './category-list.component.html',
  imports: [AsyncPipe],
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private categoryFormService = inject(CategoryFormService);
  private areaService = inject(AreaService);

  categories$!: Observable<ICategory[]>;
  areaName: string;

  constructor() {
    this.areaName = this.route.snapshot.paramMap.get('area') as string;
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.categoryService.getCategoriesAsync(this.areaName)),
    );

    this.areaService.getAreaByName(this.areaName).subscribe({
      next: (area) => {
        this.categoryFormService.setArea(area.id, true);
      }
    });
  }

  delete(id: number): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.categoryService.pushUpdates();
      }
    })
  }
}
