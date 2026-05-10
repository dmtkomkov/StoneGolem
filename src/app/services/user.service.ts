import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../static/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  getUsersAsync(): Observable<IUser[]> {
    return this.http.get<IUser[]>('user');
  }

  getCurrentUserAsync(): Observable<IUser> {
    return this.http.get<IUser>('user/me');
  }
}
