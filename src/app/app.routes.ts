import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserLoginComponent} from './user-login/user-login.component';
import { StepPageComponent } from './home/step-page/step-page.component';
import { GoalListComponent } from './home/goal-page/goal-list/goal-list.component';
import { CategoryListComponent } from './home/category-page/category-list/category-list.component';
import { StepListComponent } from './home/step-page/step-list/step-list.component';
import { StepGroupsComponent } from './home/step-page/step-groups/step-groups.component';
import { CategoryGroupsComponent } from './home/category-page/catgory-groups/category-groups.component';
import { CategoryPageComponent } from './home/category-page/category-page.component';
import { GoalPageComponent } from './home/goal-page/goal-page.component';
import { GoalGroupsComponent } from './home/goal-page/goal-groups/goal-groups.component';

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
          { path: '', component: StepGroupsComponent },
          { path: ':date', component: StepListComponent },
        ],
      },
      {
        path: 'goal',
        component: GoalPageComponent,
        children: [
          { path: '', component: GoalGroupsComponent },
          { path: ':project', component: GoalListComponent },
        ],
      },
      {
        path: 'category',
        component: CategoryPageComponent,
        children: [
          { path: '',  component: CategoryGroupsComponent },
          { path: ':area', component: CategoryListComponent },
        ],
      },
    ]
  },
  { path: 'login', component: UserLoginComponent },
  { path: '**', redirectTo: '' }
];
