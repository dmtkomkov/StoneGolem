import { Component, inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { CdkMenuModule } from '@angular/cdk/menu';
import { catchError, map, Observable, of, startWith, switchMap, tap, throwError } from 'rxjs';
import { PostService } from '../../../services/post.service';
import { PostFormService } from '../../../services/post-form.service';
import { IPost } from '../../../static/models/post';
import { DateTimeFormatPipe } from '../../../pipes/datetime-format.pipe';

interface IPostState {
  post: IPost | null; // null when the post does not exist
}

@Component({
  selector: 'sg-post-detail',
  imports: [AsyncPipe, CdkMenuModule, DateTimeFormatPipe],
  templateUrl: './post-detail.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent {
  @Input() id!: string;

  private postService = inject(PostService);
  private postFormService = inject(PostFormService);
  private router = inject(Router);

  state$!: Observable<IPostState>;
  private editedPostId: number | null = null;

  ngOnInit(): void {
    const postId = Number(this.id);

    this.state$ = this.postService.getUpdates().pipe(
      startWith(undefined),
      switchMap(() => this.loadPost(postId)),
      map(post => ({post})),
      tap(state => this.updateForm(state.post)),
    );
  }

  toggle(id: number) {
    this.postService.togglePost(id).subscribe({
      next: () => {
        this.postService.pushUpdates();
      }
    });
  }

  delete(id: number): void {
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.router.navigate(['/blog'], {queryParamsHandling: 'preserve'}).then(() => {
          this.postService.pushUpdates();
        });
      }
    });
  }

  private loadPost(id: number): Observable<IPost | null> {
    if (!Number.isInteger(id)) {
      return of(null);
    }

    return this.postService.getPost(id).pipe(
      catchError((error: HttpErrorResponse) => error.status === 404 ? of(null) : throwError(() => error)),
    );
  }

  // The form is filled only when a post is opened, so reloads after a toggle or save keep the user's input
  private updateForm(post: IPost | null) {
    if (post === null) {
      this.editedPostId = null;
      this.postFormService.setCreateMode();
    } else if (post.id !== this.editedPostId) {
      this.editedPostId = post.id;
      this.postFormService.setEditMode(post);
    }
  }
}