import { Component, Signal } from '@angular/core';
import { StepService } from '../../services/step.service';
import { IStep, IStepGroup } from '../../models/Step';

@Component({
  selector: 'sg-step',
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {
  steps: Signal<IStep[]>;
  stepGroups: Signal<IStepGroup[]>;

  constructor(
    private stepService: StepService,
  ) {
    this.steps = this.stepService.getSteps();
    this.stepGroups = this.stepService.getStepGroups();
  }

  ngOnInit(): void {
    this.stepService.loadSteps();
    this.stepService.loadStepGroups();
  }
}
