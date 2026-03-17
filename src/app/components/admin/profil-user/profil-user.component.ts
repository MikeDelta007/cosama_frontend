import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppMainComponent } from 'src/app/app.main.component';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { AgenceCreate } from 'src/app/model/Agence';
import { Agence } from 'src/app/model/Agence.model';
import { BagageCreate } from 'src/app/model/BagageCreate';
import { Bagage } from 'src/app/model/Bagages.model';
import { Niveau } from 'src/app/model/Niveau.model';
import { Profil } from 'src/app/model/Profil.model';
import { ResetPassword } from 'src/app/model/ResetPassword.model';
import { SMS } from 'src/app/model/SMS.model';
import { SmsRecipient } from 'src/app/model/SmsRecipient.model';
import { UniteCreate } from 'src/app/model/Unite';
import { Unite } from 'src/app/model/Unite.model';
import { Utilisateur } from 'src/app/model/Utilisateur.model';
import { UtilisateurBis } from 'src/app/model/Utilisateur_.model';
import { Ville } from 'src/app/model/Ville.model';
import { Volume } from 'src/app/model/Volume.model';
import { AgenceService } from 'src/app/services/agence.service';
import { AuthService } from 'src/app/services/auth.service';
import { ParametrageService } from 'src/app/services/parametrage.service';
import { ProfilsdroituserService } from 'src/app/services/profilsdroituser.service';
import { TypeService } from 'src/app/services/type.service';
import { UserService } from 'src/app/services/user.service';

import * as yup from 'yup';

const userSchema = yup.object({
  usr_login: yup.string().required("Login obligatoire").min(3, "Login doit contenir au moins 3 caractères"),
  password: yup.string().required("Mot de passe obligatoire").min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  usr_firstname: yup.string().required("Prénom obligatoire"),
  usr_lastname: yup.string().required("Nom obligatoire"),
  usr_desc: yup
    .string()
    .required("Téléphone obligatoire")
    .matches(/^[0-9]{9,15}$/, "Numéro invalide"),
  agc_id: yup.number().required("Agence obligatoire"),
  prfl_id: yup.number().required("Profil obligatoire"),
});

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
    providers: [MessageService, ConfirmationService],
  styleUrls: ['./profil-user.component.scss']
})

export class ProfilUserComponent implements OnInit {

  errors: { [key: string]: string } = {};

  valuePswd : string = "";

  valuePswdConf : string = "";

  valuePswd2 : string = "";

  valuePswdConf2 : string = "";

  productDialog: boolean = false;

  productDialog0: boolean = false;

  profilEditDialog: boolean = false;

  droitsEditDialog: boolean = false;

  userEditDialog: boolean = false;

  editUnite: boolean = false;
  
  editBagage: boolean = false;

  desactivUserDialog: boolean = false;

  desactivUserDialog2: boolean = false;

  desactivProfilUserDialog: boolean = false;
  
  desactivProfilUserDialog2: boolean = false;

  resetPasswordDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  uniteDialog: boolean = false;

  typeproductDialog: boolean = false;

  niveauDialog: boolean = false;

  typebagageEdit: boolean = false;

  typeniveauEdit: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];
  cols1: any[] = [];
  cols2: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  profils : Profil[] = [];

  profils_true : Profil[] = [];

  users : Utilisateur[] = [];

  agences : Agence[] = [];
  

    public sms : SMS = {
    signature: '',
    content: '',
    subject: '',
    recipients: []
  };

  recipients : SmsRecipient [] = [];

  recipient_ : SmsRecipient = {
    id: 0,
    value: ''
  };

  profilEdit : Profil = {
    prfl_id: 0,
    prfl_libelle: '',
    actif: false,
    add_billet: false,
    add_check_billet: false,
    add_clt_compte: false,
    add_embarqment: false,
    add_facture: false,
    add_fret: false,
    add_nav_data: false,
    add_passager: false,
    add_reglement: false,
    add_voyage: false,
    bloq_places: false,
    cancel_billet: false,
    cancel_fret: false,
    cancel_voyage: false,
    check_fret: false,
    del_clt_compte: false,
    del_facture: false,
    del_passager: false,
    del_reglement: false,
    do_remboursement: false,
    do_rep_surclassment: false,
    edit_billet: false,
    edit_clt_compte: false,
    edit_facture: false,
    edit_fret: false,
    edit_nav_data: false,
    edit_param: false,
    edit_passager: false,
    edit_reglement: false,
    edit_voyage: false,
    edition: false,
    paye_fret: false,
    plan_voyage: false,
    pointer_voyage: false,
    rechercher: false,
    valide: false,
    view_etat: false,
    view_stat: false,
    view_voyage: false,
    utilisateurs: [],
    del_fret_details: false,
    reclamation: false,
    campagne: false
  };

  profilEdit2 : Profil = {
    prfl_id: 0,
    prfl_libelle: '',
    actif: false,
    add_billet: false,
    add_check_billet: false,
    add_clt_compte: false,
    add_embarqment: false,
    add_facture: false,
    add_fret: false,
    add_nav_data: false,
    add_passager: false,
    add_reglement: false,
    add_voyage: false,
    bloq_places: false,
    cancel_billet: false,
    cancel_fret: false,
    cancel_voyage: false,
    check_fret: false,
    del_clt_compte: false,
    del_facture: false,
    del_passager: false,
    del_reglement: false,
    do_remboursement: false,
    do_rep_surclassment: false,
    edit_billet: false,
    edit_clt_compte: false,
    edit_facture: false,
    edit_fret: false,
    edit_nav_data: false,
    edit_param: false,
    edit_passager: false,
    edit_reglement: false,
    edit_voyage: false,
    edition: false,
    paye_fret: false,
    plan_voyage: false,
    pointer_voyage: false,
    rechercher: false,
    valide: false,
    view_etat: false,
    view_stat: false,
    view_voyage: false,
    utilisateurs: [],
    del_fret_details: false,
    reclamation: false,
    campagne: false
  };

  profilEdit3 : Profil = {
    prfl_id: 0,
    prfl_libelle: '',
    actif: false,
    add_billet: false,
    add_check_billet: false,
    add_clt_compte: false,
    add_embarqment: false,
    add_facture: false,
    add_fret: false,
    add_nav_data: false,
    add_passager: false,
    add_reglement: false,
    add_voyage: false,
    bloq_places: false,
    cancel_billet: false,
    cancel_fret: false,
    cancel_voyage: false,
    check_fret: false,
    del_clt_compte: false,
    del_facture: false,
    del_passager: false,
    del_reglement: false,
    do_remboursement: false,
    do_rep_surclassment: false,
    edit_billet: false,
    edit_clt_compte: false,
    edit_facture: false,
    edit_fret: false,
    edit_nav_data: false,
    edit_param: false,
    edit_passager: false,
    edit_reglement: false,
    edit_voyage: false,
    edition: false,
    paye_fret: false,
    plan_voyage: false,
    pointer_voyage: false,
    rechercher: false,
    valide: false,
    view_etat: false,
    view_stat: false,
    view_voyage: false,
    utilisateurs: [],
    del_fret_details: false,
    reclamation: false,
    campagne: false
  };

  profilCreate : Profil = {
    prfl_id: 0,
    prfl_libelle: '',
    actif: false,
    add_billet: false,
    add_check_billet: false,
    add_clt_compte: false,
    add_embarqment: false,
    add_facture: false,
    add_fret: false,
    add_nav_data: false,
    add_passager: false,
    add_reglement: false,
    add_voyage: false,
    bloq_places: false,
    cancel_billet: false,
    cancel_fret: false,
    cancel_voyage: false,
    check_fret: false,
    del_clt_compte: false,
    del_facture: false,
    del_passager: false,
    del_reglement: false,
    do_remboursement: false,
    do_rep_surclassment: false,
    edit_billet: false,
    edit_clt_compte: false,
    edit_facture: false,
    edit_fret: false,
    edit_nav_data: false,
    edit_param: false,
    edit_passager: false,
    edit_reglement: false,
    edit_voyage: false,
    edition: false,
    paye_fret: false,
    plan_voyage: false,
    pointer_voyage: false,
    rechercher: false,
    valide: false,
    view_etat: false,
    view_stat: false,
    view_voyage: false,
    utilisateurs: [],
    del_fret_details: false,
    reclamation: false,
    campagne: false
  };

  profilCreate_0 : Profil = {
    prfl_id: 0,
    prfl_libelle: '',
    actif: false,
    add_billet: false,
    add_check_billet: false,
    add_clt_compte: false,
    add_embarqment: false,
    add_facture: false,
    add_fret: false,
    add_nav_data: false,
    add_passager: false,
    add_reglement: false,
    add_voyage: false,
    bloq_places: false,
    cancel_billet: false,
    cancel_fret: false,
    del_fret_details: false,
    cancel_voyage: false,
    check_fret: false,
    del_clt_compte: false,
    del_facture: false,
    del_passager: false,
    del_reglement: false,
    do_remboursement: false,
    do_rep_surclassment: false,
    edit_billet: false,
    edit_clt_compte: false,
    edit_facture: false,
    edit_fret: false,
    edit_nav_data: false,
    edit_param: false,
    edit_passager: false,
    edit_reglement: false,
    edit_voyage: false,
    edition: false,
    paye_fret: false,
    plan_voyage: false,
    pointer_voyage: false,
    rechercher: false,
    valide: false,
    view_etat: false,
    view_stat: false,
    view_voyage: false,
    utilisateurs: [],
    reclamation: false,
    campagne: false
  }

  userCreate : Utilisateur = {
    usr_id: 0,
    usr_login: '',
    usr_firstname: '',
    usr_lastname: '',
    usr_password: '',
    usr_desc: '',
    usr_etat: false,
    agc_id: 0,
    prfl_id: 0
  }

  userCreate_0 : Utilisateur = {
    usr_id: 0,
    usr_login: '',
    usr_firstname: '',
    usr_lastname: '',
    usr_password: '',
    usr_desc: '',
    usr_etat: false,
    agc_id: 0,
    prfl_id: 0
  }

  
  userEdit : Utilisateur = {
    usr_id: 0,
    usr_login: '',
    usr_firstname: '',
    usr_lastname: '',
    usr_password: '',
    usr_desc: '',
    usr_etat: false,
    agc_id: 0,
    prfl_id: 0
  }

  userEdit2 : Utilisateur = {
    usr_id: 0,
    usr_login: '',
    usr_firstname: '',
    usr_lastname: '',
    usr_password: '',
    usr_desc: '',
    usr_etat: false,
    agc_id: 0,
    prfl_id: 0
  }

  userEdit3 : UtilisateurBis = {
    usr_id: 0,
    usr_login: '',
    usr_firstname: '',
    usr_lastname: '',
    //usr_password: '',
    usr_desc: '',
    usr_etat: false,
    agc_id: 0,
    prfl_id: 0,
    usr_activ: ''
  }

  userEdit4 : UtilisateurBis = {
    usr_id: 0,
    usr_login: '',
    usr_firstname: '',
    usr_lastname: '',
    //usr_password: '',
    usr_desc: '',
    usr_etat: false,
    agc_id: 0,
    prfl_id: 0,
    usr_activ: ''
  }

  public rp : ResetPassword = 
  {
    usr_password: ''
  }

  public user : string;


  constructor(public appMain: AppMainComponent, private readonly authService: AuthService, private agenceService : AgenceService, private profilDroitsUser : ProfilsdroituserService, private messageService: MessageService, private confirmationService: ConfirmationService, private parametrageService: ParametrageService) { }

  ngOnInit() {
      //this.productService.getProducts().then(data => this.products = data);
      
      this.profilDroitsUser.getProfils().subscribe((response:any) => 
        {
        this.profils = response;
        console.log(this.profils);
        this.profils_true = this.profils.filter(p => p.actif === true);
        console.log(this.profils_true);
        }
      );

      this.profilDroitsUser.getUsers().subscribe((response:any) => {
        this.users = response.map(u => ({
          ...u,
          agc_nom: this.agences.find(a => a.agc_id === u.agc_id)?.agc_nom || '',
          prfl_libelle: this.profils.find(p => p.prfl_id === u.prfl_id)?.prfl_libelle || ''
        }));

        console.log(this.users);
      });

      


      this.agenceService.getAgences().subscribe((response:any) => 
        {
        this.agences = response;
        console.log(this.agences);
        }
      );


      this.cols = [
          { field: 'product', header: 'Product' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' },
          { field: 'rating', header: 'Reviews' },
          { field: 'inventoryStatus', header: 'Status' }
      ];

      this.cols1 = [
        { field: 'agcNom', header: 'Nom de l\'agence' },
        { field: 'agcTel', header: 'Téléphone' },
        { field: 'agcFax', header: 'Fax' },
        { field: 'agcResp', header: 'Responsable' },
        { field: 'actions', header: 'Actions' }
    ];

      this.cols2 = [
        { field: 'usr_firstname', header: 'Prénom (s)' },
        { field: 'usr_lastname', header: 'Nom' },
        { field: 'agc_nom', header: 'Agence' },
        { field: 'prfl_libelle', header: 'Profil' }
      ];

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];

      this.user = this.appMain.user.login;
  }
  

  async getAllUsers() {
      this.profilDroitsUser.getUsers().subscribe((response:any) => {
      this.users = response.map(u => ({
        ...u,
        agc_nom: this.agences.find(a => a.agc_id === u.agc_id)?.agc_nom || '',
        prfl_libelle: this.profils.find(p => p.prfl_id === u.prfl_id)?.prfl_libelle || ''
      }));

      console.log(this.users);
    });

  }


  openDesactivUser(user : UtilisateurBis) 
  {
    this.userEdit3 = {...user};
    console.log(this.userEdit3);

    if (this.userEdit3.usr_etat === true)
    {
        this.desactivUserDialog2 = true;
    }

    if (this.userEdit3.usr_etat === false)
    {
        this.desactivUserDialog = true;
    }
  }

  openDesactivProfil(profil : Profil)
  {
    this.profilEdit3 = {...profil};
    console.log(this.profilEdit3);

    if (this.profilEdit3.actif === true)
    {
          this.desactivProfilUserDialog = true;
    }
        if (this.profilEdit3.actif === false)
    {
          this.desactivProfilUserDialog2 = true;
    }
  }

  openResetPassword(user : UtilisateurBis) 
  {
    this.rp.usr_password = "";
    this.resetPasswordDialog = true;
    this.userEdit4 = {...user};
    console.log(this.userEdit4);
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  
  openNew2() {
    this.product = {};
    this.submitted = false;
    this.productDialog0 = true;
}

  modifProfil(profil: Profil) 
  {
    this.profilEdit = { ...profil };
    console.log(this.profilEdit);
    this.profilEditDialog = true;
  }

  modifDroit(profil: Profil) 
  {
    this.profilEdit = { ...profil };
    console.log(this.profilEdit);
    this.droitsEditDialog = true;
  }

  modifUser(user: Utilisateur) 
  {
    this.userEdit = { ...user };
    console.log(this.userEdit);
    this.userEditDialog = true;
  }

  saveProfil() 
  {
    console.log(this.profilCreate_0);
    this.profilCreate.prfl_libelle = this.profilCreate_0.prfl_libelle;

    this.submitted = true;
    this.profilDroitsUser.createProfil(this.profilCreate).subscribe({
        next: () => {
            window.location.reload();
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Profil créé avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    this.productDialog = false;
    //this.bateauCreate = {};

  } 
  

  updateLibProf(id:number)
  {

    // Utilisation de la fonction
    const profil = this.findProfilById(id);

    //console.log(this.selectedFile);
    this.submitted = true;

    if (profil) {
      console.log(`Profil trouvé :`, profil);
    } else {
      console.log(`Profil avec l'ID ${id} non trouvé.`);
    }

    console.log(`modifications :`, this.profilEdit);

    profil.prfl_libelle = this.profilEdit.prfl_libelle;

    console.log(`Profil à poster :`, profil);
    console.log(`Profil à poster :`, id);
    
    this.profilDroitsUser.updateProfil(id, profil).subscribe({
      next: () => {
          //console.log(bateau);
          this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Profils mis à jour avec succés', life: 3000 });
      },
      error: error => {
          console.error('ERROR', error);
          this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur dans la mise à jour', life: 3000 });
      }
    });
    
    this.profilEditDialog = false;
  }


  updateEtatProf(id:number)
  {
    // Utilisation de la fonction
    const profil = this.findProfilById(id);

    if (profil) 
    {
      console.log(`Profil trouvé :`, profil);
    } 
    else 
    {
      console.log(`Profil avec l'ID ${id} non trouvé.`);
    }

    profil.actif = !profil.actif;

    console.log(`Profil à poster :`, profil);
    console.log(`Profil à poster :`, id);
    
    this.profilDroitsUser.updateEtatProfil(id, profil).subscribe({
      next: () => {
          this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Profils mis à jour avec succés', life: 3000 });
          window.location.reload();
      },
      error: error => {
          console.error('ERROR');
          this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur dans la mise à jour', life: 3000 });
      }
    });
  }



  async saveUser() {
  // Reset erreurs
  this.errors = {};

  try {
    // Validation Yup
    await userSchema.validate({
      usr_login: this.userCreate_0.usr_login,
      password: this.valuePswd,
      usr_firstname: this.userCreate_0.usr_firstname,
      usr_lastname: this.userCreate_0.usr_lastname,
      usr_desc: this.userCreate_0.usr_desc,
      agc_id: this.userCreate_0.agc_id,
      prfl_id: this.userCreate_0.prfl_id,
    }, { abortEarly: false });

    // Copier les valeurs
    this.userCreate.usr_login = this.userCreate_0.usr_login;
    this.userCreate.usr_firstname = this.userCreate_0.usr_firstname;
    this.userCreate.usr_lastname = this.userCreate_0.usr_lastname;
    this.userCreate.usr_desc = this.userCreate_0.usr_desc;
    this.userCreate.agc_id = this.userCreate_0.agc_id;
    this.userCreate.prfl_id = this.userCreate_0.prfl_id;
    this.userCreate.usr_password = this.valuePswd;

    this.submitted = true;

    // 🔥 Création utilisateur
    this.profilDroitsUser.createUser(this.userCreate).subscribe({
      next: async () => {
        this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Utilisateur créé avec succès', life: 3000 });

        // Envoyer SMS
        this.recipient_.id = 0;
        this.recipient_.value = this.userCreate.usr_desc;
        this.recipients.push(this.recipient_);

        this.sms.signature = "COSAMA";
        this.sms.subject = `Nouvel Accès`;
        this.sms.content = `Votre login : ${this.userCreate.usr_login}, Votre mot de passe à changer : ${this.userCreate.usr_password}`;
        this.sms.recipients = this.recipients;

        this.parametrageService.sendSMS("808f77dd3df865774d33996cce2f4782", this.sms).subscribe({
          next: response => console.info('SMS envoyé avec succès', response),
          error: error => console.error('Erreur envoi SMS', error)
        });

        // Actualiser la liste des utilisateurs sans quitter la page
        await this.getAllUsers(); // méthode que tu dois avoir pour rafraîchir la liste

        

        // Réinitialiser formulaire
        this.userCreate_0 = {
          usr_id: 0,
          usr_login: '',
          usr_firstname: '',
          usr_lastname: '',
          usr_password: '',
          usr_desc: '',
          usr_etat: false,
          agc_id: 0,
          prfl_id: 0
        };

        this.valuePswd = '';
        this.productDialog0 = false;

        this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Utilisateur créé avec succés', life: 4000 });
      },
      error: error => {
        console.error('ERROR', error);
        this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
      }
    });

  } catch (err: any) {
    // Gestion erreurs Yup
    if (err.inner) {
      err.inner.forEach((e: any) => {
        this.errors[e.path] = e.message;
      });
    }
    console.warn("Erreurs de validation:", this.errors);
  }
}



  updateUser(id:number)
  {

    // Utilisation de la fonction
    const user = this.findUserById(id);

    //console.log(this.selectedFile);
    this.submitted = true;

    if (user) {
      console.log(`User trouvé :`, user);
    } else {
      console.log(`User avec l'ID ${id} non trouvé.`);
    }

    console.log(`modifications :`, this.userEdit);

    user.usr_login = this.userEdit.usr_login;
    user.usr_firstname = this.userEdit.usr_firstname;
    user.usr_lastname = this.userEdit.usr_lastname;
    user.usr_desc = this.userEdit.usr_desc;
    user.agc_id = this.userEdit.agc_id;
    user.prfl_id = this.userEdit.prfl_id;

    console.log(`User à poster :`, user);
    console.log(`Id à poster :`, id);
    
    this.profilDroitsUser.updateUser(id, user).subscribe({
      next: () => {
          //console.log(bateau);
          this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'User mis à jour avec succés', life: 3000 });
      },
      error: error => {
          console.error('ERROR', error);
          this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur dans la mise à jour', life: 3000 });
      }
    });
    
    this.userEditDialog = false;
  }

  updateEtatUser(id:number)
  {

    // Utilisation de la fonction
    const user = this.findUserById(id);

    if (user) {
      console.log(`User trouvé :`, user);
    } else {
      console.log(`User avec l'ID ${id} non trouvé.`);
    }

    this.userEdit3.usr_etat = !user.usr_etat;
    this.userEdit3.usr_activ = this.user;

    console.log(`User à poster :`, this.userEdit3);
    console.log(`Id à poster :`, id);
    
    this.profilDroitsUser.updateEtatUser(id, this.userEdit3).subscribe({
      next: () => {
          window.location.reload();
          this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'User mis à jour avec succés', life: 3000 });
      },
      error: error => {
          console.error('ERROR', error);
          this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur dans la mise à jour', life: 3000 });
      }
    });
    
    this.userEditDialog = false;
  }


  onGlobalFilter(table: Table, event: any) {
    const value = event.target.value;
    console.log("Recherche :", value);
    table.filterGlobal(value, 'contains');
  }



  resetPassword(id:number)
  {
    // Utilisation de la fonction
    let user = this.userEdit2;
    user = this.findUserById(id);

    let call : string;

    //console.log(this.selectedFile);
    this.submitted = true;

    if (user) 
    {
      console.log(`User trouvé :`, user);
      call = user.usr_desc;
      console.log(call);
    } 
    else 
    {
      console.log(`User avec l'ID ${id} non trouvé.`);
    }
    
    console.log(`modifications :`, this.rp);

    user.usr_password = this.rp.usr_password;

    console.log(`User à poster :`, user);
    console.log(`Id à poster :`, id);
    
    this.profilDroitsUser.resetPassword(id, user).subscribe({
      next: () => {
            this.recipient_.id = 0;
            this.recipient_.value = user.usr_desc;
            this.recipients.push(this.recipient_);
            this.sms.signature = "COSAMA";
            this.sms.subject = `Nouvel Accés`;
            this.sms.content = `Votre mot de passe a été changé par : ${this.appMain.user.login}, le nouveau : ${user.usr_password}`;
            this.sms.recipients = this.recipients;
            this.parametrageService.sendSMS("808f77dd3df865774d33996cce2f4782", this.sms).subscribe({
              next : response => {
                console.info('SMS envoye avec succes', response);
              },
              error: (error) => {
                console.error('Error envoie', error);
              }
            })
          this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Mot de passe réinitialisé avec succés', life: 3000 });
      },
      error: error => {
          console.error('ERROR', error);
          this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur dans la mise à jour', life: 3000 });
      }
    });
    
    this.resetPasswordDialog = false;
  }

  saveProduct2(id:number)
  {

    // Utilisation de la fonction
    const profil = this.findProfilById(id);

    //console.log(this.selectedFile);
    this.submitted = true;

    if (profil) {
      console.log(`Profil trouvé :`, profil);
    } else {
      console.log(`Profil avec l'ID ${id} non trouvé.`);
    }

    console.log(`modifications :`, this.profilEdit);

    profil.edit_param = this.profilEdit.edit_param;
    profil.add_voyage = this.profilEdit.add_voyage;
    profil.edit_voyage = this.profilEdit.edit_voyage;
    profil.cancel_voyage = this.profilEdit.cancel_voyage;
    profil.view_voyage = this.profilEdit.view_voyage;
    profil.plan_voyage = this.profilEdit.plan_voyage;
    profil.bloq_places = this.profilEdit.bloq_places;
    profil.rechercher = this.profilEdit.rechercher;
    profil.add_billet = this.profilEdit.add_billet;
    profil.edit_billet = this.profilEdit.edit_billet;
    profil.cancel_billet = this.profilEdit.cancel_billet;
    profil.do_remboursement = this.profilEdit.do_remboursement;
    profil.do_rep_surclassment = this.profilEdit.do_rep_surclassment;
    profil.add_check_billet = this.profilEdit.add_check_billet;
    profil.add_embarqment = this.profilEdit.add_embarqment;
    profil.add_fret = this.profilEdit.add_fret;
    profil.edit_fret = this.profilEdit.edit_fret;
    profil.cancel_fret = this.profilEdit.cancel_fret;
    profil.paye_fret = this.profilEdit.paye_fret;
    profil.del_fret_details = this.profilEdit.del_fret_details;
    profil.check_fret = this.profilEdit.check_fret;
    profil.add_clt_compte = this.profilEdit.add_clt_compte;
    profil.edit_clt_compte = this.profilEdit.edit_clt_compte;
    profil.add_reglement = this.profilEdit.add_reglement;
    profil.del_reglement = this.profilEdit.del_reglement;
    profil.add_facture = this.profilEdit.add_facture;
    profil.edit_facture = this.profilEdit.edit_facture;
    profil.edition = this.profilEdit.edition;
    profil.view_stat = this.profilEdit.view_stat;
    profil.view_etat = this.profilEdit.view_etat;
    profil.campagne = this.profilEdit.campagne;
    profil.reclamation = this.profilEdit.reclamation;

    console.log(`Profil à poster :`, profil);
    console.log(`Profil à poster :`, id);
    
    this.profilDroitsUser.updateProfil(id, profil).subscribe({
      next: () => {
          //console.log(bateau);
          this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Profils mis à jour avec succés', life: 3000 });
      },
      error: error => {
          console.error('ERROR', error);
          this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur dans la mise à jour', life: 3000 });
      }
    });
    
    this.droitsEditDialog = false;
  }

  findProfilById(prflId: number) {
    console.log("Recherche du bateau avec l'ID:" + prflId);
    console.log(this.profils);
  
    for (let i = 0; i < this.profils.length; i++) 
      {
      this.profilEdit2 = this.profils[i];
      console.log(this.profilEdit2);
      if (prflId == this.profilEdit2.prfl_id) {
        return this.profilEdit2; // Retourner l'objet bateau trouvé
      }
    }
    return null; // Retourner null si aucun bateau n'est trouvé
  }

  findUserById(usrId: number) {
    console.log("Recherche du user avec l'ID:" + usrId);
    console.log(this.users);
  
    for (let i = 0; i < this.users.length; i++) 
      {
      this.userEdit2 = this.users[i];
      console.log(this.userEdit2);
      if (usrId == this.userEdit2.usr_id) {
        return this.userEdit2; // Retourner l'objet bateau trouvé
      }
    }
    return null; // Retourner null si aucun bateau n'est trouvé
  }




  
}