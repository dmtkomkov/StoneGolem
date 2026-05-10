import { DateOnly } from '../static/types/DateOnly';

export class DateUtils {
  static daysSince(date: DateOnly): number {
    if (!date) return 0;
    const today = Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const then = new Date(date).getTime();
    return Math.floor((today - then) / (24 * 60 * 60 * 1000));
  }
}

