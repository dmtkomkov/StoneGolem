import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IOptionSet } from '../shared/select/select.component';
import { ParamFilterComponent } from '../shared/param-filter/param-filter.component';
import { EParamName, EPostParam } from '../static/types/params';

@Component({
  selector: 'sg-blog',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ParamFilterComponent],
  templateUrl: './blog.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  readonly postParamName = EParamName.showPosts;
  readonly postFilterOptions: IOptionSet = [
    {id: EPostParam.all, name: 'All'},
    {id: EPostParam.active, name: 'Active'},
    {id: EPostParam.deleted, name: 'Deleted'},
  ];
}