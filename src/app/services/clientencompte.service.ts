import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientEnCompte } from '../model/ClientEnCompte.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { config } from '../config/api.config';
import { CltModeRglmt } from '../model/CltModeRglmt.model';
import { Bateau } from '../model/Bateau.model';
import { FretDTO } from '../model/FretClt.model';
import { Facturation } from '../model/Facturation.model';
import { GroupeFacture } from '../model/GroupeFactures.model';
import { TreeNode } from 'primeng/api';
import { TypeReglement } from '../model/TypeReglement.model';
import { SituationClient } from '../model/SituationClient.model';

@Injectable({
  providedIn: 'root'
})
export class ClientencompteService {

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

  public getClientEnCompte(cltEnCmpt: number): Observable<ClientEnCompte>
  {
    return this.http.get<ClientEnCompte>(
      `${config.apiBaseUrl}/clientEnCompte/cltEnCompte/${cltEnCmpt}`, { headers: this.headers }
    );
  }

  public getAllClientEnCompte(): Observable<ClientEnCompte>
  {
    return this.http.get<ClientEnCompte>(
      `${config.apiBaseUrl}/clientEnCompte/cltEnComptes`, { headers: this.headers }
    );
  }

  public getAllModeRglmt(): Observable<CltModeRglmt>
  {
    return this.http.get<CltModeRglmt>(
      `${config.apiBaseUrl}/clientEnCompte/cltModeReglement`, { headers: this.headers }
    );
  }

  createClientEnCompte(cltEnCompte: ClientEnCompte): Observable<ClientEnCompte> 
  {
    return this.http.post<ClientEnCompte>(`${config.apiBaseUrl}/clientEnCompte/createCltCpt`, cltEnCompte, { headers: this.headers }).pipe(
      tap(response => console.log('Client en compte créée avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de la création du client', error);
        return throwError(error);
      })
    );
  }

  public updateClientEnCompte(cltEnCompte : ClientEnCompte): Observable<ClientEnCompte> 
  {
    // Envoyer la requête POST
    return this.http.put<ClientEnCompte>(`${config.apiBaseUrl}/clientEnCompte/updateCltEnCmpt/${cltEnCompte.cltcmptId}`, cltEnCompte, { headers:this.headers }).pipe(
      tap(response => console.log('Client en compte mis à jour avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de l\'ajout du client en compte', error);
        return throwError(error);
      })
    );
  }

  
  public updateFacture(id : number, cltFacturation: Object, isEmis : boolean)
  {
    const params = new HttpParams().set('isEmis', isEmis);
    // Envoyer la requête POST
    return this.http.patch(`${config.apiBaseUrl}/clientEnCompte/updateFacture/${id}`, cltFacturation, { headers:this.headers, params: params }).pipe(
      tap(response => console.log('Facture mise à jour avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de l\'ajout du client en compte', error);
        return throwError(error);
      })
    );
  }

  public updatePayment(id : number, cltFacturation: Object, userPaie : string)
  {
    const params = new HttpParams().set('usrPaie', userPaie);
    // Envoyer la requête POST
    return this.http.patch(`${config.apiBaseUrl}/clientEnCompte/updatePayment/${id}`, cltFacturation, { headers:this.headers, params: params }).pipe(
      tap(response => console.log('Facture payée avec succès', response)),
      catchError(error => {
        console.error('Erreur', error);
        return throwError(error);
      })
    );
  }

  public getFretByCltCmpt(idCltCmpt: number): Observable<FretDTO[]> {
    const url = `${config.apiBaseUrl}/fret/getFretByCltCompte`;
    const params = new HttpParams().set('cltCmptId', idCltCmpt);
    console.log("Test");
    return this.http.get<FretDTO[]>(url, { headers: this.headers, params: params });
  }

  public getFretsByCltCompte(idCltCompte: number, date1: string, date2: string): Observable<FretDTO[]> {
    const url = `${config.apiBaseUrl}/clientEnCompte/getFretsByCltCompte`;
    const params = new HttpParams()
      .set('idCltCompte', idCltCompte)
      .set('startDate', date1)
      .set('endDate', date2);
    console.log("Test");
    return this.http.get<FretDTO[]>(url, { headers: this.headers, params: params });
  }

  createFacturation(cltFacturation: Facturation, user : string): Observable<Facturation> 
  {
    const params = new HttpParams().set('usrFact', user);

    return this.http.post<Facturation>(`${config.apiBaseUrl}/clientEnCompte/createFacture`, cltFacturation, { headers: this.headers, params: params }).pipe(
      tap(response => console.log('Facture créée avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de la création de la facture', error);
        return throwError(error);
      })
    );
  }
  
  public getFacturesGroupees(): Observable<GroupeFacture[]> {
    const url = `${config.apiBaseUrl}/clientEnCompte/groupFactureByCltCompte`;
    return this.http.get<GroupeFacture[]>(url, { headers: this.headers });
  }

  getFacturesParEtat(): Observable<{ [etat: string]: any[] }> {
    const url = `${config.apiBaseUrl}/clientEnCompte/getFacturesByEtatPayment`;
    return this.http.get<{ [etat: string]: any[] }>(url, { headers: this.headers });
  }

  public getTypeReglements(): Observable<TypeReglement[]> {
    const url = `${config.apiBaseUrl}/clientEnCompte/getAllTypeReglement`;
    return this.http.get<TypeReglement[]>(url, { headers: this.headers });
  }

  public getSituClient(idCltCompte: number, annee: number): Observable<SituationClient[]> {
    const url = `${config.apiBaseUrl}/clientEnCompte/getSituationClient`;
    const params = new HttpParams()
      .set('cltcmpt', idCltCompte)
      .set('annee', annee);
    console.log("Test");
    return this.http.get<SituationClient[]>(url, { headers: this.headers, params: params });
  }

  public getToutesLesFactures(idCltCompte: number, startDate: string, endDate: string): Observable<Facturation[]> {
    const url = `${config.apiBaseUrl}/clientEnCompte/getToutesLesFactures`;
    const params = new HttpParams()
      .set('idCltCompte', idCltCompte)
      .set('startDate', startDate)
      .set('endDate', endDate);
    console.log("Test");
    return this.http.get<Facturation[]>(url, { headers: this.headers, params: params });
  }


  
  
}
