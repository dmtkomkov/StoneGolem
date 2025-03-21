import { Component } from '@angular/core';
import { IStep } from '../../../models/step';
import { StepService } from '../../../services/step.service';
import { ActivatedRoute } from '@angular/router';
import { DateOnly } from '../../../types/DateOnly';
import { Observable, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'sg-step-list',
  imports: [AsyncPipe],
  templateUrl: './step-list.component.html',
  styleUrl: './step-list.component.scss',
})
export class StepListComponent {
  date: DateOnly;
  steps$!: Observable<IStep[]>;

  constructor(
    private route: ActivatedRoute,
    private stepService: StepService,
  ) {
    this.date = this.route.snapshot.paramMap.get('date') as DateOnly;
  }

  ngOnInit(): void {
    this.steps$ = this.stepService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.stepService.getStepsAsync(this.date)),
    );
  }
}
