import { Component, Signal } from '@angular/core';
import { IStepGroup } from '../../../models/Step';
import { StepService } from '../../../services/step.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sg-step-groups',
  imports: [RouterLink],
  templateUrl: './step-groups.component.html',
  styleUrl: './step-groups.component.scss',
})
export class StepGroupsComponent {
  stepGroups: Signal<IStepGroup[]>;

  constructor(
    private stepService: StepService,
  ) {
    this.stepGroups = this.stepService.getStepGroups();
  }

  ngOnInit(): void {
    this.stepService.loadStepGroups();
    this.stepService.getUpdates().subscribe({
      next: () => {
        this.stepService.loadStepGroups();
      }
    });
  }
}
