import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationFormatPipe implements PipeTransform {
  transform(totalMinutes: number): string {
    if (!totalMinutes || totalMinutes < 1) return '0';

    const minutesInHour = 60;
    const minutesInDay = minutesInHour * 24;
    const minutesInWeek = minutesInDay * 7;

    const weeks = Math.floor(totalMinutes / minutesInWeek);
    totalMinutes %= minutesInWeek;

    const days = Math.floor(totalMinutes / minutesInDay);
    totalMinutes %= minutesInDay;

    const hours = Math.floor(totalMinutes / minutesInHour);
    const minutes = totalMinutes % minutesInHour;

    const parts: string[] = [];
    if (weeks) parts.push(`${weeks}w`);
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);

    return parts.join(' ');
  }
}
