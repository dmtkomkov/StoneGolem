import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay, switchMap } from 'rxjs';
import { PaymentService } from '../../services/payment.service';
import { PaymentCategoryService } from '../../services/payment-category.service';
import { IPagedPaymentMonthReport } from '../../static/models/payment';
import { IPaymentCategory } from '../../static/models/payment-category';
import { ICurrencyTotal } from '../../static/models/currency';
import { REPORT_MONTHS_PAGE_SIZE } from '../../static/types/constants';
import { ILabelData, LabelComponent } from '../../shared/label/label.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { MonthYearPipe } from '../../pipes/month-year.pipe';
import { CurrencyUtils } from '../../utils/currency-utils';

interface IReportRow {
  key: string;
  year: number;
  month: number;
  totals: ICurrencyTotal[];
  cells: ICurrencyTotal[][];
}

interface IReportView {
  page: IPagedPaymentMonthReport;
  columns: IPaymentCategory[];
  rows: IReportRow[];
  gridColumns: string;
}

@Component({
  selector: 'sg-report-page',
  imports: [AsyncPipe, LabelComponent, PaginationComponent, MonthYearPipe],
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.scss',
})
export class ReportPageComponent {
  private paymentService = inject(PaymentService);
  private paymentCategoryService = inject(PaymentCategoryService);

  private pageNumber$ = new BehaviorSubject<number>(1);

  report$!: Observable<IReportView>;

  ngOnInit(): void {
    const categories$ = this.paymentCategoryService.getPaymentCategories().pipe(shareReplay(1));

    this.report$ = this.pageNumber$.pipe(
      switchMap(pageNumber => combineLatest([
        categories$,
        this.paymentService.getMonthlyReport(pageNumber, REPORT_MONTHS_PAGE_SIZE),
      ])),
      map(([categories, report]) => this.toView(categories, report)),
    );
  }

  changePage(pageNumber: number) {
    this.pageNumber$.next(pageNumber);
  }

  getTotalLabel(total: ICurrencyTotal): ILabelData {
    return CurrencyUtils.getTotalLabel(total);
  }

  getTooltip(category: IPaymentCategory): string {
    return category.description ? `${category.name} (${category.description})` : category.name;
  }

  // Cells are matched to the header columns by category id, not by position
  private toView(categories: IPaymentCategory[], report: IPagedPaymentMonthReport): IReportView {
    const rows = report.items.map(item => {
      const totalsByCategory = new Map(item.categories.map(c => [c.categoryId, c.totals]));
      return {
        key: `${item.year}-${item.month}`,
        year: item.year,
        month: item.month,
        totals: item.totals,
        cells: categories.map(category => totalsByCategory.get(category.id) ?? []),
      };
    });

    const categoryColumns = categories.length > 0 ? ` repeat(${categories.length}, minmax(3.5rem, 1fr))` : '';

    return {
      page: report,
      columns: categories,
      rows,
      gridColumns: `5rem minmax(7rem, auto)${categoryColumns}`,
    };
  }
}