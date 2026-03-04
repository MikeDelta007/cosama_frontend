import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IdleService implements OnDestroy {
  private timeout: any;
  private readonly idleTime = 2 * 60 * 1000; // 5 minutes en millisecondes
  private events: string[] = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
  private listener = () => this.resetTimer();

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private authService: AuthService
  ) {}

  startWatching() {
    if (!this.authService.isAuthenticated()) {
      return;
    }
    // Exécuter en dehors de la zone Angular pour éviter de déclencher des détections inutiles
    this.ngZone.runOutsideAngular(() => {
      this.events.forEach(event => {
        window.addEventListener(event, this.listener);
      });
    });
    this.resetTimer();
  }

  stopWatching() {
    this.ngZone.runOutsideAngular(() => {
      this.events.forEach(event => {
        window.removeEventListener(event, this.listener);
      });
    });
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  private resetTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => this.logout(), this.idleTime);
  }

  private logout() {
    // Revenir dans la zone Angular pour que les changements soient détectés
    this.ngZone.run(() => {
      this.authService.logout();
      this.router.navigate(['/se-connecter']);
    });
  }

  ngOnDestroy() {
    this.stopWatching();
  }
}