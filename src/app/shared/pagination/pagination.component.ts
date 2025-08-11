import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPagination } from '../../models/step';

@Component({
  selector: 'sg-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() pg!: IPagination;
  @Output() onPageNumberChange = new EventEmitter<number>();

  setPageNumber(pageNumber: number) {
    this.onPageNumberChange.emit(pageNumber);
  }
}
