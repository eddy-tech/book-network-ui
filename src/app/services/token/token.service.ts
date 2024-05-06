import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token(): string {
    return localStorage.getItem('token') as string;
  }

  isTokenNotValid(): boolean {
    return !this.isTokenValid();
  }

  isTokenValid(): boolean {
    const token = this.token;
    if(!token) {
      return false;
    }
    //decode the token
    const jwtHelper = new JwtHelperService();
    //check expiration date
    const isTokenExpired = jwtHelper.getTokenExpirationDate(token);
    if(isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }
}
