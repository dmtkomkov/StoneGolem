import { Routes } from '@angular/router';
import { MoneyComponent } from './money.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { PaymentGroupsComponent } from './payment-page/payment-groups/payment-groups.component';
import { PaymentListComponent } from './payment-page/payment-list/payment-list.component';
import { ReportPageComponent } from './report-page/report-page.component';

export const MONEY_ROUTES: Routes = [
  {
    path: '',
    component: MoneyComponent,
    children: [
      {
        path: '',
        redirectTo: 'payment',
        pathMatch: 'full',
      },
      {
        path: 'payment',
        component: PaymentPageComponent,
        children: [
          {path: '', component: PaymentGroupsComponent},
          {path: ':date', component: PaymentListComponent},
        ],
      },
      {path: 'report', component: ReportPageComponent},
    ],
  },
];