import { Component, Input } from '@angular/core';
import { IStep } from '../../../models/step';
import { StepService } from '../../../services/step.service';
import { DateOnly } from '../../../types/DateOnly';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'sg-step-list',
  imports: [AsyncPipe],
  templateUrl: './step-list.component.html',
  styleUrl: './step-list.component.scss',
})
export class StepListComponent {
  @Input() date!: DateOnly;
  steps$!: Observable<IStep[]>;

  constructor(
    private stepService: StepService,
  ) {
  }

  ngOnInit(): void {
    this.steps$ = this.stepService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.stepService.getStepsAsync(this.date)),
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
