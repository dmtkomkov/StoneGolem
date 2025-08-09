import { Component } from '@angular/core';
import { Observable, startWith, switchMap } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { ICategoryFlat, ICategoryGroup } from '../../../models/category';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ColorUtils } from '../../../utils/color-utils';
import { ILabelData, LabelComponent } from '../../../shared/label/label.component';

@Component({
  selector: 'sg-category-groups',
  imports: [RouterLink, AsyncPipe, LabelComponent],
  templateUrl: './category-groups.component.html',
  styleUrl: './category-groups.component.scss'
})
export class CategoryGroupsComponent {
  categoryGroups$!: Observable<ICategoryGroup[]>;

  constructor(
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.categoryGroups$ = this.categoryService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.categoryService.getCategoryGroupsAsync()),
    );
  }

  getColor(group: ICategoryGroup): string {
    return group.area.color;
  }

  getTransparentColor(group: ICategoryGroup): string {
    return ColorUtils.hexToRgba(group.area.color, ColorUtils.defaultOpacity);
  }

  getLabelData(category: ICategoryFlat): ILabelData {
    const labelItems = [];
    labelItems.push({
      text: category.name,
      color: '#000000',
      background: '#eeeeee',
    });

    return {data: labelItems};
  }
}
