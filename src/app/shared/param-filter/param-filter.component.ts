import { Component, inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { IOptionSet, SelectComponent } from '../select/select.component';
import { EParamName } from '../../static/types/params';

// Select whose value lives in a URL query parameter: the URL drives the select and the select writes to the URL
@Component({
  selector: 'sg-param-filter',
  imports: [ReactiveFormsModule, SelectComponent],
  template: `
    <sg-select [formControl]="control" [items]="options" placeholder="All"></sg-select>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
  `,
})
export class ParamFilterComponent {
  @Input({required: true}) param!: EParamName;
  @Input() options: IOptionSet = [];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  control = new FormControl<string>('', {nonNullable: true});

  ngOnInit() {
    this.route.queryParams.pipe(
      takeUntil(this.destroy$),
      map(params => params[this.param] as string),
      distinctUntilChanged(),
    ).subscribe(value => {
      this.control.setValue(value, {emitEvent: false});
    });

    this.control.valueChanges.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(),
    ).subscribe(value => {
      this.updateUrl(value);
    });
  }

  private updateUrl(value: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {[this.param]: value},
      queryParamsHandling: 'merge'
    }).then();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
