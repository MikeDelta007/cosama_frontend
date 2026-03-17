import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../config/api.config';
import { CountProfilByUser } from '../model/CountProfilByUser.model';
import { CountTPByLevel } from '../model/CountTPByLevel.model';
import { DataForStatBilletCheck } from '../model/DataForStatBilletCheck.model';

@Injectable({
  providedIn: 'root'
})
export class StatsAdminService {

  public token: string | null = null;
    public headers: HttpHeaders | null = null;
  
    constructor(private readonly http: HttpClient) {
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
    
    public countProfilByUser(): Observable<CountProfilByUser> 
    {
      return this.http.get<CountProfilByUser>(
        `${config.apiBaseUrl}/stats/admin/countProfilByUser`,{ headers: this.headers }
      );
    }

    public countUserByAgence(): Observable<CountProfilByUser> 
    {
      return this.http.get<CountProfilByUser>(
        `${config.apiBaseUrl}/stats/admin/countUserByAgence`,{ headers: this.headers }
      );
    }

    public CountTPByLevel(): Observable<CountTPByLevel> 
    {
      return this.http.get<CountTPByLevel>(
        `${config.apiBaseUrl}/stats/admin/countTPByLevel`,{ headers: this.headers }
      );
    }

    public CountTPByBateau(): Observable<CountTPByLevel> 
    {
      return this.http.get<CountTPByLevel>(
        `${config.apiBaseUrl}/stats/admin/countTPByBateau`,{ headers: this.headers }
      );
    }

    public countProductByUnite(): Observable<CountProfilByUser> 
    {
      return this.http.get<CountProfilByUser>(
        `${config.apiBaseUrl}/stats/admin/countProductByUnite`, { headers: this.headers }
      );
    }

    public statCheckBillet(voyId: number): Observable<DataForStatBilletCheck> 
    {
      const url = `${config.apiBaseUrl}/stats/billets/countBilletChecked`;
      const params = new HttpParams()
        .set('voyId', voyId);
        
      return this.http.get<DataForStatBilletCheck>(url, { headers: this.headers, params }
      );
    }

}
