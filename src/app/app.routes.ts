import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserLoginComponent} from './user-login/user-login.component';
import { StepPageComponent } from './home/step-page/step-page.component';
import { GoalComponent } from './home/goal/goal.component';
import { CategoryComponent } from './home/category/category.component';
import { StepListComponent } from './home/step-page/step-list/step-list.component';
import { StepGroupsComponent } from './home/step-page/step-groups/step-groups.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, children: [
      {
        path: '',
        redirectTo: 'step',
        pathMatch: 'full',
      },
      {
        path: 'step',
        component: StepPageComponent,
        children: [
          {
            path: '',
            component: StepGroupsComponent,
          },
          {
            path: ':date',
            component: StepListComponent,
          },
        ]
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
