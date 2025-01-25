import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITokens, TokenService } from './token.service';

export interface ICredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

  login(username: string, password: string): Observable<ITokens> {
    const payload: ICredentials = { username, password };
    return this.http.post<ITokens>('auth/login', payload);
  }

  refresh(): Observable<ITokens> {
    return this.http.post<ITokens>('auth/refresh', {
      token: this.tokenService.getToken(),
      refreshToken: this.tokenService.getRefreshToken(),
    });
  }
}
