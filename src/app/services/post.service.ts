import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ICreatePost, IPagedPost, IPost } from '../static/models/post';
import { EPostParam } from '../static/types/params';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);

  private updates$: Subject<void> = new Subject();

  getPosts(showPosts: EPostParam, pageNumber: number, pageSize: number): Observable<IPagedPost> {
    const params = new HttpParams({fromObject: {showPosts, pageNumber, pageSize}});
    return this.http.get<IPagedPost>('post', {params});
  }

  getPost(id: number): Observable<IPost> {
    return this.http.get<IPost>('post/' + id);
  }

  createPost(post: ICreatePost): Observable<IPost> {
    return this.http.post<IPost>('post', post);
  }

  updatePost(id: number, post: ICreatePost): Observable<IPost> {
    return this.http.put<IPost>('post/' + id, post);
  }

  togglePost(id: number): Observable<IPost> {
    return this.http.put<IPost>('post/toggle/' + id, null);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>('post/' + id);
  }

  getUpdates(): Subject<void> {
    return this.updates$;
  }

  pushUpdates(): void {
    this.updates$.next();
  }
}