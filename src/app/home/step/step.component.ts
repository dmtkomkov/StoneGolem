import { Component, Signal } from '@angular/core';
import { StepService } from '../../services/step.service';
import { IStepDto } from '../../models/Step';

@Component({
  selector: 'sg-step',
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {
  steps: Signal<IStepDto[]>;

  constructor(
    private stepService: StepService,
  ) {
    this.steps = this.stepService.getSteps();
  }

  ngOnInit(): void {
    this.stepService.loadSteps();
  }
}
