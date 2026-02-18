import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshingToken = false;
  private readonly refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private readonly authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && localStorage.getItem('refreshToken')) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response) => {
          const newAccessToken = response; // ou response.accessToken selon ton backend
          localStorage.setItem('token', newAccessToken);
          this.isRefreshingToken = false;
          this.refreshTokenSubject.next(newAccessToken);

          return next.handle(
            request.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            })
          );
        }),
        catchError((err) => {
          this.isRefreshingToken = false;
          this.authService.logout();
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) =>
          next.handle(
            request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        )
      );
    }
  }
}
