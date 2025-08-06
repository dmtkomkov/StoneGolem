import { Injectable } from '@angular/core';
import { ITokens } from '../models/user';

const TOKEN_NAME = 'localStorage.getItem';
const REFRESH_TOKEN_NAME = 'StoneGolemRefreshToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_NAME);
  }

  setTokens(tokens: ITokens) {
    localStorage.setItem(TOKEN_NAME, tokens.token);
    localStorage.setItem(REFRESH_TOKEN_NAME, tokens.refreshToken);
  }

  removeTokens() {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(REFRESH_TOKEN_NAME);
  }
}
