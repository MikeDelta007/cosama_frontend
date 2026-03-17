import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { config } from '../config/api.config';
import { Place } from '../model/Place.model';

@Injectable({
  providedIn: 'root'
})
export class DeblocageplaceService {

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
      `${config.apiBaseUrl}/chefDeGare/places`,{ headers: this.headers }
    );
  }

  public getTypePlaces(): Observable<any> 
  {
  
    return this.http.get<any>(
      `${config.apiBaseUrl}/chefDeGare/typePlaces`,{ headers: this.headers }
    );
  }

  public getBateaux(): Observable<any> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/chefDeGare/bateau`,{ headers: this.headers }
    );
  }

  public getVoyages(): Observable<any> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/chefDeGare/voyages`,{ headers: this.headers }
    );
  }

  public getAvailablePlaces(tplcId: number, voyId: number, batId: number): Observable<Place[]> {
    const params = new HttpParams()
      .set('tplcId', tplcId)
      .set('voyId', voyId)
      .set('batId', batId);
  
    return this.http.get<Place[]>(
      `${config.apiBaseUrl}/chefDeGare/availablePlace`, { headers: this.headers, params: params }
    );
  }

  public getReservedPlace(tplcId: number, voyId: number, batId: number): Observable<Place[]> {
    const params = new HttpParams()
      .set('tplcId', tplcId)
      .set('voyId', voyId)
      .set('batId', batId);
  
    return this.http.get<Place[]>(
      `${config.apiBaseUrl}/chefDeGare/reservedPlace`, { headers: this.headers, params: params }
    );
  }

  public libererPlace(plcId: number, voyId: number, batId: number) {
    // Construire l'URL avec les paramètres dans la chaîne de requête
    const url = `${config.apiBaseUrl}/chefDeGare/libererPlace?plcId=${plcId}&voyId=${voyId}&batId=${batId}`;
  
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
      `${config.apiBaseUrl}/chefDeGare/doReservation`, null, { headers: this.headers, params: params }).pipe(
      tap(response => console.log('Réservation effectuée avec succès', response)),
      catchError(error => {
        console.error('Erreur serveur', error);
        return throwError(error);
      })
    );
  }
}
