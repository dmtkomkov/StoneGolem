import { Component, inject, Input } from '@angular/core';
import { IStep } from '../../../static/models/step';
import { StepService } from '../../../services/step.service';
import { DateOnly } from '../../../static/types/DateOnly';
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
import { DurationFormatPipe } from '../../../pipes/duration-format.pipe';
import { DateOnlyFormatPipe } from '../../../pipes/dateonly-format.pipe';
import { StepFormService } from '../../../services/step-form.service';

@Component({
  selector: 'sg-step-list',
  imports: [AsyncPipe, DurationFormatPipe, DateOnlyFormatPipe],
  templateUrl: './step-list.component.html',
  styleUrl: './step-list.component.scss',
})
export class StepListComponent {
  @Input() date!: DateOnly;

  private stepService = inject(StepService);
  private stepFormService = inject(StepFormService);
  private route = inject(ActivatedRoute);

  steps$!: Observable<IStep[]>;

  ngOnInit(): void {
    this.stepFormService.setDate(this.date, true);

    const routeUpdate$ = this.route.queryParams.pipe(
      map(params => params[EParamName.showSteps] as EStepParam),
      distinctUntilChanged(),
    )

    this.steps$ = this.stepService.getUpdates().pipe(
      mergeWith(routeUpdate$),
      withLatestFrom(routeUpdate$),
      map(params => params[1]),
      switchMap(stepParam => this.stepService.getStepsAsync(this.date, stepParam)),
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
