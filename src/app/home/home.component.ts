import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { MenuSelectComponent, MenuSelectOption } from '../shared/menu-select/menu-select.component';

export enum EStepParam {
  active = 'active',
  deleted = 'deleted',
  all = 'all',
}

export enum EParamName {
  showSteps = 'showSteps',
}

@Component({
  selector: 'sg-home',
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule, RouterLinkActive, MenuSelectComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  readonly stepFilterOptions: ReadonlyArray<MenuSelectOption> = [
    {label: 'All', value: EStepParam.all},
    {label: 'Active', value: EStepParam.active},
    {label: 'Deleted', value: EStepParam.deleted},
  ];

  private destroy$ = new Subject<void>();
  stepParamControl = new FormControl<EStepParam>(EStepParam.all, {nonNullable: true});

  ngOnInit() {
    this.route.queryParams.pipe(
      takeUntil(this.destroy$),
      map(params => params[EParamName.showSteps] as EStepParam),
      distinctUntilChanged(),
    ).subscribe(value => {
      this.stepParamControl.setValue(value, {emitEvent: false});
    });

    this.stepParamControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(),
    ).subscribe(value => {
      this.updateUrl(value);
    });
  }

  private updateUrl(value: EStepParam) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {showSteps: value},
      queryParamsHandling: 'merge'
    }).then();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
