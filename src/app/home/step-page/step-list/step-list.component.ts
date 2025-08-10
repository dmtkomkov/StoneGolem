import { Component, inject, Input } from '@angular/core';
import { IStep } from '../../../models/step';
import { StepService } from '../../../services/step.service';
import { DateOnly } from '../../../types/DateOnly';
import {
  distinctUntilChanged,
  map,
  mergeWith,
  Observable,
  switchMap,
  withLatestFrom
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { EParamName, EStepParam } from '../../home.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sg-step-list',
  imports: [AsyncPipe],
  templateUrl: './step-list.component.html',
  styleUrl: './step-list.component.scss',
})
export class StepListComponent {
  @Input() date!: DateOnly;
  steps$!: Observable<IStep[]>;
  stepService = inject(StepService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    const routeUpdate$ = this.route.queryParams.pipe(
      map(params => params[EParamName.showSteps] as EStepParam),
      distinctUntilChanged(),
    )

    this.steps$ = this.stepService.getUpdates().pipe(
      mergeWith(routeUpdate$),
      withLatestFrom(routeUpdate$),
      map(params => params[1]),
      switchMap((stepParam) => {
        return this.stepService.getStepsAsync(this.date, stepParam)
      }),
      map(steps =>
        steps.sort((a, b) => Number(a.isDeleted) - Number(b.isDeleted))
      )
    );
  }

  toggle(id: number) {
    this.stepService.toggleStep(id).subscribe({
      next: () => {
        this.stepService.pushUpdates();
      }
    });
  }
}
