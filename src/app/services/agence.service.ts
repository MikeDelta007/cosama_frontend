import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgenceCreate } from '../model/Agence';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { config } from '../config/api.config';
import { Agence } from '../model/Agence.model';
import { Ville } from '../model/Ville.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

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

  public getAgences(): Observable<Agence> 
  {
    return this.http.get<Agence>
    (
      `${config.apiBaseUrl}/parametrage/agences`,{ headers: this.headers }
    );
  }

  public getVilles(): Observable<Ville> 
  {
    return this.http.get<Ville>
    (
      `${config.apiBaseUrl}/parametrage/villes`,{ headers: this.headers }
    );
  }

  createAgence(agence: Agence): Observable<Agence> 
  {
    return this.http.post<Agence>(`${config.apiBaseUrl}/parametrage/createAgences`, agence, { headers: this.headers }).pipe(
      tap(response => console.log('Agence créée avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de la création', error);
        return throwError(error);
      })
    );
  }

  public updateAgence(agenceDTO:Agence): Observable<Agence> 
  {
    // Envoyer la requête PUT
    return this.http.put<Agence>(`${config.apiBaseUrl}/parametrage/updateAgences/${agenceDTO.agc_id}`, agenceDTO, { headers: this.headers }).pipe(
      tap(response => console.log('Agence mise à jour avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de l\'ajout du bateau', error);
        return throwError(error);
      })
    );
  }

}
