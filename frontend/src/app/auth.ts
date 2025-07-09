import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3000/users';
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(this.apiUrl, { email, password });
  }

  setToken(token: string) {
    localStorage.setItem('jwtToken', token);
    const expiresIn = 15 * 60 * 1000;
    this.autoLogout(expiresIn);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  logout() {
    localStorage.removeItem('jwtToken');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.router.navigate(['/']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      alert('Session expired. You have been logged out.');
      this.logout();
    }, expirationDuration);
  }
}
