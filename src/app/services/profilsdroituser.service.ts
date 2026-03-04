import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profil } from '../model/Profil.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { config } from '../config/api.config';
import { Utilisateur } from '../model/Utilisateur.model';
import { ResetPassword } from '../model/ResetPassword.model';
import { UtilisateurBis } from '../model/Utilisateur_.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilsdroituserService {

  public token: string | null = null;
  public headers: HttpHeaders | null = null;

  constructor(private readonly http: HttpClient) {
    // Initialisation du token depuis sessionStorage
    this.initializeHeaders();
  }

  // Méthode pour initialiser les headers
  private initializeHeaders() {
    this.token = sessionStorage.getItem('token');

    if (!this.token) {
      throw new Error('Token non disponible'); // Vous pouvez gérer cela autrement si besoin
    }

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }
  
  public getProfils(): Observable<Profil> 
  {
    return this.http.get<Profil>(
      `${config.apiBaseUrl}/parametrage/profils`,{ headers: this.headers }
    );
  }

  public getUsers(): Observable<Utilisateur> 
  {
    return this.http.get<Utilisateur>(
      `${config.apiBaseUrl}/parametrage/users`,{ headers: this.headers }
    );
  }

  public updateProfil(idPrfl: number, profilDTO : any)
    {
      const url = `${config.apiBaseUrl}/parametrage/updateProfil`;
      const params = new HttpParams()
        .set('pfrId', idPrfl);
  
      return this.http.put<any>(url, profilDTO, { headers : this.headers, params }).pipe(
        tap(response => console.log('Profil updated successfully', response)),
        catchError(error => {
          console.error('Error updating profil', error);
          return throwError(error);
        })
      );
    }

  public createProfil(profil: Profil): Observable<Profil> {
      return this.http.post<Profil>(`${config.apiBaseUrl}/parametrage/createProfil`, profil, { headers : this.headers }).pipe(
        tap(response => console.log('Profil créé avec succès', response)),
        catchError(error => {
          console.error('Erreur lors de la création du profil', error);
          return throwError(error);
        })
      );
    }

    public createUser(user: Utilisateur): Observable<Utilisateur> {
      return this.http.post<Utilisateur>(`${config.apiBaseUrl}/parametrage/signup`, user, { headers : this.headers }).pipe(
        tap(response => console.log('User créé avec succès', response)),
        catchError(error => {
          console.error('Erreur lors de la création du user', error);
          return throwError(error);
        })
      );
    }

    public updateUser(idUsr: number, userDTO : Utilisateur)
    {
      const url = `${config.apiBaseUrl}/parametrage/update-user`;
      const params = new HttpParams()
        .set('usrId', idUsr);
  
      return this.http.put<Utilisateur>(url, userDTO, { headers : this.headers, params }).pipe(
        tap(response => console.log('User updated successfully', response)),
        catchError(error => {
          console.error('Error updating user', error);
          return throwError(error);
        })
      );
    }

    public resetPassword(idUsr: number, rsPassword : ResetPassword)
    {
      const url = `${config.apiBaseUrl}/parametrage/update-password`;
      const params = new HttpParams()
        .set('usrId', idUsr);
  
      return this.http.put<ResetPassword>(url, rsPassword, { headers : this.headers, params }).pipe(
        tap(response => console.log('Password reset successfully', response)),
        catchError(error => {
          console.error('Error updating user', error);
          return throwError(error);
        })
      );
    }

    public updateEtatUser(idUsr: number, userDTO : UtilisateurBis)
    {
      const url = `${config.apiBaseUrl}/parametrage/updateEtat-user`;
      const params = new HttpParams()
        .set('usrId', idUsr);
  
      return this.http.put<UtilisateurBis>(url, userDTO, { headers : this.headers, params }).pipe(
        tap(response => console.log('Etat user updated successfully', response)),
        catchError(error => {
          console.error('Error updating user', error);
          return throwError(error);
        })
      );
    }


    public updateEtatUser_(idUsr: number, userDTO : Utilisateur)
    {
      const url = `${config.apiBaseUrl}/parametrage/updateEtat-user`;
      const params = new HttpParams()
        .set('usrId', idUsr);
  
      return this.http.put<Utilisateur>(url, userDTO, { headers : this.headers, params }).pipe(
        tap(response => console.log('Etat user updated successfully', response)),
        catchError(error => {
          console.error('Error updating user', error);
          return throwError(error);
        })
      );
    }

    public updateEtatProfil(idUsr: number, profilDTO : Profil)
    {
      const url = `${config.apiBaseUrl}/parametrage/updateEtat-profil`;
      const params = new HttpParams()
        .set('usrId', idUsr);
  
      return this.http.put<Profil>(url, profilDTO, { headers : this.headers, params }).pipe(
        tap(response => console.log('Etat profil updated successfully', response)),
        catchError(error => {
          console.error('Error updating user', error);
          return throwError(error);
        })
      );
    }

    getMyProfile(id: number): Observable<Utilisateur> {
      return this.http.get<Utilisateur>(
        `${config.apiBaseUrl}/parametrage/me`,
        { params: { id } }
      );
    }

    updateMyProfile(id: number, user: Utilisateur): Observable<Utilisateur> {
      return this.http.put<Utilisateur>(
        `${config.apiBaseUrl}/parametrage/me`,
        user,
        { params: { id } }
      );
    }

    changePassword(id: number, dto: { oldPassword: string, newPassword: string }): Observable<any> {
      // On utilise HttpParams pour passer l'id correctement en query string
      const params = new HttpParams().set('id', id.toString());

      return this.http.put<any>(
        `${config.apiBaseUrl}/parametrage/me/change-password`,
        dto,
        { params } // ici id sera passé comme ?id=xxx
      );
    }
}