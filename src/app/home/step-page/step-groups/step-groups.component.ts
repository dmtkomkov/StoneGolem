import { Component } from '@angular/core';
import { IStepGroup } from '../../../models/step';
import { StepService } from '../../../services/step.service';
import { RouterLink } from '@angular/router';
import { Observable, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'sg-step-groups',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './step-groups.component.html',
  styleUrl: './step-groups.component.scss',
})
export class StepGroupsComponent {
  stepGroups$!: Observable<IStepGroup[]>;

  constructor(
    private stepService: StepService,
  ) { }

  ngOnInit(): void {
    this.stepGroups$ = this.stepService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.stepService.getStepGroupsAsync()),
    );
  }
}
