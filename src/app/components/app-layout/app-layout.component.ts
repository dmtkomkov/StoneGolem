import { Component } from '@angular/core';
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

  constructor(
    private router: Router,
    private tokenService: TokenService,
  ) {
  }

  logout() {
    this.tokenService.removeTokens()
    this.router.navigate(['/login']).then();
  }
}
