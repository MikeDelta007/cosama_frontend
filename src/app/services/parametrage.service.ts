import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypePiece } from '../model/TypePiece.model';
import { config } from '../config/api.config';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Place } from '../model/Place';
import { Ville } from '../model/Ville.model';
import { SMS } from '../model/SMS.model';

@Injectable({
  providedIn: 'root'
})
export class ParametrageService {

  public token: string | null = null;
  public headers: HttpHeaders | null = null;
  
    constructor(private http: HttpClient) {
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

    createPiece(type_piece: TypePiece): Observable<TypePiece> {
        return this.http.post<TypePiece>(`${config.apiBaseUrl}/parametrage/createTypePiece`, type_piece, { headers: this.headers }).pipe(
          tap(response => console.log('Type piece créé avec succès', response)),
          catchError(error => {
            console.error('Erreur serveur', error);
            return throwError(error);
          })
        );
    }

    public getTypePieces(): Observable<TypePiece> 
      {
        return this.http.get<TypePiece>(
          `${config.apiBaseUrl}/parametrage/typePieces`,{ headers: this.headers }
        );
    }

    public updateTypePiece(type_piece: TypePiece): Observable<TypePiece> 
      {
      
        // Envoyer la requête POST
        return this.http.put<TypePiece>(`${config.apiBaseUrl}/parametrage/updateTypePiece/${type_piece.tpiece_id}`, type_piece, { headers: this.headers }).pipe(
          tap(response => console.log('Type piece mis à jour avec succès', response)),
          catchError(error => {
            console.error('Erreur serveur', error);
            return throwError(error);
          })
        );
    }

    createVille(ville: Ville): Observable<Ville> {
      return this.http.post<Ville>(`${config.apiBaseUrl}/parametrage/createVilles`, ville, { headers: this.headers }).pipe(
        tap(response => console.log('Ville crééz avec succès', response)),
        catchError(error => {
          console.error('Erreur serveur', error);
          return throwError(error);
        })
      );
    }

    public getVilles(): Observable<Ville>
      {
        return this.http.get<Ville>(
          `${config.apiBaseUrl}/parametrage/villes`,{ headers: this.headers }
        );
    }

    public updateVille(ville: Ville): Observable<Ville> 
      {
      
        // Envoyer la requête POST
        return this.http.put<Ville>(`${config.apiBaseUrl}/parametrage/updateVille/${ville.vil_id}`, ville, { headers: this.headers }).pipe(
          tap(response => console.log('Ville mise à jour avec succès', response)),
          catchError(error => {
            console.error('Erreur serveur', error);
            return throwError(error);
          })
        );
    }

    public sendSMS(token: string, sms: SMS): Observable<number> {

      // Ajout du paramètre typePlace aux paramètres de la requête
      const params = new HttpParams()
        .set('token', token);

      // Envoi de la requête HTTP GET avec les paramètres et retour d'un Observable
      return this.http.post<number>(`${config.apiBaseUrl}/sms/send`, sms, { headers: this.headers, params : params  }).pipe(
        tap(response => console.log('SMS envoyé avec succès', response)),
        catchError(error => {
          console.error('Erreur lors de l\'envoi du SMS', error);
          return throwError(error);
        })
      );
    }
    
}
