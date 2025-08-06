import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AreaService } from '../../services/area.service';
import { IArea } from '../../models/area';
import { CategoryService } from '../../services/category.service';

interface CategoryForm {
  name: FormControl<string>;
  areaId: FormControl<number>;
  description: FormControl<string>;
}

@Component({
  selector: 'sg-category-page',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss'
})
export class CategoryPageComponent {
  formGroup!: FormGroup<CategoryForm>;
  areas!: IArea[];
  formReady: boolean = false;

  constructor(
    private fromBuilder: FormBuilder,
    private areaService: AreaService,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.loadForm();
  }

  private loadForm(): void {
    this.areaService.getAreasAsync().subscribe({
      next: (result: IArea[]) => {
        this.areas = result;
        this.formGroup = this.fromBuilder.nonNullable.group({
          name: '',
          areaId: this.areas[0]?.id || 0,
          description: '',
        });
        this.formReady = true;
      }
    })
  }

  createCategory() {
    const formValue = this.formGroup.getRawValue();
    this.categoryService.createCategory(
      {
        name: formValue.name,
        areaId: formValue.areaId,
        color: '#eee',
        description: formValue.description,
      }
    ).subscribe({
      next: () => {
        this.categoryService.pushUpdates();
      }
    })
  }
}
