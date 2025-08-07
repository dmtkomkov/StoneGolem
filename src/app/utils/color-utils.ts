export class ColorUtils {
  static defaultColor = '#eeeeee';
  static defaultOpacity = 0.2;

  static hexToRgba(hex: string, alpha: number = 1): string {
    const parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!parsed) return 'rgba(0,0,0,0)'; // fallback

    const r = parseInt(parsed[1], 16);
    const g = parseInt(parsed[2], 16);
    const b = parseInt(parsed[3], 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
