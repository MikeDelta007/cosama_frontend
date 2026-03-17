import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { config } from '../config/api.config';
import { TypePlace } from '../model/TypePlace.model';
import { Place } from '../model/Place.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

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
  
  public getPlaces(): Observable<Place> 
  {
    return this.http.get<Place>(
      `${config.apiBaseUrl}/parametrage/places`,{ headers: this.headers }
    );
  }

  public getTypePlaces(): Observable<any> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/parametrage/typePlaces`,{ headers: this.headers }
    );
  }

  public getNiveaux(): Observable<any> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/parametrage/niveaux`,{ headers: this.headers }
    );
  }

  public getBateaux(): Observable<any> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/parametrage/bateau`,{ headers: this.headers }
    );
  }

  createPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(`${config.apiBaseUrl}/parametrage/createPlace`, place, { headers: this.headers }).pipe(
      tap(response => console.log('Place créée avec succès', response)),
      catchError(error => {
        console.error('Erreur serveur', error);
        return throwError(error);
      })
    );
  }

  public updatePlace(place:Place): Observable<Place> 
  {
  
    // Envoyer la requête POST
    return this.http.put<Place>(`${config.apiBaseUrl}/parametrage/updatePlace/${place.plc_id}`, place, { headers: this.headers }).pipe(
      tap(response => console.log('Place mise à jour avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de l\'ajout du bateau', error);
        return throwError(error);
      })
    );
  }

  public getAvailablePlaces(tplcId: number, voyId: number, batId: number): Observable<Place[]> {
    const params = new HttpParams()
      .set('tplcId', tplcId)
      .set('voyId', voyId)
      .set('batId', batId);
  
    return this.http.get<Place[]>(
      `${config.apiBaseUrl}/parametrage/availablePlace`, { headers: this.headers, params: params }
    );
  }

  public getReservedPlace(tplcId: number, voyId: number, batId: number): Observable<Place[]> {
    const params = new HttpParams()
      .set('tplcId', tplcId)
      .set('voyId', voyId)
      .set('batId', batId);
  
    return this.http.get<Place[]>(
      `${config.apiBaseUrl}/parametrage/reservedPlace`, { headers: this.headers, params: params }
    );
  }

  public libererPlace(plcId: number, voyId: number, batId: number) {  
    // Construire l'URL avec les paramètres dans la chaîne de requête
    const url = `${config.apiBaseUrl}/parametrage/libererPlace?plcId=${plcId}&voyId=${voyId}&batId=${batId}`;
  
    // Envoyer la requête DELETE
    return this.http.delete(url, { headers: this.headers })
      .subscribe(
        response => {
          console.log('Place libérée avec succès');
        },
        error => {
          console.error('Erreur lors de la libération de la place', error);
        }
      );
  }

  public doReservation(plcId: number, voyId: number, batId: number): Observable<any> {
    const params = new HttpParams()
      .set('plcId', plcId.toString())
      .set('voyId', voyId.toString())
      .set('batId', batId.toString());
  
    console.log(params);
    return this.http.post<any>(
      `${config.apiBaseUrl}/parametrage/doReservation`, null, { headers: this.headers, params: params }).pipe(
      tap(response => console.log('Réservation effectuée avec succès', response)),
      catchError(error => {
        console.error('Erreur serveur', error);
        return throwError(error);
      })
    );
  }
  
}
