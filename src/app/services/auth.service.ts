import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { ICredentialsDto, ITokensDto } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

  login(username: string, password: string): Observable<ITokensDto> {
    const payload: ICredentialsDto = { username, password };
    return this.http.post<ITokensDto>('auth/login', payload);
  }

  refresh(): Observable<ITokensDto> {
    return this.http.post<ITokensDto>('auth/refresh', {
      token: this.tokenService.getToken(),
      refreshToken: this.tokenService.getRefreshToken(),
    });
  }
}
