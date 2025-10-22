import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBullseye, faFolderOpen, faShoePrints } from '@fortawesome/free-solid-svg-icons';

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
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule, RouterLinkActive, FaIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected readonly goalIcon = faBullseye;
  protected readonly categoryIcon = faFolderOpen;
  protected readonly stepIcon = faShoePrints;

  stepParam = EStepParam;

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
