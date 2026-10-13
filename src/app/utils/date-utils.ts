import { DateOnly } from '../static/types/DateOnly';

export class DateUtils {
  static daysSince(date: DateOnly): number {
    if (!date) return 0;
    const today = Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const then = new Date(date).getTime();
    return Math.floor((today - then) / (24 * 60 * 60 * 1000));
  }

  // Today in the browser's time zone; toISOString() would give the UTC date
  static today(): DateOnly {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}` as DateOnly;
  }
}