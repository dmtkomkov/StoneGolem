export interface IPaymentCategoryFlat {
  id: number;
  name: string;
  label: string | null;
  description: string;
}

export interface IPaymentCategory extends IPaymentCategoryFlat {
  paymentCount: number;
}