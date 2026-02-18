import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config/api.config';
import { Observable } from 'rxjs';
import { LigneFrets } from '../model/LigneFrets.model';
import { ManifesteAdulte } from '../model/ManifesteAdulte.model';
import { ManifesteBebe } from '../model/ManifesteBebe.model';
import { RapportPAX } from '../model/RapportPAX.model';
import { ManifesteFret } from '../model/ManifesteFret.model';
import { ManifesteFret2 } from '../model/ManifesteFret2.model';
import { RecapStatManifAdulte } from '../model/RecapStatManifAdulte.model';

@Injectable({
  providedIn: 'root'
})
export class EtatService {

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

    public getManifesteAdulte(voyId: number, batId: number,): Observable<ManifesteAdulte> 
    {
      const url = `${config.apiBaseUrl}/etat/manifesteAdulte`;
      const params = new HttpParams()
        .set('voyId', voyId)
        .set('batId', batId);

      return this.http.get<ManifesteAdulte>(url, { headers: this.headers, params: params });
    }

    public getManifesteEnfant(voyId: number, batId: number,): Observable<ManifesteAdulte> 
    {
      const url = `${config.apiBaseUrl}/etat/manifesteEnfant`;
      const params = new HttpParams()
        .set('voyId', voyId)
        .set('batId', batId);

      return this.http.get<ManifesteAdulte>(url, { headers: this.headers, params: params });
    }

    public getManifesteBebe(voyId: number, batId: number,): Observable<ManifesteBebe> 
    {
      const url = `${config.apiBaseUrl}/etat/manifesteBebe`;
      const params = new HttpParams()
        .set('voyId', voyId)
        .set('batId', batId);

      return this.http.get<ManifesteBebe>(url, { headers: this.headers, params: params });
    }

    public getManifestePNE(voyId: number, batId: number,): Observable<ManifesteAdulte> 
    {
      const url = `${config.apiBaseUrl}/etat/passagersNonEmbarque`;
      const params = new HttpParams()
        .set('voyId', voyId)
        .set('batId', batId);

      return this.http.get<ManifesteAdulte>(url, { headers: this.headers, params: params });
    }

    public getBilletsReportes(voyId: number, batId: number,): Observable<ManifesteAdulte> 
    {
      const url = `${config.apiBaseUrl}/etat/billetsReportes`;
      const params = new HttpParams()
        .set('voyId', voyId)
        .set('batId', batId);

      return this.http.get<ManifesteAdulte>(url, { headers: this.headers, params: params });
    }

    public getRapportPAX(voyId: number, batId: number,): Observable<RapportPAX> 
    {
      const url = `${config.apiBaseUrl}/etat/rapportPax`;
      const params = new HttpParams()
        .set('voyId', voyId)
        .set('batId', batId);

      return this.http.get<RapportPAX>(url, { headers: this.headers, params: params });
    }

    ///
    public getManifesteAdulte_(voyId: number, batId: number,): Observable<ManifesteAdulte> 
    {
      const url = `${config.apiBaseUrl}/etat/manifesteAdulteC`;
      const params = new HttpParams()
        .set('voyId', voyId)
        .set('batId', batId);

      return this.http.get<ManifesteAdulte>(url, { headers: this.headers, params: params });
    }

    public getManifesteEnfant_(voyId: number, batId: number,): Observable<ManifesteAdulte> 
    {
      const url = `${config.apiBaseUrl}/etat/manifesteEnfantC`;
      const params = new HttpParams()
        .set('voyId', voyId)
        .set('batId', batId);

      return this.http.get<ManifesteAdulte>(url, { headers: this.headers, params: params });
    }

    public getManifesteBebe_(voyId: number, batId: number,): Observable<ManifesteBebe> 
    {
      const url = `${config.apiBaseUrl}/etat/manifesteBebeC`;
      const params = new HttpParams()
        .set('voyId', voyId)
        .set('batId', batId);

      return this.http.get<ManifesteBebe>(url, { headers: this.headers, params: params });
    }

    public getManifestePNE_(voyId: number, batId: number,): Observable<ManifesteAdulte> 
    {
      const url = `${config.apiBaseUrl}/etat/passagersNonEmbarqueC`;
      const params = new HttpParams()
        .set('voyId', voyId)
        .set('batId', batId);

      return this.http.get<ManifesteAdulte>(url, { headers: this.headers, params: params });
    }

    public getBilletsReportes_(voyId: number, batId: number,): Observable<ManifesteAdulte> 
    {
      const url = `${config.apiBaseUrl}/etat/billetsReportesC`;
      const params = new HttpParams()
        .set('voyId', voyId)
        .set('batId', batId);

      return this.http.get<ManifesteAdulte>(url, { headers: this.headers, params: params });
    }

    public getRapportPAX_(voyId: number, batId: number,): Observable<RapportPAX> 
    {
      const url = `${config.apiBaseUrl}/etat/rapportPaxC`;
      const params = new HttpParams()
        .set('voyId', voyId)
        .set('batId', batId);

      return this.http.get<RapportPAX>(url, { headers: this.headers, params: params });
    }

    //

    public fretAPayer(voyId: number): Observable<ManifesteFret> 
    {
      const url = `${config.apiBaseUrl}/etat/fretAPayer`;
      const params = new HttpParams()
        .set('voyId', voyId)

      return this.http.get<ManifesteFret>(url, { headers: this.headers, params: params });
    }

    public fretAPayerC(voyId: number): Observable<ManifesteFret> 
    {
      const url = `${config.apiBaseUrl}/etat/fretAPayerC`;
      const params = new HttpParams()
        .set('voyId', voyId)

      return this.http.get<ManifesteFret>(url, { headers: this.headers, params: params });
    }

    public fretCltenCmpt(voyId: number): Observable<ManifesteFret> 
    {
      const url = `${config.apiBaseUrl}/etat/fretCltCompte`;
      const params = new HttpParams()
        .set('voyId', voyId)

      return this.http.get<ManifesteFret>(url, { headers: this.headers, params: params });
    }

    public fretCltenCmptC(voyId: number): Observable<ManifesteFret> 
    {
      const url = `${config.apiBaseUrl}/etat/fretCltCompteC`;
      const params = new HttpParams()
        .set('voyId', voyId)

      return this.http.get<ManifesteFret>(url, { headers: this.headers, params: params });
    }

    public manifesteFret(voyId: number): Observable<ManifesteFret2> 
    {
      const url = `${config.apiBaseUrl}/etat/manifesteFret`;
      const params = new HttpParams()
        .set('voyId', voyId)

      return this.http.get<ManifesteFret2>(url, { headers: this.headers, params: params });
    }

    public manifesteFretC(voyId: number): Observable<ManifesteFret2> 
    {
      const url = `${config.apiBaseUrl}/etat/manifesteFretC`;
      const params = new HttpParams()
        .set('voyId', voyId)

      return this.http.get<ManifesteFret2>(url, { headers: this.headers, params: params });
    }

    public fretAnnuler(voyId: number): Observable<ManifesteFret2> 
    {
      const url = `${config.apiBaseUrl}/etat/fretAnnuler`;
      const params = new HttpParams()
        .set('voyId', voyId)

      return this.http.get<ManifesteFret2>(url, { headers: this.headers, params: params });
    }

    public fretAnnulerC(voyId: number): Observable<ManifesteFret2> 
    {
      const url = `${config.apiBaseUrl}/etat/fretAnnulerC`;
      const params = new HttpParams()
        .set('voyId', voyId)

      return this.http.get<ManifesteFret2>(url, { headers: this.headers, params: params });
    }

    public fretAttente(voyId: number): Observable<ManifesteFret2> 
    {
      const url = `${config.apiBaseUrl}/etat/fretAttente`;
      const params = new HttpParams()
        .set('voyId', voyId)

      return this.http.get<ManifesteFret2>(url, { headers: this.headers, params: params });
    }

    public fretAttenteC(voyId: number): Observable<ManifesteFret2> 
    {
      const url = `${config.apiBaseUrl}/etat/fretAttenteC`;
      const params = new HttpParams()
        .set('voyId', voyId)

      return this.http.get<ManifesteFret2>(url, { headers: this.headers, params: params });
    }

    public fretTVA(voyId: number): Observable<ManifesteFret> 
    {
      const url = `${config.apiBaseUrl}/etat/fretTVA`;
      const params = new HttpParams()
        .set('voyId', voyId)

      return this.http.get<ManifesteFret>(url, { headers: this.headers, params: params });
    }

    public fretTVAC(voyId: number): Observable<ManifesteFret> 
    {
      const url = `${config.apiBaseUrl}/etat/fretTVAC`;
      const params = new HttpParams()
        .set('voyId', voyId)

      return this.http.get<ManifesteFret>(url, { headers: this.headers, params: params });
    }

    public getRecapManifesteAdulte(voyId: number, batId: number,): Observable<RecapStatManifAdulte> 
    {
      const url = `${config.apiBaseUrl}/etat/recapManifAdulte`;
      const params = new HttpParams()
        .set('voyId', voyId)
        .set('batId', batId);

      return this.http.get<RecapStatManifAdulte>(url, { headers: this.headers, params: params });
    }

    public getRecapManifesteEnfant(voyId: number, batId: number,): Observable<RecapStatManifAdulte> 
    {
      const url = `${config.apiBaseUrl}/etat/recapManifEnfant`;
      const params = new HttpParams()
        .set('voyId', voyId)
        .set('batId', batId);

      return this.http.get<RecapStatManifAdulte>(url, { headers: this.headers, params: params });
    }

    
}
