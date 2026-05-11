import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AreaService } from '../../services/area.service';
import { IArea } from '../../static/models/area';
import { CategoryService } from '../../services/category.service';
import { Subscription } from 'rxjs';
import { SelectComponent, IOptionSet } from '../../shared/select/select.component';
import { NEW_OPTION } from '../../static/consts/default-options';
import { CategoryFormService } from '../../services/category-form.service';

interface CategoryForm {
  name: FormControl<string>;
  areaId: FormControl<number>;
  description: FormControl<string>;
  area?: FormGroup<AreaForm>;
}

interface AreaForm {
  name: FormControl<string>;
  description: FormControl<string>;
  color: FormControl<string>;
}

@Component({
  selector: 'sg-category-page',
  imports: [RouterOutlet, ReactiveFormsModule, SelectComponent],
  providers: [CategoryFormService],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.scss'
})
export class CategoryPageComponent {
  categoryForm!: FormGroup<CategoryForm>;
  areas!: IArea[];
  areaOptions: IOptionSet = [];
  formReady: boolean = false;
  isAreaForm: boolean = false;
  private formSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private areaService: AreaService,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.loadForm();
    this.initAreas();
  }

  private loadForm(): void {
    this.categoryForm = this.formBuilder.nonNullable.group({
      name: '',
      areaId: 0,
      description: '',
    });

    this.formSubscription = this.categoryForm.controls.areaId.valueChanges.subscribe({
      next: (value) => {
        if (value === null) {
          this.addAreaForm();
          this.isAreaForm = true;
        } else if (this.isAreaForm) {
          this.removeAreaForm();
          this.isAreaForm = false;
        }
      }
    });
  }

  initAreas(): void {
    this.areaService.getAreasAsync().subscribe({
      next: (result: IArea[]) => {
        this.areas = result;
        this.areaOptions = [
          ...this.areas.map(area => ({id: area.id, name: area.name})),
          NEW_OPTION,
        ];
        this.formReady = true;
        this.categoryForm.controls.areaId.setValue(this.areas[0]?.id || 0);
      }
    })
  }

  createCategory() {
    const formValue = this.categoryForm.getRawValue();
    this.categoryService.createCategory(
      {
        name: formValue.name,
        areaId: formValue.areaId || undefined,
        description: formValue.description,
        area: formValue.area ? {
          name: formValue.area.name,
          description: formValue.area.description,
          color: formValue.area.color
        } : undefined
      }
    ).subscribe({
      next: () => {
        this.categoryService.pushUpdates();
      }
    })
  }

  private addAreaForm(): void {
    this.categoryForm.addControl('area',
      this.formBuilder.nonNullable.group({
        name: '',
        description: '',
        color: '#ffffff'
      })
    );
  }

  private removeAreaForm(): void {
    this.categoryForm.removeControl('area');
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }
}
