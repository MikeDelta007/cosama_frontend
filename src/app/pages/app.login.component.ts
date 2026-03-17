import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { userInfo } from 'os';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  providers: [MessageService],
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {

  credentials = { login: '', password: '' };
  
  constructor(private readonly userService : UserService, private readonly authService: AuthService, private readonly router: Router, private readonly messageService: MessageService) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        if (response.user.etat)
        {
          this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Connexion réussie', life: 4000 });
          console.log('Login successful');
          console.log(response.user);
          this.userService.setUser(response.user); // Sauvegarder l'utilisateur dans le service
          this.router.navigate(['/tableau-de-bord']); // Redirige vers un chemin protégé
          }
        else
        {
          this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Compte verrouillé', life: 4000 });
          console.log('Login locked');
          console.log(response.user);
        }  
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur de connexion', life: 3000 });
        console.error('Login failed', error);
      }
    );
  }

}
