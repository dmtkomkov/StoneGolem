import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { IPagination } from '../../static/models/pagination';

@Component({
  selector: 'sg-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() pg!: IPagination;
  @Output() onPageNumberChange = new EventEmitter<number>();

  setPageNumber(pageNumber: number) {
    this.onPageNumberChange.emit(pageNumber);
  }
}
