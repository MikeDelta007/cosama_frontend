// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, tap, catchError, throwError, map } from 'rxjs';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService 
// {
//   private readonly apiUrl = `http://localhost:8081/artim/api/v1/auth/sign-In`; // URL d'authentification
//   private readonly refreshUrl = `http://localhost:8081/artim/api/v1/auth/refresh-token`; // URL pour rafraîchir le token

//   private readonly tokenSubject = new BehaviorSubject<any>(null); // Gestion des tokens
//   public token$ = this.tokenSubject.asObservable();

//   public User: Object;

//   constructor(private readonly http: HttpClient, private readonly router: Router) {}

//   saveTokens(token: string, refreshToken: string): void {
//     sessionStorage.setItem('token', token);
//     sessionStorage.setItem('refreshToken', refreshToken);
//   }

//   // Authentification et stockage des tokens
//   login(credentials: { login: string; password: string }): Observable<any> 
//   {
//     return this.http.post(this.apiUrl, credentials).pipe(
//       tap((response: any) => {
//         if (response.token && response.refreshToken) {
//           // Stocker les tokens dans le sessionStorage
//           sessionStorage.setItem('token', response.token);
//           sessionStorage.setItem('refreshToken', response.refreshToken);
//           this.tokenSubject.next(response);
//         }
//       })
//     );
//   }

//   // Rafraîchir le token d'accès
//   refreshToken(): Observable<string> 
//   {
//     const refreshToken = sessionStorage.getItem('refreshToken');
//     return this.http.post<any>(this.refreshUrl, { refreshToken }).pipe(
//       tap((response) => {
//         const newAccessToken = response.token;
//         sessionStorage.setItem('token', newAccessToken); // Met à jour le token
//         return newAccessToken;
//       })
//     );
//   }

//   // Déconnexion
//   logout(): void 
//   {
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem('refreshToken');
//     this.tokenSubject.next(null);
//     this.router.navigate(['/login']); // Redirigez vers la page de connexion
//   }

//   // Vérification si l'utilisateur est authentifié
//   isAuthenticated(): boolean {
//     return !!sessionStorage.getItem('token');
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError, map } from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `http://localhost:8081/artim/api/v1/auth/sign-In`;
  private readonly refreshUrl = `http://localhost:8081/artim/api/v1/auth/refresh-token`;

  private readonly tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  public token$ = this.tokenSubject.asObservable();

  constructor(private readonly http: HttpClient, private readonly router: Router) {}

  private getToken(): string | null 
  {
    return sessionStorage.getItem('token');
  }

  private getRefreshToken(): string | null 
  {
    return sessionStorage.getItem('refreshToken');
  }

  getUserFromToken(token: string): any 
  {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Erreur de décodage du token:', error);
      return null;
    }
  }

  saveTokens(token: string, refreshToken: string, user: any): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('user', JSON.stringify(user)); // Stocker l'utilisateur
    this.tokenSubject.next(token);
  }

  login(credentials: { login: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap((response) => {
        if (response.token && response.refreshToken && response.user) {
          this.saveTokens(response.token, response.refreshToken, response.user);
        }
      }),
      catchError((error) => throwError(() => error))
    );
  }

  refreshToken(): Observable<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<{ token: string }>(this.refreshUrl, { refreshToken }).pipe(
      map((response) => {
        const newAccessToken = response.token;
        sessionStorage.setItem('token', newAccessToken);
        console.log(newAccessToken);
        this.tokenSubject.next(newAccessToken);
        return newAccessToken;
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('user');
    this.tokenSubject.next(null);
    this.router.navigate(['/se-connecter']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUser(): any {
    const userData = sessionStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}


