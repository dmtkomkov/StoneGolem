import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'sg-money',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './money.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './money.component.scss',
})
export class MoneyComponent {
}