import { ColorUtils } from './color-utils';
import { CURRENCY_COLORS, ICurrencyTotal } from '../static/models/currency';
import { ILabelData } from '../shared/label/label.component';

export class CurrencyUtils {
  // Zero amounts get the neutral color so that non-zero totals stand out
  static getBackground(total: ICurrencyTotal): string {
    const color = total.amount === 0
      ? ColorUtils.defaultColor
      : CURRENCY_COLORS[total.currency] || ColorUtils.defaultColor;
    return ColorUtils.hexToRgba(color, 0.4);
  }

  static getTotalLabel(total: ICurrencyTotal): ILabelData {
    return {
      data: [{
        text: `${total.amount} ${total.currency}`,
        color: '#000000',
        background: CurrencyUtils.getBackground(total),
      }]
    };
  }
}