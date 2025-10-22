import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AreaService } from '../../services/area.service';
import { IArea } from '../../static/models/area';
import { CategoryService } from '../../services/category.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFolderOpen, faPalette, faPencil, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { CategoryForm, CategoryFormService } from '../../services/category-form.service';
import { IOptionSet, SelectComponent } from '../../shared/select/select.component';
import { NEW_OPTION } from '../../static/consts/default-options';

@Component({
  selector: 'sg-category-page',
  imports: [RouterOutlet, ReactiveFormsModule, FaIconComponent, SelectComponent],
  providers: [CategoryFormService],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss'
})
export class CategoryPageComponent {
  private areaService = inject(AreaService);
  private categoryService = inject(CategoryService);
  private categoryFormService = inject(CategoryFormService);

  categoryForm!: FormGroup<CategoryForm>;

  areaOptions: IOptionSet = [];
  descriptionIcon = faPencil;
  colorIcon = faPalette;
  areaIcon = faGlobe;
  categoryIcon = faFolderOpen;

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
        this.areaOptions.push(NEW_OPTION);

        this.categoryForm = this.categoryFormService.getForm();
      }
    });
  }

  createCategory() {
    this.categoryService.createCategory(this.categoryFormService.getValue()).subscribe({
      next: () => {
        this.categoryService.pushUpdates();
        this.categoryFormService.resetForm();
      }
    })
  }
}
