import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { config } from '../config/api.config';
import { Critere } from '../model/Critere.model';
import { Categorie } from '../model/Categorie.model';
import { TypePlace } from '../model/TypePlace';
import { TypeBagage } from '../model/TypeBagage';
import { TypeBagageCreate } from '../model/TypeBago';
import { CategoriePlace } from '../model/CategoriePlace.model';
import { CategorieBagage } from '../model/CategorieBagage.model';
import { GroupeCritere } from '../model/GroupeCrt.model';

@Injectable({
  providedIn: 'root'
})
export class TarificationService {

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

  createCritere(critere: Critere): Observable<Critere> {
    return this.http.post<Critere>(`${config.apiBaseUrl}/parametrage/createCritere`, critere, { headers : this.headers }).pipe(
      tap(response => console.log('Critère créé avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de la création du critère', error);
        return throwError(error);
      })
    );
  }

  updateCritere(id:number, critere: Critere): Observable<Critere> {

    return this.http.put<Critere>(`${config.apiBaseUrl}/parametrage/updateCriteres/${id}`, critere, { headers : this.headers }).pipe(
      tap(response => console.log('Critère mis à jour avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de la mise à jour du critère', error);
        return throwError(error);
      })
    );
  }

  
  deleteCritere(id:number)
  {

    return this.http.delete(`${config.apiBaseUrl}/parametrage/deleteCritere/${id}`, { headers : this.headers }).pipe(
      tap(response => console.log('Critère éffacé avec succès')),
      catchError(error => {
        console.error('Erreur lors de la suppession du critère', error);
        return throwError(error);
      })
    );
  }

  public getCriteres(): Observable<Critere> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/parametrage/criteres`,{ headers: this.headers }
    );
  }

  public getTarifs(): Observable<any> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/parametrage/tarifs`,{ headers: this.headers }
    );
  }

  public getTypePlaces(): Observable<TypePlace> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/parametrage/typePlaces`,{ headers: this.headers }
    );
  }

  public getTypeBagages(): Observable<TypeBagageCreate> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/parametrage/typeBagages`,{ headers: this.headers }
    );
  }

  createCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(`${config.apiBaseUrl}/parametrage/createCategoriePlace`, categorie, { headers : this.headers }).pipe(
      tap(response => console.log('Tarif place créé avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de la création du critère', error);
        return throwError(error);
      })
    );
  }

  createCategorieBagage(categorie: Categorie): Observable<Categorie> {

    return this.http.post<Categorie>(`${config.apiBaseUrl}/parametrage/createCategorieBagage`, categorie, { headers : this.headers }).pipe(
      tap(response => console.log('Tarif bagage créé avec succès', response)),
      catchError(error => {
        console.error('Erreur serveur', error);
        return throwError(error);
      })
    );
  }

  updateCatPlace(categorie:CategoriePlace): Observable<CategoriePlace> 
  {
  
    // Envoyer la requête POST
    return this.http.put<CategoriePlace>(`${config.apiBaseUrl}/parametrage/updateCategoriePlace/${categorie.cat_id}`, categorie, { headers : this.headers }).pipe(
      tap(response => console.log('Tarif place mis à jour avec succès', response)),
      catchError(error => {
        console.error('Erreur serveur', error);
        return throwError(error);
      })
    );
  }

  updateCatBagage(categorie:CategorieBagage): Observable<CategorieBagage> 
  {
  
    // Envoyer la requête POST
    return this.http.put<CategorieBagage>(`${config.apiBaseUrl}/parametrage/updateCategorieBagage/${categorie.cat_id}`, categorie, { headers : this.headers }).pipe(
      tap(response => console.log('Tarif place mis à jour avec succès', response)),
      catchError(error => {
        console.error('Erreur serveur', error);
        return throwError(error);
      })
    );
  }

  createGroupeCritere(groupeCritere: GroupeCritere): Observable<GroupeCritere> {
    return this.http.post<GroupeCritere>(`${config.apiBaseUrl}/parametrage/createGroupeCritere`, groupeCritere, { headers : this.headers }).pipe(
      tap(response => console.log('Groupe critere créé avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de la création du groupe de critere', error);
        return throwError(error);
      })
    );
  }

  updateGrpCritere(groupeCritere : GroupeCritere): Observable<GroupeCritere> 
  {
    // Envoyer la requête POST
    return this.http.put<GroupeCritere>(`${config.apiBaseUrl}/parametrage/updateGroupeCritere/${groupeCritere.grpcrt_id}`, groupeCritere, { headers : this.headers }).pipe(
      tap(response => console.log('Groupe de critere mis à jour avec succès', response)),
      catchError(error => {
        console.error('Erreur serveur', error);
        return throwError(error);
      })
    );
  }

  public getGroupeCritere(): Observable<GroupeCritere> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/parametrage/groupesCriteres`,{ headers: this.headers }
    );
  }

  

}
