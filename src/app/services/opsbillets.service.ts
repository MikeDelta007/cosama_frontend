import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypePiece } from '../model/TypePiece.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { config } from '../config/api.config';
import { TypePlace } from '../model/TypePlace.model';
import { Place } from '../model/Place.model';
import { Billet } from '../model/Billet.model';

@Injectable({
  providedIn: 'root'
})
export class OpsbilletsService 
{
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

  public getPiece(): Observable<TypePiece>
  {
    return this.http.get<TypePiece>(
      `${config.apiBaseUrl}/chefDeGare/typePieces`,{ headers: this.headers }
    );
  }

  public getTypePlace(): Observable<TypePlace>
  {
    return this.http.get<TypePlace>(
      `${config.apiBaseUrl}/chefDeGare/typePlaces`,{ headers: this.headers }
    );
  }

  public getPlaces(): Observable<Place> 
  {
    return this.http.get<Place>(
      `${config.apiBaseUrl}/chefDeGare/places`,{ headers: this.headers }
    );
  }

  public getVilles(): Observable<any> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/chefDeGare/villes`,{ headers: this.headers }
    );
  }

  public getBateaux(): Observable<Object[]> 
  {
    return this.http.get<Object[]>(
      `${config.apiBaseUrl}/chefDeGare/bateau`,{ headers: this.headers }
    );
  }

  public getVoyages(): Observable<any> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/chefDeGare/voyages`,{ headers: this.headers }
    );
  }

    public getVoyagesAujourdhuiUlterieur(): Observable<any> 
  {
    return this.http.get<any>(
      `${config.apiBaseUrl}/chefDeGare/voyagesSinceNow`,{ headers: this.headers }
    );
  }

  public getDetailsBillet(codeBillet: string): Observable<Billet> {
    const params = new HttpParams()
      .set('codeBillet', codeBillet);
  
    return this.http.get<Billet>(
      `${config.apiBaseUrl}/chefDeGare/details-billet`, { headers: this.headers, params: params }
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

  public reportBillet(billId: number, updatePsg: boolean, voyId: number, billetDTO: Object, penality: number): Observable<Billet> {
    console.log(billetDTO);
    const params = new HttpParams()
        .set('updatePsg', updatePsg)
        .set('voyId', voyId)
        .set('penality', penality);

    //console.log(billetDTO.plcId, " ", billetDTO.voyageDTO.voy_id, " ", billetDTO.voyageDTO.bat_id);
    // Envoyer la requête POST
    return this.http.post<Billet>(`${config.apiBaseUrl}/chefDeGare/reportBillet/${billId}`, billetDTO, { headers : this.headers, params }).pipe(
        tap(response => console.log('Update with success', response)),
        catchError(error => {
            console.error('Error', error);
            return throwError(error);
        })
    );
  }

  public rembourserBillet(billId : number, motif: string, penal : number, usrRemb: string) {
    const params = new HttpParams()
        .set('motif', motif)
        .set('penality', penal)
        .set('usrRemb', usrRemb);


    //console.log(billetDTO.plcId, " ", billetDTO.voyageDTO.voy_id, " ", billetDTO.voyageDTO.bat_id);
    // Envoyer la requête POST
    return this.http.put(`${config.apiBaseUrl}/chefDeGare/billet-rembourser/${billId}`, {}, { headers : this.headers, params }).pipe(
        tap(response => console.log('Update with success')),
        catchError(error => {
            console.error('Error', error);
            return throwError(error);
        })
    );
  }

  public libererPlace(billet:Billet): Observable<any>
  {
    
    const params = new HttpParams()
    .set('plcId', billet.plcId)
    .set('voyId', billet.voyageDTO.voy_id)
    .set('batId', billet.voyageDTO.bat_id);

    console.log(billet.plcId, " ", billet.voyageDTO.voy_id, " ", billet.voyageDTO.bat_id);
  
    // Envoyer la requête POST
    return this.http.delete(`${config.apiBaseUrl}/chefDeGare/shotPlace`, { headers: this.headers, params: params }).pipe(
      tap(response => console.log('Update with success', response)),
      catchError(error => {
        console.error('Error', error);
        return throwError(error);
      })
    );
  }

  public cancelBillet(bilId: number): Observable<any> {
  
    // Envoyer la requête PATCH avec les en-têtes
    return this.http.patch(`${config.apiBaseUrl}/chefDeGare/billet-cancel/${bilId}`, {}, { headers : this.headers }).pipe(
      tap(response => console.log('Update with success', response)),
      catchError(error => {
        console.error('Error', error);
        return throwError(error);
      })
    );
  }  

  public isEdit(bilId: number): Observable<any> {
  
    // Envoyer la requête PATCH avec les en-têtes
    return this.http.patch(`${config.apiBaseUrl}/chefDeGare/billet-isedit/${bilId}`, {}, { headers : this.headers }).pipe(
      tap(response => console.log('Edit authorized', response)),
      catchError(error => {
        console.error('Error', error);
        return throwError(error);
      })
    );
  }  

  public isCancel(bilId: number): Observable<any> {
  
    // Envoyer la requête PATCH avec les en-têtes
    return this.http.patch(`${config.apiBaseUrl}/chefDeGare/billet-iscancel/${bilId}`, {}, { headers : this.headers }).pipe(
      tap(response => console.log('Cancel Billet authorized', response)),
      catchError(error => {
        console.error('Error', error);
        return throwError(error);
      })
    );
  } 
  
  public isRepSur(bilId: number): Observable<any> {
  
    // Envoyer la requête PATCH avec les en-têtes
    return this.http.patch(`${config.apiBaseUrl}/chefDeGare/billet-isreporSur/${bilId}`, {}, { headers : this.headers }).pipe(
      tap(response => console.log('Report Surclass authorized', response)),
      catchError(error => {
        console.error('Error', error);
        return throwError(error);
      })
    );
  } 

  public isRemb(bilId: number): Observable<any> {
  
    // Envoyer la requête PATCH avec les en-têtes
    return this.http.patch(`${config.apiBaseUrl}/chefDeGare/billet-isrembrs/${bilId}`, {}, { headers : this.headers }).pipe(
      tap(response => console.log('Rembours authorized', response)),
      catchError(error => {
        console.error('Error', error);
        return throwError(error);
      })
    );
  } 

  public generateQRCode(text: string): Observable<string> {
    const params = new HttpParams().set('text', text);
    return this.http.get(`${config.apiBaseUrl}/chefDeGare/generateQR`, { headers : this.headers, params, responseType: 'text' });
  }


}
