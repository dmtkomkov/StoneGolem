import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  getUsersAsync(): Observable<IUser[]> {
    return this.http.get<IUser[]>('user');
  }

  getCurrentUserAsync(): Observable<IUser> {
    return this.http.get<IUser>('user/me');
  }
}
