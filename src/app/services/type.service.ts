import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { config } from '../config/api.config';
import { Unite } from '../model/Unite.model';
import { Bagage } from '../model/Bagages.model';
import { Niveau } from '../model/Niveau.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

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

  public getUnites(): Observable<Unite> 
  {
    //const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa('root:1234')});
    return this.http.get<any>(
      `${config.apiBaseUrl}/parametrage/unites`,{ headers: this.headers }
    );
  }

  public getVolumes(): Observable<any> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/parametrage/volumes`,{ headers: this.headers }
    );
  }

  createUnite(unite: Unite): Observable<Unite> {
    /**
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('root:1234') // Adjust the authorization as needed
    });
    */

    return this.http.post<Unite>(`${config.apiBaseUrl}/parametrage/createUnite`, unite, {  headers: this.headers }).pipe(
      tap(response => console.log('Unité créée avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de la création du critère', error);
        return throwError(error);
      })
    );
  }

  public updateUnite(uniteDTO:Unite): Observable<Unite> 
  {
    // Envoyer la requête POST
    return this.http.put<Unite>(`${config.apiBaseUrl}/parametrage/updateUnite/${uniteDTO.unite_id}`, uniteDTO, { headers: this.headers }).pipe(
      tap(response => console.log('Unite mise à jour avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de l\'ajout du bateau', error);
        return throwError(error);
      })
    );
  }

  createBagage(bagage: Bagage): Observable<Bagage> {

    return this.http.post<Bagage>(`${config.apiBaseUrl}/parametrage/createTypeBagage`, bagage, { headers: this.headers }).pipe(
      tap(response => console.log('Type de bagage créé avec succès', response)),
      catchError(error => {
        console.error('Erreur serveur', error);
        return throwError(error);
      })
    );
  }

  createNiveau(niveau: Niveau): Observable<Niveau> {

    return this.http.post<Niveau>(`${config.apiBaseUrl}/parametrage/createNiveau`, niveau, { headers: this.headers }).pipe(
      tap(response => console.log('Type de bagage créé avec succès', response)),
      catchError(error => {
        console.error('Erreur serveur', error);
        return throwError(error);
      })
    );
  }

  public getBagages(): Observable<any> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/parametrage/typeBagages`,{ headers: this.headers }
    );
  }

  public getNiveaux(): Observable<any> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/parametrage/niveaux`,{ headers: this.headers }
    );
  }

  public updateBagage(typeBagageDTO:Bagage): Observable<Bagage> 
  {
  
    // Envoyer la requête POST
    return this.http.put<Bagage>(`${config.apiBaseUrl}/parametrage/updateTypeBagage/${typeBagageDTO.tbg_id}`, typeBagageDTO, { headers: this.headers }).pipe(
      tap(response => console.log('Unite mise à jour avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de l\'ajout du bateau', error);
        return throwError(error);
      })
    );
  }

  updateNiveau(niveau:Niveau): Observable<Niveau> 
  {
    // Envoyer la requête POST
    return this.http.put<Niveau>(`${config.apiBaseUrl}/parametrage/updateNiveau/${niveau.niv_id}`, niveau, { headers: this.headers }).pipe(
      tap(response => console.log('Niveau mis à jour avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de l\'ajout du bateau', error);
        return throwError(error);
      })
    );
  }

}
