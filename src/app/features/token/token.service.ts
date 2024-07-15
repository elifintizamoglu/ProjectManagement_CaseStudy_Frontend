import { isPlatformBrowser } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token(): string {
    return localStorage.getItem('token') as string;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') !== null;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isTokenValid(): boolean {
    const token = this.token;
    if (!token) {
      return false;
    }
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }


  getUserEmail(): string | null {
    const token = this.token;
    if (!token) {
      console.error('No token found.');
      return null;
    }

    const jwtHelper = new JwtHelperService();
    try {
      const decodedToken = jwtHelper.decodeToken(token);
      if (decodedToken && decodedToken.sub) {
        return decodedToken.sub;
      } else {
        console.error('Token does not contain user email.');
        return null;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

}
