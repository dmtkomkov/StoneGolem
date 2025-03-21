import { Component } from '@angular/core';
import { Observable, startWith, switchMap } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { ICategoryGroup } from '../../../models/category';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'sg-category-groups',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './category-groups.component.html',
  styleUrl: './category-groups.component.scss'
})
export class CategoryGroupsComponent {
  categoryGroups$!: Observable<ICategoryGroup[]>;

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.categoryGroups$ = this.categoryService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.categoryService.getCategoryGroupsAsync()),
    );
  }
}
