import { Component } from '@angular/core';
import { IStep, IStepGroup } from '../../../models/step';
import { StepService } from '../../../services/step.service';
import { RouterLink } from '@angular/router';
import { Observable, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ILabelData, LabelComponent } from '../../../shared/label/label.component';
import { ColorUtils } from '../../../utils/color-utils';

@Component({
  selector: 'sg-step-groups',
  imports: [RouterLink, AsyncPipe, LabelComponent],
  templateUrl: './step-groups.component.html',
  styleUrl: './step-groups.component.scss',
})
export class StepGroupsComponent {
  stepGroups$!: Observable<IStepGroup[]>;

  constructor(
    private stepService: StepService,
  ) {
  }

  ngOnInit(): void {
    this.stepGroups$ = this.stepService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.stepService.getStepGroupsAsync()),
    );
  }

  getLabelData(step: IStep): ILabelData {
    const labelItems = [];
    labelItems.push({
      text: step.user.userName,
      color: '#eeeeee',
      background: '#777888'
    });
    labelItems.push({
      text: step.category.name,
      color: '#000000',
      background: this.getTransparentColor(step.category.area.color),
    });
    if (step.goal) {
      labelItems.push({
        text: step.goal.name,
        color: '#000000',
        background: this.getTransparentColor(step.goal.project?.color),
      });
    }
    labelItems.push({
      text: step.duration.toString(),
      color: '#eeeeee',
      background: '#777888'
    });

    return { data: labelItems };
  }

  getTransparentColor(color: string | undefined): string {
    return ColorUtils.hexToRgba(color || ColorUtils.defaultColor, 0.5);
  }
}
