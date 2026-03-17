import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/auth/refresh-token')) {
      return next.handle(req);
    }

    const token = this.authService.getToken();
    let authReq = req;
    if (token) {
      authReq = this.addToken(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (!token) {
      //console.error('❌ Tentative d\'ajout d\'un token undefined');
      return request; // ou lancer une erreur
    }
    const authReq = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
    //console.log(`🔑 Ajout token à ${request.url}: Bearer ${token.substring(0, 15)}...`);
    return authReq;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isRefreshing) {
      // Une autre requête est déjà en train de rafraîchir le token
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          //console.log('✅ Reprise de la requête en attente:', request.url);
          return next.handle(this.addToken(request, token!));
        })
      );
    }

    // Démarrage du refresh
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);
    console.log('🔄 Début du refresh token');

    return this.authService.refreshToken().pipe(
      switchMap(newToken => {
        // newToken est une string (le nouveau token)
        //console.log('✅ Nouveau token obtenu:', newToken.substring(0, 15) + '...');
        this.refreshTokenSubject.next(newToken);
        // Réessayer la requête originale avec le nouveau token
        return next.handle(this.addToken(request, newToken));
      }),
      catchError(error => {
        //console.error('❌ Échec du refresh token', error);
        this.isRefreshing = false;
        this.refreshTokenSubject.next(null);
        this.authService.logout(); // déconnexion en cas d'échec
        return throwError(() => error);
      }),
      finalize(() => {
        this.isRefreshing = false;
      })
    );
  }

}