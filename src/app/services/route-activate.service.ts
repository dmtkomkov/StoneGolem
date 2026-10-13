import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { EParamName } from '../static/types/params';

// Keeps a query parameter valid on every child route: a missing or unknown value is replaced by the fallback
export function defaultQueryParamGuard(name: EParamName, allowedValues: string[], fallback: string): CanActivateChildFn {
  return (route, state) => {
    const value = route.queryParamMap.get(name);
    if (value !== null && allowedValues.includes(value)) {
      return true;
    }

    return inject(Router).createUrlTree([state.url.split('?')[0]], {
      queryParams: {...route.queryParams, [name]: fallback},
    });
  };
}