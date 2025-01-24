import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = sessionStorage.getItem('token');

  const modifiedRequest = req.clone({
    headers: token?
      new HttpHeaders({ Authorization: `Bearer ${token}`}):
      new HttpHeaders({}),
    url: environment.backend + req.url,
  });

  return next(modifiedRequest);
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
