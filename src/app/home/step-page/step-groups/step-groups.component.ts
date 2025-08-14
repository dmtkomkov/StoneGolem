import { Component, inject } from '@angular/core';
import { IPagedStepGroup, IStep } from '../../../models/step';
import { StepService } from '../../../services/step.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { distinctUntilChanged, map, mergeWith, Observable, switchMap, tap, withLatestFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ILabelData, LabelComponent } from '../../../shared/label/label.component';
import { ColorUtils } from '../../../utils/color-utils';
import { EParamName, EStepParam } from '../../home.component';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { DurationFormatPipe } from '../../../pipes/duration-format.pipe';
import { DateOnlyFormatPipe } from '../../../pipes/dateonly-format.pipe';
import { StepFormService } from '../../../services/step-form.service';
import { DateOnly } from '../../../types/DateOnly';

@Component({
  selector: 'sg-step-groups',
  imports: [RouterLink, AsyncPipe, LabelComponent, PaginationComponent, DateOnlyFormatPipe],
  templateUrl: './step-groups.component.html',
  styleUrl: './step-groups.component.scss',
})
export class StepGroupsComponent {
  stepGroups$!: Observable<IPagedStepGroup>;
  stepService = inject(StepService);
  route = inject(ActivatedRoute);
  stepFormService = inject(StepFormService);
  durationPipe = new DurationFormatPipe();
  pageNumber: number = 1;
  pageSize: number = 7;

  ngOnInit(): void {
    this.stepFormService.setDate(new Date().toISOString().split('T')[0] as DateOnly, false);

    const routeUpdate$ = this.route.queryParams.pipe(
      map(params => params[EParamName.showSteps] as EStepParam),
      distinctUntilChanged(),
      tap(() => this.pageNumber = 1) // Reset page on route change params
    )

    this.stepGroups$ = this.stepService.getUpdates().pipe(
      mergeWith(routeUpdate$),
      withLatestFrom(routeUpdate$),
      map(params => params[1]),
      switchMap(stepParam => this.stepService.getStepGroups(stepParam, this.pageNumber, this.pageSize)),
    );
  }

  changePage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.stepService.pushUpdates();
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
      text: this.durationPipe.transform(step.duration),
      color: '#eeeeee',
      background: '#777888'
    });

    return {data: labelItems};
  }

  getTransparentColor(color: string | undefined): string {
    return ColorUtils.hexToRgba(color || ColorUtils.defaultColor, 0.4);
  }
}
