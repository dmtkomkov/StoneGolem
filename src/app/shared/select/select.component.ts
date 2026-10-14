import { Component, forwardRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ColorUtils } from '../../utils/color-utils';

export type SelectValue = number | string | null;

export type IOptionSet = (IOptionGroup | IOption)[];

export interface IOption {
  id: SelectValue;
  name: string;
}

export interface IOptionGroup {
  name: string;
  color: string;
  options: IOption[];
}

@Component({
  selector: 'sg-select',
  imports: [
    CdkMenuTrigger,
    CdkMenuItem,
    CdkMenu,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() items: IOptionSet = [];
  @Input() placeholder: string = 'Select';

  value: SelectValue = null;
  disabled = false;

  private onChange: (v: SelectValue) => void = () => {};
  private onTouched: () => void = () => {};

  get selectedLabel(): string {
    for (const item of this.items) {
      if ('id' in item) {
        if (item.id === this.value) return item.name;
      } else {
        const option = item.options.find(opt => opt.id === this.value);
        if (option) return option.name;
      }
    }
    return this.placeholder;
  }

  writeValue(obj: SelectValue): void {
    this.value = obj;
  }

  registerOnChange(fn: (v: SelectValue) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectOption(option: IOption) {
    this.value = option.id;
    this.onChange(option.id);
    this.onTouched();
  }

  getTransparentColor(color: string): string {
    return ColorUtils.hexToRgba(color, ColorUtils.defaultOpacity);
  }
}
