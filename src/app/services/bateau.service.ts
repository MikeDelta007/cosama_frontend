import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config/api.config';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Bateau } from '../model/Bateau.model';

@Injectable({
  providedIn: 'root'
})
export class BateauService {

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

  public submitBateau(bateau: Bateau): Observable<Bateau> 
  {
 
    // Envoyer la requête POST
    return this.http.post<Bateau>(`${config.apiBaseUrl}/parametrage/createBateau`, bateau, { headers:this.headers }).pipe(
      tap(response => console.log('Bateau ajouté avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de l\'ajout du bateau', error);
        return throwError(error);
      })
    );
  }

  public updateBateau(bateauDTO:Bateau): Observable<Bateau> 
  {
    // Envoyer la requête POST
    return this.http.put<Bateau>(`${config.apiBaseUrl}/parametrage/updateBateau/${bateauDTO.bat_id}`, bateauDTO, { headers:this.headers }).pipe(
      tap(response => console.log('Bateau mis à jour avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de l\'ajout du bateau', error);
        return throwError(error);
      })
    );
  }
  
  getPlacesBateau(bateauId: number): Observable<Object[]> 
  {
    return this.http.get<Object[]>(`${config.apiBaseUrl}/parametrage/places/${bateauId}`, { headers:this.headers });
  }
  

  public getBateaux(): Observable<Object[]> 
  {

    return this.http.get<Object[]>(
      `${config.apiBaseUrl}/parametrage/bateau`,{ headers: this.headers }
    );
  }

  getOneBateau(bateauId: number): Observable<Bateau> 
  {
    return this.http.get<Bateau>(`${config.apiBaseUrl}/parametrage/bateau/${bateauId}`, { headers: this.headers });
  }


  public updateEtatBateau(idBateau: number, state: boolean): Observable<Bateau> {
    const token = sessionStorage.getItem('token');  // Par exemple, récupérer depuis le stockage local
    if (!token) 
    {
      throw new Error('Token non disponible');
    }
    const options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      }),
      params: { state: state.toString() }
    };

    return this.http.put<Bateau>(`${config.apiBaseUrl}/parametrage/updateEtatBateau/${idBateau}`, null, options);
  }


}
