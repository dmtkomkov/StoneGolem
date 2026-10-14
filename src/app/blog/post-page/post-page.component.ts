import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PostService } from '../../services/post.service';
import { POST_TITLE_MAX_LENGTH, PostForm, PostFormService } from '../../services/post-form.service';
import { IPost } from '../../static/models/post';

@Component({
  selector: 'sg-post-page',
  imports: [RouterOutlet, ReactiveFormsModule],
  providers: [PostFormService],
  templateUrl: './post-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './post-page.component.scss',
})
export class PostPageComponent {
  private postService = inject(PostService);
  private postFormService = inject(PostFormService);

  readonly titleMaxLength = POST_TITLE_MAX_LENGTH;
  postForm!: FormGroup<PostForm>;
  saving = false;

  ngOnInit(): void {
    this.postForm = this.postFormService.getForm();
  }

  get isEditMode(): boolean {
    return this.postFormService.getEditId() !== null;
  }

  savePost() {
    if (this.postForm.invalid || this.saving) {
      return;
    }

    const editId = this.postFormService.getEditId();
    const post = this.postFormService.getValue();
    const request$: Observable<IPost> = editId === null
      ? this.postService.createPost(post)
      : this.postService.updatePost(editId, post);

    this.saving = true;
    request$.subscribe({
      next: () => {
        this.saving = false;
        this.postService.pushUpdates();
        if (editId === null) {
          this.postFormService.resetForm();
        }
      },
      error: () => {
        this.saving = false;
      }
    });
  }
}