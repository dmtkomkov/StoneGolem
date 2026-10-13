import { Pipe, PipeTransform } from '@angular/core';

// Formats a calendar month as "Jan 25"
@Pipe({
  name: 'monthYear',
})
export class MonthYearPipe implements PipeTransform {
  transform(year: number, month: number): string {
    const monthName = new Date(year, month - 1, 1).toLocaleString('en-US', {month: 'short'});
    return `${monthName} ${String(year % 100).padStart(2, '0')}`;
  }
}