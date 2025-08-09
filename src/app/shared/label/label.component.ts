import { Component, Input } from '@angular/core';

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
  styleUrl: './label.component.scss'
})
export class LabelComponent {
  @Input() labelData: ILabelData = {data: []};
}
