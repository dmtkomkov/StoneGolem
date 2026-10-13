import { DateOnly } from '../types/DateOnly';
import { Currency, ICurrencyTotal } from './currency';
import { IPaymentCategoryFlat } from './payment-category';
import { IPagination } from './pagination';

export interface IPayment {
  id: number;
  amount: number;
  spentOn: DateOnly;
  currency: Currency;
  category: IPaymentCategoryFlat;
}

export interface ICreatePayment {
  amount: number;
  spentOn: DateOnly;
  currency: Currency;
  categoryId: number;
}

export interface IPaymentDayGroup {
  spentOn: DateOnly;
  totals: ICurrencyTotal[];
  payments: IPayment[];
}

export interface IPagedPaymentDayGroup extends IPagination {
  items: IPaymentDayGroup[];
}

export interface IPaymentCategoryTotal {
  categoryId: number;
  totals: ICurrencyTotal[];
}

export interface IPaymentMonthReport {
  year: number;
  month: number;
  totals: ICurrencyTotal[];
  categories: IPaymentCategoryTotal[];
}

export interface IPagedPaymentMonthReport extends IPagination {
  items: IPaymentMonthReport[];
}