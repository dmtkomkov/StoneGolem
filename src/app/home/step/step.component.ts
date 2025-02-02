import { Component, Signal } from '@angular/core';
import { StepService } from '../../services/step.service';
import { CommonModule } from '@angular/common';
import { Step } from '../../models/step';

@Component({
  selector: 'sg-step',
  imports: [CommonModule],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {
  steps: Signal<Step[]>;

  constructor(
    private stepService: StepService,
  ) {
    this.steps = this.stepService.getSteps();
  }

  ngOnInit(): void {
    this.stepService.loadSteps();
  }
}
