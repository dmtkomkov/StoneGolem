import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSignal = signal<IUser[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  loadUsers(): void {
    this.http.get<IUser[]>('user').subscribe({
      next: (data: IUser[]) => this.usersSignal.set(data),
    });
  }

  getUsers(): Signal<IUser[]> {
    return this.usersSignal.asReadonly();
  }
}
