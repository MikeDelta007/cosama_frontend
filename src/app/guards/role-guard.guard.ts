import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Récupérer l'utilisateur depuis sessionStorage
    const userString = sessionStorage.getItem('user');
    
    if (!userString) {
      console.warn('Aucun utilisateur trouvé, redirection vers login.');
      this.router.navigate(['/se-connecter']);
      return false;
    }

    const user = JSON.parse(userString);

    if (!user || !user.profil) {
      console.warn('Utilisateur non valide ou profil manquant, redirection vers login.');
      this.router.navigate(['/se-connecter']);
      return false;
    }

    // Récupérer les permissions dynamiquement du profil
    const userPermissions = this.getPermissionsFromProfile(user.profil);

    // Vérifier les permissions dynamiquement
    const permissionsToCheck = next.data['permissions']; // Permissions passées dans les données de la route
    if (permissionsToCheck && !this.checkPermissions(userPermissions, permissionsToCheck)) {
      console.warn('Utilisateur sans permission, redirection vers login.');
      this.router.navigate(['/se-connecter']);
      sessionStorage.removeItem('token');
      return false;
    }

    return true;
  }

  // Fonction pour extraire les permissions dynamiquement du profil de l'utilisateur
  private getPermissionsFromProfile(profil: any): string[] {
    // Retourne toutes les clés des permissions (en supposant qu'elles soient booléennes dans le profil)
    return Object.keys(profil).filter(key => typeof profil[key] === 'boolean' && profil[key]);
  }

  // Fonction pour vérifier si l'utilisateur a toutes les permissions requises
  private checkPermissions(userPermissions: string[], permissions: string[]): boolean {
    // Vérifie si toutes les permissions demandées sont présentes dans les permissions de l'utilisateur
    return permissions.every(permission => userPermissions.includes(permission));
  }
}
