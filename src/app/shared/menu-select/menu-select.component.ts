import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type MenuSelectValue = number | string | null;

export interface MenuSelectOption {
  label: string;
  value: MenuSelectValue;
}

@Component({
  selector: 'sg-menu-select',
  standalone: true,
  imports: [CdkMenuModule],
  templateUrl: './menu-select.component.html',
  styleUrl: './menu-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MenuSelectComponent),
      multi: true,
    },
  ],
})
export class MenuSelectComponent implements ControlValueAccessor {
  @Input() options: ReadonlyArray<MenuSelectOption> = [];
  @Input() placeholder: string = 'Select';

  value: MenuSelectValue = null;
  disabled: boolean = false;

  private onChange: (value: MenuSelectValue) => void = () => {};
  private onTouched: () => void = () => {};

  get selectedLabel(): string {
    return this.options.find(option => option.value === this.value)?.label ?? this.placeholder;
  }

  writeValue(value: MenuSelectValue): void {
    this.value = value;
  }

  registerOnChange(fn: (value: MenuSelectValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectOption(value: MenuSelectValue): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}

