import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
  withXhr
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { ITokens } from './static/models/user';

function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = tokenService.getToken();

  const modifiedRequest = req.clone({
    headers: token ?
      new HttpHeaders({Authorization: `Bearer ${token}`}) :
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
      withXhr(),
      withInterceptors([
        authInterceptor,
      ])
    ),
    provideRouter(routes, withComponentInputBinding()),
    provideZoneChangeDetection({eventCoalescing: true}),
  ]
};
