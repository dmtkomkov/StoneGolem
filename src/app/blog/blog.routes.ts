import { Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostListComponent } from './post-page/post-list/post-list.component';
import { PostDetailComponent } from './post-page/post-detail/post-detail.component';
import { defaultQueryParamGuard } from '../services/route-activate.service';
import { EParamName, EPostParam } from '../static/types/params';

export const BLOG_ROUTES: Routes = [
  {
    path: '',
    component: BlogComponent,
    canActivateChild: [defaultQueryParamGuard(EParamName.showPosts, Object.values(EPostParam), EPostParam.active)],
    children: [
      {
        path: '',
        component: PostPageComponent,
        children: [
          {path: '', component: PostListComponent},
          {path: ':id', component: PostDetailComponent},
        ],
      },
    ],
  },
];