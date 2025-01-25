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

function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('StoneGolemToken');
  const router = inject(Router);
  const as = inject(AuthService);

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

        return as.refresh().pipe(
          switchMap((response) => {
            let newToken = response.token;
            const newHeaders = new HttpHeaders({
              Authorization: `Bearer ${newToken}`
            });
            const retriedRequest = req.clone({
              url: environment.backend + req.url,
              headers: newHeaders
            });

            localStorage.setItem('StoneGolemToken', response.token);
            localStorage.setItem('StoneGolemRefreshToken', response.refreshToken);

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
