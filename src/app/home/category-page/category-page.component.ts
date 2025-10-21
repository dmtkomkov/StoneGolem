import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AreaService } from '../../services/area.service';
import { IArea } from '../../models/area';
import { CategoryService } from '../../services/category.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFolderOpen, faPalette, faPencil, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { CategoryForm, CategoryFormService } from '../../services/category-form.service';
import { IOptionSet, SelectComponent } from '../../shared/select/select.component';

@Component({
  selector: 'sg-category-page',
  imports: [RouterOutlet, ReactiveFormsModule, FaIconComponent, SelectComponent],
  providers: [CategoryFormService],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss'
})
export class CategoryPageComponent {
  categoryForm!: FormGroup<CategoryForm>;
  categoryFormService = inject(CategoryFormService);

  areaOptions: IOptionSet = [];
  descriptionIcon = faPencil;
  colorIcon = faPalette;
  areaIcon = faGlobe;
  categoryIcon = faFolderOpen;

  constructor(
    private areaService: AreaService,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.loadForm();
  }

  private loadForm(): void {
    this.areaService.getAreasAsync().subscribe({
      next: (areas: IArea[]) => {
        this.areaOptions = areas.map(area => ({
          id: area.id,
          name: area.name,
        }));
        this.areaOptions.push({ id: null, name: '-- New --' });

        this.categoryFormService.initForm(areas[0]?.id || 0);
        this.categoryForm = this.categoryFormService.getForm();
      }
    })
  }

  createCategory() {
    this.categoryService.createCategory(this.categoryFormService.getValue()).subscribe({
      next: () => {
        this.categoryService.pushUpdates();
      }
    })
  }
}
