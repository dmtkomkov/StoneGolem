import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { EParamName, EStepParam } from '../home/home.component';

const DEFAULT_STEP_PARAM = EStepParam.active;

@Injectable({
  providedIn: 'root'
})
export class AddDefaultParams implements CanActivateChild {
  router = inject(Router);

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (route.queryParamMap.has(EParamName.showSteps) && Object.values(EStepParam).includes(route.queryParams[EParamName.showSteps])) {
      return true;
    }
    return this.router.createUrlTree([state.url.split('?')[0]], {
      queryParams: {...route.queryParams, showSteps: DEFAULT_STEP_PARAM},
    });
  }
}
