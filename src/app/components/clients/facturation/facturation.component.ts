import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { Table } from 'primeng/table';
import { firstValueFrom } from 'rxjs';
import { AppMainComponent } from 'src/app/app.main.component';
import { Product } from 'src/app/demo/domain/product';
import { NodeService } from 'src/app/demo/service/nodeservice';
import { Agence } from 'src/app/model/Agence.model';
import { Bateau } from 'src/app/model/Bateau.model';
import { ClientEnCompte } from 'src/app/model/ClientEnCompte.model';
import { CltDetailsFacture } from 'src/app/model/CltDetailsFacture.model';
import { CltModeRglmt } from 'src/app/model/CltModeRglmt.model';
import { Facturation } from 'src/app/model/Facturation.model';
import { FretDTO } from 'src/app/model/FretClt.model';
import { GroupeFacture } from 'src/app/model/GroupeFactures.model';
import { AgenceService } from 'src/app/services/agence.service';
import { AuthService } from 'src/app/services/auth.service';
import { BateauService } from 'src/app/services/bateau.service';
import { ClientencompteService } from 'src/app/services/clientencompte.service';

@Component({
  selector: 'app-facturation',
  templateUrl: './facturation.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./facturation.component.scss']
})
export class FacturationComponent implements OnInit {
  productDialog: boolean = false;
  productDialog2: boolean = false;
  productDialog3: boolean = false;
  productDialog4: boolean = false;

  deleteProductDialog: boolean = false;
  stateBateauDialog: boolean = false;

  products: Product[] = [];

  frets: FretDTO[] = [];

  frets_: FretDTO[] = [];

  clientEnComptes : ClientEnCompte[] = [];

  cltModeRglmts : CltModeRglmt[] = [];

  getFacturesGroupe : GroupeFacture[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 15];

  startDate : string = '';
  
  endDate : string = '';

  startDate2 : string = '';
  
  endDate2 : string = '';

  idCltCmpt : number;

  public token: any;

  public user : string;

  ligneFactDetails : CltDetailsFacture[] = [];
  ligneFactDetailsEdit : CltDetailsFacture[] = [];

  ligneFactCreate : CltDetailsFacture = {
    lignefct_id: 0,
    description_ligne: '',
    fret_id: 0,
    etat_ligne: false,
    cltfct_id: 0,
    montant_ligne: 0,
    montant_ligne_tva: 0
  };

  ligneFactEdit : CltDetailsFacture = {
    lignefct_id: 0,
    description_ligne: '',
    fret_id: 0,
    etat_ligne: false,
    cltfct_id: 0,
    montant_ligne: 0,
    montant_ligne_tva: 0
  };

  facture : Facturation = {
    cltfct_id: 0,
    fact_code: '',
    firstname: '',
    lastname: '',
    telephone: '',
    adresse: '',
    observation: '',
    clt_tr: 0,
    id_cltcmpt: 0,
    montant_facture: 0,
    tva_facture: 0,
    cltDetailsFactures: [],
    libelle: '',
    est_emis: false,
    montant_verse: 0,
    etat_facturation: 0,
    ref_paieFacture: '',
    reliquat: 0
  }

  facturationCreate : Facturation = {
    cltfct_id: 0,
    fact_code: '',
    firstname: '',
    lastname: '',
    telephone: '',
    adresse: '',
    observation: '',
    clt_tr: 0,
    id_cltcmpt: 0,
    montant_facture: 0,
    tva_facture: 0,
    cltDetailsFactures: [],
    libelle: '',
    est_emis: false,
    montant_verse: 0,
    etat_facturation: 0,
    ref_paieFacture: '',
    reliquat: 0
  }

  facturationEdit : Facturation = {
    cltfct_id: 0,
    fact_code: '',
    firstname: '',
    lastname: '',
    telephone: '',
    adresse: '',
    observation: '',
    clt_tr: 0,
    id_cltcmpt: 0,
    montant_facture: 0,
    tva_facture: 0,
    cltDetailsFactures: [],
    libelle: '',
    est_emis: false,
    montant_verse: 0,
    etat_facturation: 0,
    ref_paieFacture: '',
    reliquat: 0
  }

  constructor(public appMain: AppMainComponent, private readonly authService: AuthService, private readonly clientEnCompteService : ClientencompteService, private readonly messageService: MessageService, private readonly confirmationService: ConfirmationService) 
  { 

  }

  ngOnInit() {
    //this.loadImagesForBateaux();
    this.clientEnCompteService.getAllClientEnCompte().subscribe((response:any) => 
      {
        this.clientEnComptes = response;
        console.log(this.clientEnComptes);
      }
    );

    this.clientEnCompteService.getAllModeRglmt().subscribe((response:any) => 
      {
        this.cltModeRglmts = response;
        console.log(this.cltModeRglmts);
      }
    );

    this.clientEnCompteService.getFacturesGroupees().subscribe((response:any) => 
      {
        this.getFacturesGroupe = response;
        console.log(this.getFacturesGroupe);
      }
    );

      this.cols = [
          { field: 'name', header: 'Name' },
          { field: 'size', header: 'Size' },
          { field: 'type', header: 'Type' }
      ];

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];

      this.authService.token$.subscribe(response => {
        if (response) {
            this.token = response; // Mettez à jour la variable locale avec le token
        }
      });
  
      this.user = this.appMain.user.login;
  }

  onClientSelected(cltcmptId: number) {
    const client = this.clientEnComptes.find(c => c.cltcmptId === cltcmptId);
  
    if (client) {
      // Remplir les autres champs automatiquement
      this.facturationCreate.firstname = client.firstnameContact;
      this.facturationCreate.adresse = client.mail;
      this.facturationCreate.telephone = client.contact;
      this.facturationCreate.lastname = client.lastnameContact;
      // etc. selon ce que tu veux copier
    }
  }

  saveLineFact()
  {
    const ligne = {
      lignefct_id: this.ligneFactDetails.length + 1,
      description_ligne: this.ligneFactCreate.description_ligne,
      fret_id: 0,
      etat_ligne: false,
      cltfct_id: 0,
      montant_ligne: Number(this.ligneFactCreate.montant_ligne),
      montant_ligne_tva: this.ligneFactCreate.montant_ligne * 0.18,
    };
    this.ligneFactDetails.push(ligne);
    console.log(this.ligneFactDetails);
    this.productDialog2 = false;
  }

  saveLineFact_()
  {
    const ligne = {
      lignefct_id: this.ligneFactDetailsEdit.length + 1,
      description_ligne: this.ligneFactEdit.description_ligne,
      fret_id: 0,
      etat_ligne: false,
      cltfct_id: 0,
      montant_ligne: Number(this.ligneFactEdit.montant_ligne),
      montant_ligne_tva: this.ligneFactEdit.montant_ligne * 0.18,
    };
    this.ligneFactDetailsEdit.push(ligne);
    console.log(this.ligneFactDetailsEdit);
    this.productDialog4 = false;
  }

  getFretsForCltCpt()
  {
    console.log(this.facturationCreate.id_cltcmpt," ",this.startDate," ",this.endDate);
    if (this.facturationCreate.id_cltcmpt && this.startDate && this.endDate)
    {
      const dateFormatted1 = formatDate(this.startDate, 'yyyy-MM-dd', 'en-US');
      const dateFormatted2 = formatDate(this.endDate, 'yyyy-MM-dd', 'en-US');
      this.clientEnCompteService.getFretsByCltCompte(this.facturationCreate.id_cltcmpt, dateFormatted1, dateFormatted2).subscribe((response:any) => 
        {
          this.frets_ = response;
          console.log(this.frets_);

          // Vide ligneFactDetails si besoin
          this.ligneFactDetails = [];

          for (let fret of this.frets_) 
          {
            // Vérifie si un élément avec le même fretCode existe déjà
            const exists = this.ligneFactDetails.some(ligne => ligne.description_ligne === fret.fretCode);
          
            if (!exists) 
              {
              const ligne = {
                lignefct_id: this.ligneFactDetails.length + 1,
                description_ligne: fret.fretCode,
                fret_id: fret.fretId,
                etat_ligne: fret.applyPayment,
                cltfct_id: 0,
                montant_ligne: fret.fretMontant_ht,
                montant_ligne_tva: fret.fretTva
              };
          
              this.ligneFactDetails.push(ligne);
              }
          }         
        }
      );
    }   
  }

  getFretsForCltCpt_()
  {
    console.log(this.facturationEdit.id_cltcmpt," ",this.startDate2," ",this.endDate2);
    if (this.facturationEdit.id_cltcmpt && this.startDate2 && this.endDate2)
    {
      const dateFormatted1_ = formatDate(this.startDate2, 'yyyy-MM-dd', 'en-US');
      const dateFormatted2_ = formatDate(this.endDate2, 'yyyy-MM-dd', 'en-US');
      this.clientEnCompteService.getFretsByCltCompte(this.facturationEdit.id_cltcmpt, dateFormatted1_, dateFormatted2_).subscribe((response:any) => 
        {
          this.frets_ = response;
          console.log(this.frets_);

          for (let fret of this.frets_) 
          {
            // Vérifie si un élément avec le même fretCode existe déjà
            const exists = this.ligneFactDetailsEdit.some(ligne => ligne.description_ligne === fret.fretCode);
          
            if (!exists) 
              {
              const ligne = {
                lignefct_id: this.ligneFactDetailsEdit.length + 1,
                description_ligne: fret.fretCode,
                fret_id: fret.fretId,
                etat_ligne: fret.applyPayment,
                cltfct_id: 0,
                montant_ligne: fret.fretMontant_ht,
                montant_ligne_tva: fret.fretTva
              };
          
              this.ligneFactDetailsEdit.push(ligne);
              }
          } 
          console.log(this.ligneFactDetailsEdit);     
        }
      );
    }
  }

  removeLineFact_(lignefct_id: number) {
    this.ligneFactDetailsEdit = this.ligneFactDetailsEdit.filter(
      ligne => ligne.lignefct_id !== lignefct_id
    );
  }

  openNew() {
      //this.bateauCreate = {};
      this.submitted = false;
      this.productDialog = true;
  }

  openNew2() {
    //this.bateauCreate = {};
    this.submitted = false;
    this.productDialog2 = true;
}

openNew3() {
  //this.bateauCreate = {};
  this.submitted = false;
  this.productDialog4 = true;
}

editFacture(facture : Facturation) {
  //this.bateauCreate = {};
  this.facturationEdit = { ...facture };
  this.ligneFactDetailsEdit = this.facturationEdit.cltDetailsFactures;
  console.log(this.ligneFactDetailsEdit);
  this.productDialog3 = true;
}


//   getFolderClt(clientEnCompte : ClientEnCompte) {
//     this.clientEnCompteEdit = { ...clientEnCompte };
//     this.productDialog3 = true;
//     this.clientEnCompteService.getFretByCltCmpt(clientEnCompte.cltcmptId).subscribe((response:any) => 
//       {
//         this.frets = response;
//         console.log(this.frets);
//       }
//     );
    
// }

  deleteProduct(product: Product) {
      this.deleteProductDialog = true;
      this.product = { ...product };
  }
  

  confirmDelete() {
      this.deleteProductDialog = false;
      this.products = this.products.filter(val => val.id !== this.product.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      this.product = {};
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct() 
  {

    const totalMontantHT = this.ligneFactDetails.reduce((somme, ligne) => {
      return somme + (ligne.montant_ligne || 0);
    }, 0);

    const totalMontantTVA = this.ligneFactDetails.reduce((somme, ligne) => {
      return somme + (ligne.montant_ligne_tva || 0);
    }, 0);

    this.facturationCreate.cltDetailsFactures = this.ligneFactDetails;
    this.facturationCreate.montant_facture = totalMontantHT;
    this.facturationCreate.tva_facture = totalMontantTVA;

    console.log(this.facturationCreate);
    
    this.clientEnCompteService.createFacturation(this.facturationCreate, this.user).subscribe({
        next: () => {
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Facture créée avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });

    window.location.reload();
    this.productDialog = false;

  } 


  saveFacture()
  {

    const totalMontantHT_ = this.ligneFactDetailsEdit.reduce((somme, ligne) => {
      return somme + (ligne.montant_ligne || 0);
    }, 0);

    const totalMontantTVA_ = this.ligneFactDetailsEdit.reduce((somme, ligne) => {
      return somme + (ligne.montant_ligne_tva || 0);
    }, 0);

    this.facturationEdit.montant_facture = totalMontantHT_;
    this.facturationEdit.tva_facture = totalMontantTVA_;

    const factureUpdate_ = {
      cltfct_id: this.facturationEdit.cltfct_id,
      observation: this.facturationEdit.observation,
      libelle: this.facturationEdit.libelle,
      est_emis: this.facturationEdit.est_emis,
      montant_facture: this.facturationEdit.montant_facture,
      tva_facture: this.facturationEdit.tva_facture,
      cltDetailsFactures: this.ligneFactDetailsEdit
    };

    console.log(`Facture à poster :`, factureUpdate_);
    
    this.clientEnCompteService.updateFacture(this.facturationEdit.cltfct_id, factureUpdate_, true).subscribe({


      next: () => {
          //console.log(bateau);
          this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Facture mise à jour avec succés', life: 3000 });
      },
      error: error => {
          console.error('ERROR', error);
          this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur lors de la création', life: 3000 });
      }
    });
    
    this.productDialog2 = false;
  }

  saveFacture_()
  {

    const totalMontantHT_ = this.ligneFactDetailsEdit.reduce((somme, ligne) => {
      return somme + (ligne.montant_ligne || 0);
    }, 0);

    const totalMontantTVA_ = this.ligneFactDetailsEdit.reduce((somme, ligne) => {
      return somme + (ligne.montant_ligne_tva || 0);
    }, 0);

    this.facturationEdit.montant_facture = totalMontantHT_;
    this.facturationEdit.tva_facture = totalMontantTVA_;

    const factureUpdate_ = {
      cltfct_id: this.facturationEdit.cltfct_id,
      observation: this.facturationEdit.observation,
      libelle: this.facturationEdit.libelle,
      est_emis: this.facturationEdit.est_emis,
      montant_facture: this.facturationEdit.montant_facture,
      tva_facture: this.facturationEdit.tva_facture,
      cltDetailsFactures: this.ligneFactDetailsEdit
    };

    console.log(`Facture à poster :`, factureUpdate_);
    
    this.clientEnCompteService.updateFacture(this.facturationEdit.cltfct_id, factureUpdate_, true).subscribe({
      next: () => {
          //console.log(bateau);
          this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Facture mise à jour avec succés', life: 3000 });
      },
      error: error => {
          console.error('ERROR', error);
          this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur lors de la création', life: 3000 });
      }
    });
    
    this.productDialog2 = false;
  }
  
  getFactureByCode(factCode: string): Facturation | null {
    for (let i = 0; i < this.getFacturesGroupe.length; i++) {
      const groupe = this.getFacturesGroupe[i];
  
      for (let j = 0; j < groupe.factures.length; j++) {
        const facture = groupe.factures[j];
  
        if (facture.fact_code === factCode) {
          return facture;
        }
      }
    }
      
    console.warn("Aucune facture trouvée avec l'ID:", factCode);
    return null; // Si aucune facture ne correspond
  }
  
  
  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}