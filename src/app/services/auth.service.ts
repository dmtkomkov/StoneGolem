import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.http.post<any>('auth/login', payload);
  }

  refresh(): Observable<any> {
    return this.http.post<any>('auth/refresh', {
      token: localStorage.getItem('StoneGolemToken'),
      refreshToken: localStorage.getItem('StoneGolemRefreshToken'),
    });
  }
}
