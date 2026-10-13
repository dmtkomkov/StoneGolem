import { Pipe, PipeTransform } from '@angular/core';

// Formats an ISO timestamp in the browser's time zone as "13 Oct 2026 01:19"
@Pipe({
  name: 'dateTime',
})
export class DateTimeFormatPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date.getTime())) return '';

    const month = date.toLocaleString('en-US', {month: 'short'});
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${date.getDate()} ${month} ${date.getFullYear()} ${hours}:${minutes}`;
  }
}