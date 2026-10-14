import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { filter, map, Observable, startWith } from 'rxjs';
import { TokenService } from '../../services/token.service';

type Section = 'time' | 'money' | 'blog' | 'login';

interface ISectionLink {
  id: Section;
  icon: string;
  name: string;
  link: string;
}

@Component({
  selector: 'sg-app-layout',
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  templateUrl: './app-layout.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {
  private router = inject(Router);
  private tokenService = inject(TokenService);

  readonly sections: ISectionLink[] = [
    {id: 'time', icon: '⏱', name: 'Time', link: '/step'},
    {id: 'money', icon: '💰', name: 'Money', link: '/money'},
    {id: 'blog', icon: '📝', name: 'Blog', link: '/blog'},
  ];

  readonly section$: Observable<Section> = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => this.getSection(this.router.url)),
  );

  logout() {
    this.tokenService.removeTokens()
    this.router.navigate(['/login']).then();
  }

  private getSection(url: string): Section {
    const segment = url.split(/[/?#]/)[1] ?? '';
    if (segment === 'login' || segment === 'money' || segment === 'blog') {
      return segment;
    }
    return 'time';
  }
}