import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/domain/product';
import { Agence } from 'src/app/model/Agence.model';
import { Bateau } from 'src/app/model/Bateau.model';
import { ClientEnCompte } from 'src/app/model/ClientEnCompte.model';
import { CltModeRglmt } from 'src/app/model/CltModeRglmt.model';
import { FretDTO } from 'src/app/model/FretClt.model';
import { AgenceService } from 'src/app/services/agence.service';
import { BateauService } from 'src/app/services/bateau.service';
import { ClientencompteService } from 'src/app/services/clientencompte.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  productDialog: boolean = false;
  productDialog2: boolean = false;
  productDialog3: boolean = false;

  deleteProductDialog: boolean = false;
  stateBateauDialog: boolean = false;

  products: Product[] = [];

  frets: FretDTO[] = [];


  clientEnComptes : ClientEnCompte[] = [];

  cltModeRglmts : CltModeRglmt[] = [];

  clientEnCompte : ClientEnCompte = {
    //bat_photo_name: '',
    cltcmptId: 0,
    raisonSocial: '',
    firstnameContact: '',
    lastnameContact: '',
    contact: '',
    mail: '',
    cptgen_compta: '',
    cpttiers_compta: '',
    soldeCompte: 0,
    plafond: 0,
    billets: [],
    frets: [],
    logsSoldes: [],
    cltFactures: [],
    modergltId: 0
  };
  
  clientEnCompteEdit : ClientEnCompte = {
    //bat_photo_name: '',
    cltcmptId: 0,
    raisonSocial: '',
    firstnameContact: '',
    lastnameContact: '',
    contact: '',
    mail: '',
    cptgen_compta: '',
    cpttiers_compta: '',
    soldeCompte: 0,
    plafond: 0,
    billets: [],
    frets: [],
    logsSoldes: [],
    cltFactures: [],
    modergltId: 0
  };

  clientEnCompteCreate : ClientEnCompte = {
    //bat_photo_name: '',
    cltcmptId: 0,
    raisonSocial: '',
    firstnameContact: '',
    lastnameContact: '',
    contact: '',
    mail: '',
    cptgen_compta: '',
    cpttiers_compta: '',
    soldeCompte: 0,
    plafond: 0,
    billets: [],
    frets: [],
    logsSoldes: [],
    cltFactures: [],
    modergltId: 0
  };

  //bateauEdit: BateauCreate = {};
  clientEnCompteCreate2 : ClientEnCompte = {
    //bat_photo_name: '',
    cltcmptId: 0,
    raisonSocial: '',
    firstnameContact: '',
    lastnameContact: '',
    contact: '',
    mail: '',
    cptgen_compta: '',
    cpttiers_compta: '',
    soldeCompte: 0,
    plafond: 0,
    billets: [],
    frets: [],
    logsSoldes: [],
    cltFactures: [],
    modergltId: 0
  };

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 15];

  constructor(private readonly clientEnCompteService : ClientencompteService, private messageService: MessageService, private confirmationService: ConfirmationService) 
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
    
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name_bateau', header: 'Nom Bateau' },
      { field: 'owner', header: 'Gestionnaire' },
      { field: 'places', header: 'Nombre de places' }
      ];

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];
  }



  openNew() {
      //this.bateauCreate = {};
      this.submitted = false;
      this.productDialog = true;
  }


  editProduct(clientEnCompte : ClientEnCompte) {
      this.clientEnCompteEdit = { ...clientEnCompte };
      this.productDialog2 = true;
  }

  getFolderClt(clientEnCompte : ClientEnCompte) {
    this.clientEnCompteEdit = { ...clientEnCompte };
    this.productDialog3 = true;
    this.clientEnCompteService.getFretByCltCmpt(clientEnCompte.cltcmptId).subscribe((response:any) => 
      {
        this.frets = response;
        console.log(this.frets);
      }
    );
    
}

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
    console.log(this.clientEnCompteCreate.cltcmptId);
    this.clientEnCompte.raisonSocial = this.clientEnCompteCreate.raisonSocial;
    this.clientEnCompte.firstnameContact = this.clientEnCompteCreate.firstnameContact;
    this.clientEnCompte.lastnameContact = this.clientEnCompteCreate.lastnameContact;
    this.clientEnCompte.mail = this.clientEnCompteCreate.mail;
    this.clientEnCompte.contact = this.clientEnCompteCreate.contact;
    this.clientEnCompte.plafond = this.clientEnCompteCreate.plafond;
    this.clientEnCompte.soldeCompte = 0;
    this.clientEnCompte.cptgen_compta = this.clientEnCompteCreate.cptgen_compta;
    this.clientEnCompte.cpttiers_compta = this.clientEnCompteCreate.cpttiers_compta;
    this.clientEnCompte.modergltId = this.clientEnCompteCreate.modergltId;   
    
    //console.log(this.selectedFile);
    this.submitted = true;
    
    this.clientEnCompteService.createClientEnCompte(this.clientEnCompte).subscribe({
        next: () => {
            window.location.reload();
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Client en compte créé avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    
    this.productDialog = false;
    //this.bateauCreate = {};

  } 

  
  findCltCmptById(cltCmptId: number) {
    console.log("Recherche du bateau avec l'ID:" + cltCmptId);
    console.log(this.clientEnComptes);
  
    for (let i = 0; i < this.clientEnComptes.length; i++) 
      {
      this.clientEnCompteCreate2 = this.clientEnComptes[i];

      if (cltCmptId == this.clientEnCompteCreate2.cltcmptId) {
        //console.log("Bateau trouvé: ", JSON.stringify(this.bateauCreate2, null, 2));
        return this.clientEnCompteCreate2; // Retourner l'objet bateau trouvé
      }
    }
  
    console.warn("Aucun bateau trouvé avec l'ID:", cltCmptId);
    return null; // Retourner null si aucun bateau n'est trouvé
  }
  

  saveProduct2(id:number)
  {
    
    // Utilisation de la fonction
    const cltEnCompte = this.findCltCmptById(id);

    this.submitted = true;

    if (cltEnCompte) 
    {
      console.log(`Client en compte trouvé :`, cltEnCompte);
    } 
    else 
    {
      console.log(`Client en compte avec l'ID ${id} non trouvé.`);
    }

    console.log(`modifications :`, this.clientEnCompteEdit);

    cltEnCompte.raisonSocial = this.clientEnCompteEdit.raisonSocial;
    cltEnCompte.firstnameContact = this.clientEnCompteEdit.firstnameContact;
    cltEnCompte.lastnameContact = this.clientEnCompteEdit.lastnameContact;
    cltEnCompte.mail = this.clientEnCompteEdit.mail;
    cltEnCompte.contact = this.clientEnCompteEdit.contact;
    cltEnCompte.plafond = this.clientEnCompteEdit.plafond;
    cltEnCompte.modergltId = this.clientEnCompteEdit.modergltId;

    console.log(`Client en compte à poster :`, cltEnCompte);
    
    this.clientEnCompteService.updateClientEnCompte(cltEnCompte).subscribe({
      next: () => {
          //console.log(bateau);
          this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Client en compte mis à jour avec succés', life: 3000 });
      },
      error: error => {
          console.error('ERROR', error);
          this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur lors de la création', life: 3000 });
      }
    });
    
    this.productDialog2 = false;
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
