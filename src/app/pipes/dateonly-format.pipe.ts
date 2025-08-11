import { Pipe, PipeTransform } from '@angular/core';
import { DateOnly } from '../types/DateOnly';

@Pipe({
  name: 'dateOnly',
  standalone: true
})
export class DateOnlyFormatPipe implements PipeTransform {
  transform(value: DateOnly): string {
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date.getTime())) return '';

    const day = date.getDate();

    const monthGenitive = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    const month = monthGenitive[date.getMonth()];

    const year = date.getFullYear();
    const weekday = date.toLocaleString('ru-RU', {weekday: 'long'});

    return `${day} ${month} ${year} (${weekday})`;
  }
}
