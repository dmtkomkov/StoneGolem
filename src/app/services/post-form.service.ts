import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ICreatePost, IPost } from '../static/models/post';

export const POST_TITLE_MAX_LENGTH = 255;

// The API rejects empty and whitespace-only strings
export function notBlankValidator(control: AbstractControl<string>): ValidationErrors | null {
  return control.value.trim().length > 0 ? null : { blank: true };
}

export interface PostForm {
  title: FormControl<string>;
  body: FormControl<string>;
}

@Injectable()
export class PostFormService {
  private formBuilder = inject(FormBuilder);

  private readonly postForm: FormGroup<PostForm>;
  private editId: number | null = null;

  constructor() {
    this.postForm = this.formBuilder.nonNullable.group({
      title: ['', [notBlankValidator, Validators.maxLength(POST_TITLE_MAX_LENGTH)]],
      body: ['', [notBlankValidator]],
    });
  }

  getForm(): FormGroup<PostForm> {
    return this.postForm;
  }

  // Id of the post being edited, or null when the form creates a new post
  getEditId(): number | null {
    return this.editId;
  }

  setCreateMode() {
    this.editId = null;
    this.postForm.reset();
  }

  setEditMode(post: IPost) {
    this.editId = post.id;
    this.postForm.reset({
      title: post.title,
      body: post.body,
    });
  }

  getValue(): ICreatePost {
    const formValue = this.postForm.getRawValue();

    return {
      title: formValue.title.trim(),
      body: formValue.body,
    };
  }

  resetForm() {
    this.postForm.reset();
  }
}