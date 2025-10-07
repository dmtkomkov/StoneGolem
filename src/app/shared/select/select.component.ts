import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ColorUtils } from '../../utils/color-utils';

export type IOptionSet = (IOptionGroup | IOption)[];

export interface IOption {
  id: number | string;
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
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() items: IOptionSet = [];

  value!: number | string;
  selectedLabel!: string;

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(obj: any): void {
    this.value = obj;
    this.updateLabel();
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  selectOption(option: IOption) {
    this.value = option.id;
    this.onChange(option.id);
    this.onTouched();
    this.updateLabel();
  }

  private updateLabel() {
    for (const item of this.items) {
      if ('id' in item) {
        if (item.id === this.value) {
          this.selectedLabel = item.name;
          break;
        }
      } else {
        const option = item.options.find(opt => opt.id === this.value);
        if (option) {
          this.selectedLabel = option.name;
          break;
        }
      }
    }
  }

  getTransparentColor(color: string): string {
    return ColorUtils.hexToRgba(color, ColorUtils.defaultOpacity);
  }
}
