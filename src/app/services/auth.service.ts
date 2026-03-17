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
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public getToken(): string | null 
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
        //console.log('🔐 Login response:', response);
        if (response.token && response.refreshToken && response.user) {
          this.saveTokens(response.token, response.refreshToken, response.user);
        }
      }),
      catchError((error) => throwError(() => error))
    );
  }

  refreshToken(): Observable<string> {
    const refreshToken = this.getRefreshToken();

    //console.log('🔄 Tentative de refresh token...');
    //console.log('📦 Refresh token stocké:', refreshToken ? `${refreshToken.substring(0, 20)}...` : 'null');

    if (!refreshToken || refreshToken.trim() === '') {
      //console.error('🚫 Aucun refresh token disponible');
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    const body = { token: refreshToken }; // ou refreshToken selon votre DTO

    return this.http.post<any>(this.refreshUrl, body).pipe(
      tap(response => console.log('✅ Réponse refresh reçue:', response)),
      map(response => {
        // Essayer plusieurs formats possibles
        let newAccessToken = null;
        if (typeof response === 'string') {
          newAccessToken = response; // la réponse est directement le token
        } else if (response?.token) {
          newAccessToken = response.token;
        } else if (response?.accessToken) {
          newAccessToken = response.accessToken;
        } else {
          //console.error('❌ Format de réponse inattendu:', response);
          throw new Error('Nouveau token non reçu');
        }

        if (!newAccessToken) {
          throw new Error('Nouveau token non reçu');
        }

        sessionStorage.setItem('token', newAccessToken);

        // Si un nouveau refresh token est fourni (rotation)
        if (response?.refreshToken) {
          sessionStorage.setItem('refreshToken', response.refreshToken);
        }

        this.tokenSubject.next(newAccessToken);
        //console.log('✅ Nouveau token sauvegardé:', newAccessToken.substring(0, 20) + '...');
        return newAccessToken;
      }),
      catchError(err => {
        console.error('❌ Erreur refresh token:', err);
        if (err.status === 401 || err.status === 403) {
          console.log('🔐 Refresh token invalide, déconnexion...');
          this.logout();
        }
        return throwError(() => err);
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


