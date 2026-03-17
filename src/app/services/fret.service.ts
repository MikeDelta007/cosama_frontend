import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FretClt, FretDTO, LigneFret } from '../model/FretClt.model';
import { config } from '../config/api.config';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { VoyageO } from '../model/VoyageO.model';
import { LigneFrets } from '../model/LigneFrets.model';

@Injectable({
  providedIn: 'root'
})
export class FretService {

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

  public getVoyageOfDay(batId : number): Observable<VoyageO> 
  {
    const params = new HttpParams()
      .set('batId', batId);

    return this.http.get<VoyageO>(
      `${config.apiBaseUrl}/parametrage/voyageDate`,{ headers: this.headers, params }
    );
  }

  public getFrets(): Observable<FretClt> 
  {
    return this.http.get<FretClt>(
      `${config.apiBaseUrl}/fret/getFret`,{ headers: this.headers }
    );
  }

  public submitFret(fretCltDTO: FretClt, cltCmptId: number, voyId: number, bilId: number, expEqDest: boolean): Observable<FretClt> 
  {
    const url = `${config.apiBaseUrl}/fret/createFret`;
    
    const params = new HttpParams()
      .set('cltCmptId', cltCmptId)
      .set('voyId', voyId)
      .set('bilId', bilId)
      .set('expEqDest', expEqDest);

    return this.http.post<FretClt>(url, fretCltDTO, { headers : this.headers, params }).pipe(
      tap(response => console.log('Fret created successfully', response)),
      catchError(error => {
        console.error('Error creating fret', error);
        return throwError(error);
      })
    );
  }

  public updateFret(idFret: number, lignefret : any, cltCmptId: number, voyId: number, bilId: number, expEqDest: boolean)
  {
    const url = `${config.apiBaseUrl}/fret/updateFret`;
    
    const params = new HttpParams()
      .set('cltCmptId', cltCmptId)
      .set('voyId', voyId)
      .set('bilId', bilId)
      .set('expEqDest', expEqDest)
      .set('idFret', idFret);

    return this.http.put<number>(url, lignefret, { headers : this.headers, params }).pipe(
      tap(response => console.log('Fret updated successfully', response)),
      catchError(error => {
        console.error('Error updating fret', error);
        return throwError(error);
      })
    );
  }

  public deleteFret(lignefret: any, idFret: number) {
    const url = `${config.apiBaseUrl}/fret/deleteLigneFret`;
  
    const params = new HttpParams().set('idFret', idFret);
  
    return this.http.delete<number>(url, { 
      headers: this.headers, 
      params: params,
      body: lignefret
    }).pipe(
      tap(response => console.log('Line fret deleted successfully', response)),
      catchError(error => {
        console.error('Error deleting fret', error);
        return throwError(error);
      })
    );
  }

  public doPayment(idFret: number, cltCmptId: number, paymentDTO: any): Observable<FretClt> 
  {
    const url = `${config.apiBaseUrl}/fret/doPayment`;
    
    const params = new HttpParams()
      .set('idFret', idFret)
      .set('cltCmptId', cltCmptId);

    return this.http.put<FretClt>(url, paymentDTO, { headers : this.headers, params }).pipe(
      tap(response => console.log('Payment updated successfully', response)),
      catchError(error => {
        console.error('Error updating payment', error);
        return throwError(error);
      })
    );
  }

  public getOneFret(idFret: number): Observable<LigneFrets> {
    const url = `${config.apiBaseUrl}/fret/byFret`;
    const params = new HttpParams().set('fretId', idFret);

      console.log("Test");
    return this.http.get<LigneFrets>(url, { headers: this.headers, params: params });
  }

  public getOneFretByCode(code: string): Observable<FretDTO> {
    const url = `${config.apiBaseUrl}/fret/getFretByCode`;
    const params = new HttpParams().set('code', code);
    console.log("Test");
    return this.http.get<FretDTO>(url, { headers: this.headers, params: params });
  }

  public submitMagasinage(idFret: number, coutMag: number, usr_mag: string): Observable<FretDTO> {
    const url = `${config.apiBaseUrl}/fret/updateMagCout?idFret=${idFret}&cout_magasinage=${coutMag}&usr_magasinage=${usr_mag}`;
  
    return this.http.put<FretDTO>(url, null, { headers: this.headers }).pipe(
      tap(response => console.log('Cout mis à jour avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de la mise à jour du coût', error);
        return throwError(error);
      })
    );
  }  

  public annulerFret(annulationDTO: any) 
  {
    const url = `${config.apiBaseUrl}/fret/cancel-fret`;
  
    return this.http.put(url, annulationDTO, { headers: this.headers }).pipe(
      tap(response => console.log('Fret annulé avec succès', response)),
      catchError(error => {
        console.error('Erreur', error);
        return throwError(error);
      })
    );
  }

  getFretParEtat(): Observable<{ [etat: string]: any[] }> {
    const url = `${config.apiBaseUrl}/fret/getFretsByEtatPayment`;
    return this.http.get<{ [etat: string]: any[] }>(url, { headers: this.headers });
  }

  getFretParEtat_(): Observable<{ [etat: string]: any[] }> {
    const url = `${config.apiBaseUrl}/fret/getFretsByEtatPayment_`;
    return this.http.get<{ [etat: string]: any[] }>(url, { headers: this.headers });
  }
    
}
