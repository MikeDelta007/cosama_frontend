import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voyage } from '../model/Voyage.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { config } from '../config/api.config';
import { PlanVoyage } from '../model/PlanVoyage.model';
import { Niveau } from '../model/Niveau.model';
import { VoyagePlace } from '../model/VoyagePlace.model';
import { Critere } from '../model/Critere.model';
import { GroupeCritere } from '../model/GroupeCrt.model';
import { TypePlace } from '../model/TypePlace.model';
import { Categorie } from '../model/Categorie.model';
import { CategoriePlace, Tarif } from '../model/CategoriePlace.model';
import { PassagerSimple, PassagerWithBillet, PassagerWithBilletDTO } from '../model/Passager.model';
import { Country } from '../model/Country.model';
import { Billet } from '../model/AchatOnLine.model';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {

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

  public getVoyages(): Observable<any> 
  {
    
    return this.http.get<any>(
      `${config.apiBaseUrl}/parametrage/voyages`,{ headers: this.headers }
    );
  }

  public getVilles(): Observable<any> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/parametrage/villes`,{ headers: this.headers }
    );
  }

  public getPlan(): Observable<PlanVoyage> 
  {
    return this.http.get<PlanVoyage>(
      `${config.apiBaseUrl}/parametrage/planVoyage`,{ headers: this.headers }
    );
  }

  public getPlan2(): Observable<PlanVoyage> 
  {
    return this.http.get<PlanVoyage>(
      `${config.apiBaseUrl}/parametrage/planVoyage2`,{ headers: this.headers }
    );
  }

  public createVoyage(voyage: Voyage): Observable<Voyage> 
  {
    return this.http.post<Voyage>(`${config.apiBaseUrl}/parametrage/createVoyage`, voyage, { headers: this.headers }).pipe(
      tap(response => console.log('Voyage créé avec succès', response)),
      catchError(error => {
        console.error('Erreur serveur', error);
        return throwError(error);
      })
    );
  }

  updateVoyage(voyage:Voyage): Observable<Voyage> 
    {
    
      // Envoyer la requête POST
      return this.http.put<Voyage>(`${config.apiBaseUrl}/parametrage/updateVoyage/${voyage.voy_id}`, voyage, { headers : this.headers }).pipe(
        tap(response => console.log('Voyage mis à jour avec succès', response)),
        catchError(error => {
          console.error('Erreur serveur', error);
          return throwError(error);
        })
      );
    }

  cancelVoyage(voyage: Voyage, motif : string): Observable<string>
  {
    const url = `${config.apiBaseUrl}/parametrage/annulerVoyage/${voyage.voy_id}`;

    const params = new HttpParams().set('motif', motif);
    
    return this.http.put<string>(url, null, {  
      headers: this.headers,
      params : params,
      responseType: 'text' as 'json' }).pipe(
      tap(response => console.log('Voyage annulé avec succès', response)),
      catchError(error => {
        console.error('Erreur serveur', error);
        return throwError(() => error);
      })
    );
  }

    public getNiveauPlace(batId: number): Observable<Niveau> {
      // Vérifie si les données sont dans le cache
      /**
      if (this.cache[batId]) {
        const cachedData = this.cache[batId];
        
        // Si un type de place est spécifié, filtrez les places dans le cache
        if (selectedTypePlace) {
          cachedData.places = cachedData.places.filter((place: any) => place.tplc_id === selectedTypePlace);
        }
        
        return of(cachedData);
      }*/
    
      // Si les données ne sont pas dans le cache, effectue une requête HTTP
      //const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa('root:1234')});
      return this.http.get<Niveau>(`${config.apiBaseUrl}/parametrage/niveaux/${batId}`, { headers: this.headers })
    }
    
    public isPlacesInVoyage(placeIds: number[], voyId: number): Observable<boolean[]> {
      //const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa('root:1234')});
      
      // Ajout du paramètre typePlace aux paramètres de la requête
      const params = new HttpParams()
        .set('placeIds', placeIds.join(','))
        .set('voyId', voyId.toString());
    
      // Envoi de la requête HTTP GET avec les paramètres et retour d'un Observable
      return this.http.get<boolean[]>(`${config.apiBaseUrl}/parametrage/isPlaceInVoyagePlace2`,{ params, headers: this.headers });
    }

    public getStateVP(voyId: number, placeId: number): Observable<any> {
      //const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa('root:1234')});
      
      // Ajout du paramètre typePlace aux paramètres de la requête
      const params = new HttpParams()
        .set('voyId', voyId.toString())
        .set('placeId', placeId.toString());
    
      // Envoi de la requête HTTP GET avec les paramètres et retour d'un Observable
      return this.http.get<any>(`${config.apiBaseUrl}/parametrage/getStateVP`,{ params, headers: this.headers });
    }

    public getStateVP_(voyId: number, placeId: number)
    {
      //const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa('root:1234')});
      
      // Ajout du paramètre typePlace aux paramètres de la requête
      const params = new HttpParams()
        .set('voyId', voyId.toString())
        .set('placeId', placeId.toString());
    
      // Envoi de la requête HTTP GET avec les paramètres et retour d'un Observable
      return this.http.get<VoyagePlace>(`${config.apiBaseUrl}/parametrage/stateVP`,{ params, headers: this.headers });
    }

    public getCountries(): Observable<Country>
  {
    //const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa('root:1234')});
    return this.http.get<Country>(
      `${config.apiBaseUrl}/parametrage/countries`,{ headers: this.headers }
    );
  }


  public getGroupeCriteres(): Observable<GroupeCritere>
  {
    //const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa('root:1234')});
    return this.http.get<GroupeCritere>(
      `${config.apiBaseUrl}/parametrage/groupesCriteres`,{ headers: this.headers }
    );
  }


  public getTarif(tplId: number, criteres: Critere[]): Observable<Tarif> {
    //const headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa('root:1234') });

    // Construire le corps de la requête
    const body = {
      tplId: tplId,
      criteres: criteres
    };

    return this.http.post<Tarif>(`${config.apiBaseUrl}/parametrage/prixPlace`, body, { headers: this.headers });
  }

  public getTypePlace(): Observable<TypePlace>
  {
    //const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa('root:1234')});
    return this.http.get<TypePlace>(
      `${config.apiBaseUrl}/parametrage/typePlaces`, { headers: this.headers }
    );
  }

  public getPassager(cinorpass : String): Observable<PassagerSimple>
  {
    //const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa('root:1234')});
    return this.http.get<PassagerSimple>(
      `${config.apiBaseUrl}/billetterie/findPassager/${cinorpass}`, { headers: this.headers }
    );
  }

  public getNiveauPlace2(batId: number): Observable<Niveau> {
    // Vérifie si les données sont dans le cache
    /**
    if (this.cache[batId]) {
      const cachedData = this.cache[batId];
      
      // Si un type de place est spécifié, filtrez les places dans le cache
      if (selectedTypePlace) {
        cachedData.places = cachedData.places.filter((place: any) => place.tplc_id === selectedTypePlace);
      }
      
      return of(cachedData);
    }*/
  
    // Si les données ne sont pas dans le cache, effectue une requête HTTP
    //const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa('root:1234')});
    return this.http.get<Niveau>(`${config.apiBaseUrl}/parametrage/niveaux/${batId}`, { headers: this.headers })
  }
  
  public isPlacesInVoyage2(placeIds: number[], voyId: number, typePlace: number): Observable<boolean[]> {
    //const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa('root:1234')});
    
    // Ajout du paramètre typePlace aux paramètres de la requête
    const params = new HttpParams()
      .set('placeIds', placeIds.join(','))
      .set('voyId', voyId.toString())
      .set('typePlace', typePlace.toString());
  
    // Envoi de la requête HTTP GET avec les paramètres et retour d'un Observable
    return this.http.get<boolean[]>(`${config.apiBaseUrl}/parametrage/isPlaceInVoyagePlace`, { params, headers: this.headers });
  }

  public submitAchatBillet(PassagerAvecsonBillet : PassagerWithBilletDTO, voyId : number): Observable<Billet> {
    //const headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa('root:1234') });
    const params = new HttpParams()
      .set('voyId', voyId);

    return this.http.post<Billet>(`${config.apiBaseUrl}/billetterie/billet-online`, PassagerAvecsonBillet, { params, headers: this.headers }).pipe(
      tap(response => console.log('Billet submitted successfully', response)),
      catchError(error => {
        console.error('Error submitting billet', error);
        return throwError(error);
      })
    );
  }

  getRecParEtat(): Observable<{ [etat: string]: any[] }> {
    const url = `${config.apiBaseUrl}/rec/getReclamations_`;
    return this.http.get<{ [etat: string]: any[] }>(url, { headers: this.headers });
  }

}
