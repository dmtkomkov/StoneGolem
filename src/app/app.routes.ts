import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserLoginComponent} from './user-login/user-login.component';
import { StepComponent } from './home/step/step.component';
import { GoalComponent } from './home/goal/goal.component';
import { CategoryComponent } from './home/category/category.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, children: [
      {
        path: '',
        redirectTo: 'step',
        pathMatch: 'full',
      },
      {
        path: 'step',
        component: StepComponent,
      },
      {
        path: 'goal',
        component: GoalComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
    ]
  },
  { path: 'login', component: UserLoginComponent },
  { path: '**', redirectTo: '' }
];
