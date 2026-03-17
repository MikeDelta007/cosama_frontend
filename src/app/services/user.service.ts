// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService 
// {
//   private userSubject = new BehaviorSubject<any>(null); 
//   user$ = this.userSubject.asObservable(); 

//   private user: any = null;  // Stocke les informations de l'utilisateur

//   constructor() {}

//   setUser(user: any): void {
//     this.user = user;
//   }

//   getUser(): any {
//     return this.user;
//   }

//   isAuthenticated(): boolean {
//     return this.user !== null;
//   }
  
// }


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { config } from '../config/api.config';
import { Unite } from '../model/Unite.model';
import { Profil } from '../model/Profil.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  user$ = this.userSubject.asObservable();

  public token: string | null = null;
  public headers: HttpHeaders | null = null;

  constructor() {
  }


  private getUserFromStorage(): any {
    const userData = sessionStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  setUser(user: any): void {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser(): any {
    return this.getUserFromStorage();
  }

  clearUser(): void {
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getUserFromStorage();
  }


}

