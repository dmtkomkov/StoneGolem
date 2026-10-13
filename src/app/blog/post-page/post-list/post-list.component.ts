import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { distinctUntilChanged, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { PostService } from '../../../services/post.service';
import { PostFormService } from '../../../services/post-form.service';
import { IPagedPost } from '../../../static/models/post';
import { EParamName, EPostParam } from '../../../static/types/params';
import { POSTS_PAGE_SIZE } from '../../../static/types/constants';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { DateTimeFormatPipe } from '../../../pipes/datetime-format.pipe';

@Component({
  selector: 'sg-post-list',
  imports: [RouterLink, AsyncPipe, PaginationComponent, DateTimeFormatPipe],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  private postService = inject(PostService);
  private postFormService = inject(PostFormService);
  private route = inject(ActivatedRoute);

  posts$!: Observable<IPagedPost>;
  pageNumber: number = 1;

  constructor() {
    // Set before the first change detection: the page's form is already rendered when coming back from a post
    this.postFormService.setCreateMode();
  }

  ngOnInit(): void {
    const showPosts$ = this.route.queryParams.pipe(
      map(params => params[EParamName.showPosts] as EPostParam),
      distinctUntilChanged(),
      tap(() => this.pageNumber = 1), // Reset page on filter change
    );

    this.posts$ = showPosts$.pipe(
      switchMap(showPosts => this.postService.getUpdates().pipe(
        startWith(undefined),
        switchMap(() => this.postService.getPosts(showPosts, this.pageNumber, POSTS_PAGE_SIZE)),
      )),
    );
  }

  changePage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.postService.pushUpdates();
  }
}