import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { catchError } from 'rxjs';

import { routes } from './app.routes';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { ITokens, TokenService } from './services/token.service';

function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = tokenService.getToken();

  const modifiedRequest = req.clone({
    headers: token?
      new HttpHeaders({ Authorization: `Bearer ${token}`}):
      new HttpHeaders({}),
    url: environment.backend + req.url,
  });

  if (req.url.startsWith('auth')) {
    return next(modifiedRequest);
  }

  return next(modifiedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {

        return authService.refresh().pipe(
          switchMap((response: ITokens) => {
            let newToken = response.token;
            const newHeaders = new HttpHeaders({
              Authorization: `Bearer ${newToken}`
            });
            const retriedRequest = req.clone({
              url: environment.backend + req.url,
              headers: newHeaders
            });

            tokenService.setTokens(response);

            return next(retriedRequest);
          }),
          catchError(() => {
            router.navigate(['/login']).then();

            return throwError(() => error);
          })
        );
      }

      return throwError(() => error);
    })
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        loggingInterceptor,
      ])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  ]
};
