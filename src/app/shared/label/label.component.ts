import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export interface ILabelItem {
  text: string;
  color: string;
  background: string;
}

export interface ILabelData {
  data: ILabelItem[];
}

@Component({
  selector: 'sg-label',
  imports: [],
  templateUrl: './label.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './label.component.scss'
})
export class LabelComponent {
  @Input() labelData: ILabelData = {data: []};
}
