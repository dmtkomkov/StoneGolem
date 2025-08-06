import { Component } from '@angular/core';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';

@Component({
  selector: 'sg-app-root',
  imports: [AppLayoutComponent],
  template: `
    <sg-app-layout></sg-app-layout>`,
})
export class AppComponent {

}
