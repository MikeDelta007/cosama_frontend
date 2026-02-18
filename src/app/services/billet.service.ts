import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { config } from '../config/api.config';
import { AchatOnLine, AchatOnLineWithBillets, EtatBillet } from '../model/AchatOnLine.model';
import { TypePlace } from '../model/TypePlace.model';
import { TypePiece } from '../model/TypePiece.model';
import { Billet } from '../model/Billet.model';
import { LigneFrets } from '../model/LigneFrets.model';
import { FretDTO } from '../model/FretClt.model';
import { VoyagePlace } from '../model/VoyagePlace.model';

@Injectable({
  providedIn: 'root'
})
export class BilletService {

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
 
  public getTypePlace(): Observable<TypePlace>
  {
    return this.http.get<TypePlace>(
      `${config.apiBaseUrl}/parametrage/typePlaces`,{ headers: this.headers }
    );
  }
  
  public getTitreAndBillets(codeAchat: string): Observable<AchatOnLineWithBillets> {
    const params = new HttpParams()
      .set('codeAchat', codeAchat);
  
    return this.http.get<AchatOnLineWithBillets>(
      `${config.apiBaseUrl}/billetterie/detailsAchatBillet`, { headers: this.headers, params: params }
    );
  }

  public getbilletState(bilCode: string): Observable<Object[]> {
    const params = new HttpParams()
      .set('bilCode', bilCode);
  
    return this.http.get<Object[]>(
      `${config.apiBaseUrl}/billetterie/billet-state`, { headers: this.headers, params: params }
    );
  }
  
  public generateQRCode(text: string): Observable<string> {
    const params = new HttpParams().set('text', text);
    return this.http.get(`${config.apiBaseUrl}/qrcode/generateQR`, { headers : this.headers, params, responseType: 'text' });
  }

  public getPiece(): Observable<TypePiece>
  {
    return this.http.get<TypePiece>(
      `${config.apiBaseUrl}/parametrage/typePieces`,{ headers: this.headers }
    );
  }

  public submitEtatBillet(etatBillet: EtatBillet): Observable<EtatBillet> 
  {
    // Envoyer la requête POST
    return this.http.post<EtatBillet>(`${config.apiBaseUrl}/parametrage/createEtatBillet`, etatBillet, { headers : this.headers }).pipe(
      tap(response => console.log('Etat billet ajouté avec succès', response)),
      catchError(error => {
        console.error('Erreur lors de l\'ajout de l\'etat du billet', error);
        return throwError(error);
      })
    );
  }
  
  public getDetailsBillet(codeBillet: string): Observable<Billet> {
    const params = new HttpParams()
      .set('codeBillet', codeBillet);
  
    return this.http.get<Billet>(
      `${config.apiBaseUrl}/billetterie/details-billet`, { headers: this.headers, params: params }
    );
  }

  public updateCheckInfo(bilId: number, checkInfo: boolean): Observable<Billet> 
  {
    const body = { bilId, checkIn: checkInfo }; // Envoyer les données dans le corps

    return this.http.patch<Billet>(`${config.apiBaseUrl}/billetterie/billet-check`, body, { headers: this.headers }).pipe(
      tap(response => console.log('Success', response)),
      catchError(error => {
        console.error('Error', error);
        return throwError(error);
      })
    );
  }


  public updateInBoard(bilId: number): Observable<Billet> 
  {
    // Envoyer la requête POST
    return this.http.patch<Billet>(`${config.apiBaseUrl}/billetterie/billet-inboard/${bilId}`, { headers : this.headers }).pipe(
      tap(response => console.log('Success', response)),
      catchError(error => {
        console.error('Error', error);
        return throwError(error);
      })
    );
  }

  public cancelBillet(bilId: number): Observable<any> {
  
    // Envoyer la requête PATCH avec les en-têtes
    return this.http.patch(`${config.apiBaseUrl}/billetterie/billet-cancel/${bilId}`, {}, { headers : this.headers }).pipe(
      tap(response => console.log('Success', response)),
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
    return this.http.delete(`${config.apiBaseUrl}/parametrage/shotPlace`, { headers: this.headers, params: params }).pipe(
      tap(response => console.log('Update with success', response)),
      catchError(error => {
        console.error('Error', error);
        return throwError(error);
      })
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
    return this.http.post<Billet>(`${config.apiBaseUrl}/billetterie/reportBillet/${billId}`, billetDTO, { headers : this.headers, params }).pipe(
        tap(response => console.log('Update with success', response)),
        catchError(error => {
            console.error('Error', error);
            return throwError(error);
        })
    );
  }

  public rembourserBillet(billId : number, motif: string, penal : number) {
    
    const params = new HttpParams()
        .set('motif', motif)
        .set('penality', penal);

    //console.log(billetDTO.plcId, " ", billetDTO.voyageDTO.voy_id, " ", billetDTO.voyageDTO.bat_id);
    // Envoyer la requête POST
    return this.http.put(`${config.apiBaseUrl}/billetterie/billet-rembourser/${billId}`, {}, { headers : this.headers, params }).pipe(
        tap(response => console.log('Update with success', response)),
        catchError(error => {
            console.error('Error', error);
            return throwError(error);
        })
    );
  }

  public getOneFretByBillet(billet: string): Observable<FretDTO> 
  {
    const url = `${config.apiBaseUrl}/billetterie/getFretByBillet`;
    const params = new HttpParams().set('billet', billet);
    console.log("Test");
    return this.http.get<FretDTO>(url, { headers: this.headers, params: params });
  }

  public getPlaceByVoyAndBat(voy : number, bat : number, plc : number): Observable<VoyagePlace> 
  {
    const params = new HttpParams()
      .set('voyId', voy)
      .set('batId', bat)
      .set('plcId', plc);
  
    return this.http.get<VoyagePlace>(`${config.apiBaseUrl}/chefDeGare/getPlaceByVoyAndBat`, { headers: this.headers, params: params });
  }

}
