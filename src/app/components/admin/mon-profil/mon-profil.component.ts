import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ParametrageService } from 'src/app/services/parametrage.service';
import { UserService } from 'src/app/services/user.service';
import { ProfilUserComponent } from '../profil-user/profil-user.component';
import { ProfilsdroituserService } from 'src/app/services/profilsdroituser.service';
import { AppMainComponent } from 'src/app/app.main.component';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  providers: [MessageService]
})
export class MonProfilComponent implements OnInit {

  userEdit: any = {
    usr_login: '',
    usr_password: '',
    usr_firstname: '',
    usr_lastname: '',
    usr_desc: ''
  };

  passwordForm = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(public appMain: AppMainComponent, private userService: ProfilsdroituserService, private messageService: MessageService) {}

  ngOnInit(): void 
  {
    this.loadUserProfile(this.appMain.user.id);
  }

  loadUserProfile(userId: any) {
    this.userService.getMyProfile(userId).subscribe({
      next: (user) => {
        this.userEdit = { ...user, usr_password: '' }; // mot de passe vide
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger le profil' });
      }
    });
  }

  updateProfil(userId: any) {
  // Vérification des mots de passe si utilisateur veut le changer
  if (this.passwordForm.newPassword) {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Erreur', 
        detail: 'Les mots de passe ne correspondent pas' 
      });
      return;
    }

    // Appel backend pour changer le mot de passe
    this.userService.changePassword(userId, {
      oldPassword: this.passwordForm.oldPassword,
      newPassword: this.passwordForm.newPassword
    }).subscribe({
      next: () => {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Succès', 
          detail: 'Mot de passe mis à jour' 
        });
        this._updateProfileData(userId); // mise à jour des autres champs
      },
      error: (err) => {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Erreur', 
          detail: err?.error?.message || 'Erreur lors du changement de mot de passe' 
        });
      }
    });
  } else {
    // Si mot de passe non changé, on met à jour le profil seulement
    this._updateProfileData(userId);
  }
}

// Méthode privée pour mettre à jour le reste du profil
private _updateProfileData(userId: any) {
  const updateData = { ...this.userEdit };
  delete updateData.usr_password; // ne jamais envoyer le hash actuel

  this.userService.updateMyProfile(userId, updateData).subscribe({
    next: () => {
      this.messageService.add({ 
        severity: 'success', 
        summary: 'Succès', 
        detail: 'Profil mis à jour' 
      });
      // Réinitialisation du formulaire de mot de passe
      this.passwordForm = { oldPassword: '', newPassword: '', confirmPassword: '' };
      this.appMain.logout(); // logout après tout est OK
    },
    error: () => {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Erreur', 
        detail: 'Impossible de mettre à jour le profil' 
      });
    }
  });
}

}