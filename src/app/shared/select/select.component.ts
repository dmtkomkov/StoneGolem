import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ColorUtils } from '../../utils/color-utils';

export interface IOption {
  id: number;
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
  @Input() optionGroups: IOptionGroup[] = [];

  defaultOption: IOption = { id: 0, name: '-- None --' };
  value: number = this.defaultOption.id;
  selectedLabel: string = this.defaultOption.name;

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(obj: any): void {
    this.value = obj;
    this.selectedLabel = this.getLabel();
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  selectOption(option: IOption) {
    this.value = option.id;
    this.onChange(option.id);
    this.onTouched();
    this.selectedLabel = this.getLabel();
  }

  private getLabel(): string {
    for (const item of this.optionGroups) {
      if ('id' in item) {
        if (item.id === this.value) {
          return item.name;
        }
      } else {
        const option = item.options.find(opt => opt.id === this.value);
        if (option) {
          return option.name;
        }
      }
    }
    return this.defaultOption.name;
  }

  getTransparentColor(color: string): string {
    return ColorUtils.hexToRgba(color, ColorUtils.defaultOpacity);
  }
}
