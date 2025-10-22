import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'sg-app-layout',
  imports: [RouterOutlet],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
  standalone: true,
})
export class AppLayoutComponent {
  private router = inject(Router);
  private tokenService = inject(TokenService);

  logout() {
    this.tokenService.removeTokens()
    this.router.navigate(['/login']).then();
  }
}
