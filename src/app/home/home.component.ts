import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IOptionSet } from '../shared/select/select.component';
import { ParamFilterComponent } from '../shared/param-filter/param-filter.component';
import { EParamName, EStepParam } from '../static/types/params';

@Component({
  selector: 'sg-home',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ParamFilterComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly stepParamName = EParamName.showSteps;
  readonly stepFilterOptions: IOptionSet = [
    {id: EStepParam.all, name: 'All'},
    {id: EStepParam.active, name: 'Active'},
    {id: EStepParam.deleted, name: 'Deleted'},
  ];
}