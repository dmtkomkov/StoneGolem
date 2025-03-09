import { Component, Signal } from '@angular/core';
import { IStep } from '../../../models/Step';
import { StepService } from '../../../services/step.service';
import { ActivatedRoute } from '@angular/router';
import { DateOnly } from '../../../types/DateOnly';

@Component({
  selector: 'sg-step-list',
  imports: [],
  templateUrl: './step-list.component.html',
  styleUrl: './step-list.component.scss',
})
export class StepListComponent {
  steps: Signal<IStep[]>;
  date: DateOnly;

  constructor(
    private route: ActivatedRoute,
    private stepService: StepService,
  ) {
    this.date = this.route.snapshot.paramMap.get('date') as DateOnly;
    this.steps = this.stepService.getSteps();
  }

  ngOnInit(): void {
    this.stepService.loadSteps(this.date);
    this.stepService.getUpdates().subscribe({
      next: () => {
        this.stepService.loadSteps(this.date);
      }
    });
  }
}
