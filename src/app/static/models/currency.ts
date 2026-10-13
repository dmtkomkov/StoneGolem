// Mirrors the API enum; currencies are never converted or summed together on the client
export const CURRENCIES = ['PLN', 'EUR'] as const;

export type Currency = typeof CURRENCIES[number];

export const DEFAULT_CURRENCY: Currency = 'EUR';

export const CURRENCY_COLORS: Record<string, string> = {
  PLN: '#5bc0de',
  EUR: '#f0ad4e',
};

export interface ICurrencyTotal {
  currency: Currency;
  amount: number;
}