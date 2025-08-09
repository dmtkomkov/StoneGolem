import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';

export enum EStepParam {
  active = 'active',
  deleted = 'deleted',
  all = 'all',
}

export enum EParamName {
  showSteps = 'showSteps',
}

export const DEBOUNCE_TIME = 100;

@Component({
  selector: 'sg-home',
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  stepParam = EStepParam;

  private destroy$ = new Subject<void>();
  stepParamControl = new FormControl<EStepParam>(EStepParam.all, {nonNullable: true});

  ngOnInit() {
    this.route.queryParams.pipe(
      takeUntil(this.destroy$),
      map((params) => {
        const value = params[EParamName.showSteps] as EStepParam ?? EStepParam.all;
        if (Object.values(EStepParam).includes(value)) {
          return value as EStepParam;
        }

        return EStepParam.all;
      }),
      distinctUntilChanged()
    ).subscribe(value => {
      this.stepParamControl.setValue(value, {emitEvent: false});
    });

    this.stepParamControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(DEBOUNCE_TIME),
      distinctUntilChanged()
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
