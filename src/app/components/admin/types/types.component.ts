import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { AgenceCreate } from 'src/app/model/Agence';
import { Agence } from 'src/app/model/Agence.model';
import { BagageCreate } from 'src/app/model/BagageCreate';
import { Bagage } from 'src/app/model/Bagages.model';
import { Niveau } from 'src/app/model/Niveau.model';
import { TypePiece } from 'src/app/model/TypePiece.model';
import { UniteCreate } from 'src/app/model/Unite';
import { Unite } from 'src/app/model/Unite.model';
import { Ville } from 'src/app/model/Ville.model';
import { Volume } from 'src/app/model/Volume.model';
import { AgenceService } from 'src/app/services/agence.service';
import { ParametrageService } from 'src/app/services/parametrage.service';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  productDialog: boolean = false;

  editAgence: boolean = false;

  editUnite: boolean = false;
  
  editBagage: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  uniteDialog: boolean = false;

  typeproductDialog: boolean = false;

  niveauDialog: boolean = false;

  typebagageEdit: boolean = false;

  typeniveauEdit: boolean = false;

  typepieceEdit: boolean = false;

  villesEdit: boolean = false;

  typepieceDialog: boolean = false;

  villeDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];
  cols1: any[] = [];
  cols2: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  agences : Agence[] = [];

  niveaux : Niveau[] = [];

  volumes : Volume[] = [];

  unites : Unite[] = [];

  bagages : Bagage[] = [];

  typePiece : TypePiece =
  {
    tpiece_id: 0,
    tpiece_nom: '',
    dispo: false
  };

  typePieceEdit : TypePiece =
  {
    tpiece_id: 0,
    tpiece_nom: '',
    dispo: false
  };

  typePieceCreate : TypePiece =
  {
    tpiece_id: 0,
    tpiece_nom: '',
    dispo: false
  };

  typePieceUpdate : TypePiece =
  {
    tpiece_id: 0,
    tpiece_nom: '',
    dispo: false
  };

  ville : Ville =
  {
    vil_id: 0,
    vil_code: '',
    vil_nom: ''
  };


  villeEdit : Ville =
  {
    vil_id: 0,
    vil_code: '',
    vil_nom: ''
  };

  villeUpdate : Ville =
  {
    vil_id: 0,
    vil_code: '',
    vil_nom: ''
  };

  villeCreate : Ville =
  {
    vil_id: 0,
    vil_code: '',
    vil_nom: ''
  };

  agence : Agence = {
      agc_id: 0,
      agc_nom: '',
      agc_tel: '',
      agc_fax: '',
      agc_resp: '',
      code_agc: '',
      vil_id: 0,
      sigle: ''
  };

  agenceUpdate : Agence = {
    agc_id: 0,
    agc_nom: '',
    agc_tel: '',
    agc_fax: '',
    agc_resp: '',
    code_agc: '',
    vil_id: 0,
    sigle: ''
  };

  agenceEdit : Agence = {
    agc_id: 0,
    agc_nom: '',
    agc_tel: '',
    agc_fax: '',
    agc_resp: '',
    code_agc: '',
    vil_id: 0,
    sigle: ''
  }

  unite : Unite = {
      unite_id: 0,
      unite_nom: '',
      unite_code: '',
      vol_id: 0
  }

  uniteEdit : Unite = {
    unite_id: 0,
    unite_nom: '',
    unite_code: '',
    vol_id: 0
}

uniteUpdate : Unite = {
  unite_id: 0,
  unite_nom: '',
  unite_code: '',
  vol_id: 0
}

bagageCreate : Bagage = {
  tbg_id: 0,
  tbg_nom: '',
  etat: false,
  code: '',
  unite_id: 0,
  vol_id: 0
}


bagageUpdate : Bagage = {
  tbg_id: 0,
  tbg_nom: '',
  etat: false,
  code: '',
  unite_id: 0,
  vol_id: 0
}

bagageEdit : Bagage = {
  tbg_id: 0,
  tbg_nom: '',
  etat: false,
  code: '',
  unite_id: 0,
  vol_id: 0
}

bagage : Bagage = {
  tbg_id: 0,
  tbg_nom: '',
  etat: false,
  code: '',
  unite_id: 0,
  vol_id: 0
}

  villes : Ville[] = [];

  typePieces : TypePiece[] = [];

  agenceCreate : AgenceCreate = {};
  uniteCreate : UniteCreate = {};

  niveauCreate : Niveau = {
    niv_id: 0,
    niv_nom: ''
  }

  niveau : Niveau = {
    niv_id: 0,
    niv_nom: ''
  }

  
  niveauEdit : Niveau = {
    niv_id: 0,
    niv_nom: ''
  }

  
  niveauUpdate : Niveau = {
    niv_id: 0,
    niv_nom: ''
  }

  constructor(private readonly paramService: ParametrageService, private readonly typeService: TypeService, private readonly agenceService: AgenceService, private readonly productService: ProductService, private readonly messageService: MessageService, private readonly confirmationService: ConfirmationService) { }

  ngOnInit() {
      //this.productService.getProducts().then(data => this.products = data);


      this.paramService.getVilles().subscribe((response:any) => 
        {
        this.villes = response;
        console.log(this.villes);
        }
      );

      this.paramService.getTypePieces().subscribe((response:any) => 
        {
        this.typePieces = response;
        console.log(this.typePieces);
        }
      );

      this.agenceService.getAgences().subscribe((response:any) => 
        {
        this.agences = response;
        console.log(this.agences);
        }
      );

      this.agenceService.getVilles().subscribe((response:any) => 
        {
        this.villes = response;
        console.log(this.villes);
        }
      );

      this.typeService.getUnites().subscribe((response:any) => 
        {
        this.unites = response;
        console.log(this.unites);
        }
      );

      this.typeService.getVolumes().subscribe((response:any) => 
        {
        this.volumes = response;
        console.log(this.volumes);
        }
      );

      
      this.typeService.getBagages().subscribe((response:any) => 
        {
        this.bagages = response;
        console.log(this.bagages);
        }
      );

      this.typeService.getNiveaux().subscribe((response:any) => 
        {
        this.niveaux = response;
        console.log(this.niveaux);
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
        { field: 'libelle', header: 'Libellé' },
        { field: 'code', header: 'Code' },
        { field: 'actions', header: 'Actions' }
    ];

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  createNewUnite() {
    //this.unite = {};
    this.submitted = false;
    this.uniteDialog = true;
}

createNewProduct() {
  //this.unite = {};
  this.submitted = false;
  this.typeproductDialog = true;
}

createNewNiveau() {
  //this.unite = {};
  this.submitted = false;
  this.niveauDialog = true;
}

createNewTypePiece() {
  //this.unite = {};
  this.submitted = false;
  this.typepieceDialog = true;
}

createNewVille() {
  //this.unite = {};
  this.submitted = false;
  this.villeDialog = true;
}

modifUnite(unite: Unite) {
  console.log(unite);
  this.uniteEdit = { ...unite };
  this.editUnite = true;
}

modifBagage(bagage: Bagage) {
  this.bagageEdit = { ...bagage };
  console.log(this.bagageEdit);
  this.typebagageEdit = true;
}

modifNiveau(niveau: Niveau) {
  this.niveauEdit = { ...niveau };
  console.log(this.niveauEdit);
  this.typeniveauEdit = true;
}

modifTypePiece(typePiece: TypePiece) {
  this.typePieceEdit = { ...typePiece };
  console.log(this.typePieceEdit);
  this.typepieceEdit = true;
}

modifVille(ville: Ville) {
  this.villeEdit = { ...ville };
  console.log(this.villeEdit);
  this.villesEdit = true;
}


  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: Product) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteProduct(product: Product) {
      this.deleteProductDialog = true;
      this.product = { ...product };
  }

  confirmDeleteSelected() {
      this.deleteProductsDialog = false;
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      this.selectedProducts = [];
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

  saveAgence() 
  {
    console.log(this.agenceCreate);
    this.agence.agc_nom = this.agenceCreate.agcNom;
    this.agence.agc_resp = this.agenceCreate.agcResp;
    this.agence.agc_tel = this.agenceCreate.agcTel;
    this.agence.agc_fax = this.agenceCreate.agcFax;
    this.agence.code_agc = this.agenceCreate.codeAgc;
    this.agence.vil_id = this.agenceCreate.vilId;
    this.submitted = true;
    this.agenceService.createAgence(this.agence).subscribe({
        next: (response) => {
            window.location.reload();
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Agence créée avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    this.productDialog = false;
    //this.bateauCreate = {};

  }

  saveAgence2(id:number) 
  {
    // Utilisation de la fonction
    const agence = this.findAgenceById(id);

    //console.log(this.selectedFile);
    this.submitted = true;

    if (agence) {
      console.log(`Agence trouvé :`, agence);
    } else {
      console.log(`Agence avec l'ID ${id} non trouvé.`);
    }

    //console.log(`modifications :`, this.agenceEdit);

    console.log(this.agenceEdit);
    agence.agc_nom = this.agenceEdit.agc_nom;
    agence.agc_resp = this.agenceEdit.agc_resp;
    agence.agc_tel = this.agenceEdit.agc_tel;
    agence.agc_fax = this.agenceEdit.agc_fax;
    agence.code_agc = this.agenceEdit.code_agc;
        
    if (this.agenceEdit.vil_id != null && this.agenceEdit.vil_id != 0)
      {
        agence.vil_id = this.agenceEdit.vil_id;
      } 

    //this.submitted = true;
    console.log(agence);
    
    
    this.agenceService.updateAgence(agence).subscribe({
        next: (response) => {
            window.location.reload();
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Agence mise à jour avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    
    this.editAgence = false;
    //this.bateauCreate = {};

  }

  findAgenceById(agenceId: number) 
  {
    console.log("Recherche de l'agence avec l'ID:" + agenceId);
    console.log(this.agences);
  
    for (let i = 0; i < this.agences.length; i++) 
      {
      this.agenceUpdate = this.agences[i];

      console.log(this.agences[i])
      console.log(this.agenceUpdate)

      if (agenceId == this.agenceUpdate.agc_id) {
        //console.log("Bateau trouvé: ", JSON.stringify(this.bateauCreate2, null, 2));
        return this.agenceUpdate; // Retourner l'objet bateau trouvé
      }
    }
    //console.warn("Aucun bateau trouvé avec l'ID:", bateauId);
    return null; // Retourner null si aucun bateau n'est trouvé
  }

  modifAgence(agence: Agence) {
    this.agenceEdit = { ...agence };
    this.editAgence = true;
    }
    
    hideDialog2() {
        this.editAgence = false;
        this.submitted = false;
    }

  saveUnite() 
  {
    console.log(this.uniteCreate);
    this.unite.unite_nom = this.uniteCreate.uniteNom;
    this.unite.unite_code = this.uniteCreate.uniteCode;
    this.unite.vol_id = this.uniteCreate.volId;
    this.submitted = true;
    this.typeService.createUnite(this.unite).subscribe({
        next: (response) => {
            window.location.reload();
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Critère créé avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur lors de la création', life: 3000 });
        }
    });
    this.productDialog = false;
    //this.bateauCreate = {};

  }


  saveUnite2(id:number) 
  {
    // Utilisation de la fonction
    const unite = this.findUniteById(id);

    //console.log(this.selectedFile);
    this.submitted = true;

    if (unite) {
      console.log(`Unite trouvée :`, unite);
    } else {
      console.log(`Unite avec l'ID ${id} non trouvé.`);
    }

    //console.log(`modifications :`, this.agenceEdit);

    console.log(this.uniteEdit);
    unite.unite_code = this.uniteEdit.unite_code;
    unite.unite_nom = this.uniteEdit.unite_nom;
    unite.vol_id = this.uniteEdit.vol_id;
    //this.submitted = true;
    console.log(unite);
    
    
    this.typeService.updateUnite(unite).subscribe({
        next: (response) => {
            window.location.reload();
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Unite mise à jour avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    
    this.editUnite = false;
    //this.bateauCreate = {};

  }

  findUniteById(uniteId: number) 
  {
    console.log("Recherche de l'unite avec l'ID:" + uniteId);
    console.log(this.unites);
  
    for (let i = 0; i < this.unites.length; i++) 
      {
      this.uniteUpdate = this.unites[i];

      console.log(this.unites[i])
      console.log(this.uniteUpdate)

      if (uniteId == this.uniteUpdate.unite_id) {
        //console.log("Bateau trouvé: ", JSON.stringify(this.bateauCreate2, null, 2));
        return this.uniteUpdate; // Retourner l'objet bateau trouvé
      }
    }
    //console.warn("Aucun bateau trouvé avec l'ID:", bateauId);
    return null; // Retourner null si aucun bateau n'est trouvé
  }

  saveTypeBagage() 
  {
    console.log(this.bagageCreate);
    this.bagage.tbg_nom = this.bagageCreate.tbg_nom;
    this.bagage.unite_id = this.bagageCreate.unite_id;
    this.submitted = true;
    this.typeService.createBagage(this.bagage).subscribe({
        next: (response) => {
            window.location.reload();
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Bagage créé avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    this.typeproductDialog = false;
    //this.bateauCreate = {};

  }

  saveTypesBagage2(id:number) 
  {
    // Utilisation de la fonction
    const bagage = this.findTypeBagageById(id);

    //console.log(this.selectedFile);
    this.submitted = true;

    if (bagage) {
      console.log(`Bagage trouvé :`, bagage);
    } else {
      console.log(`Bagage avec l'ID ${id} non trouvé.`);
    }

    //console.log(`modifications :`, this.agenceEdit);

    console.log(this.bagageEdit);
    bagage.tbg_nom = this.bagageEdit.tbg_nom;
    bagage.code = this.bagageEdit.code;
    bagage.unite_id = this.bagageEdit.unite_id;
    //this.submitted = true;
    console.log(bagage);
    
    
    this.typeService.updateBagage(bagage).subscribe({
        next: (response) => {
            window.location.reload();
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Unite mise à jour avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    
    this.typebagageEdit = false;
    //this.bateauCreate = {};

  }

  findTypeBagageById(tbgId: number) 
  {
    console.log("Recherche de le type Bagage avec l'ID:" + tbgId);
    console.log(this.bagages);
  
    for (let i = 0; i < this.bagages.length; i++) 
      {
      this.bagageUpdate = this.bagages[i];

      console.log(this.bagages[i])
      console.log(this.bagageUpdate)

      if (tbgId == this.bagageUpdate.tbg_id) {
        //console.log("Bateau trouvé: ", JSON.stringify(this.bateauCreate2, null, 2));
        return this.bagageUpdate; // Retourner l'objet bateau trouvé
      }
    }
    //console.warn("Aucun bateau trouvé avec l'ID:", bateauId);
    return null; // Retourner null si aucun bateau n'est trouvé
  }

  saveNiveau() 
  {
    console.log(this.niveauCreate);
    this.niveau.niv_nom = this.niveauCreate.niv_nom;
    this.submitted = true;
    this.typeService.createNiveau(this.niveau).subscribe({
        next: (response) => {
            window.location.reload();
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Niveau créé avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    this.niveauDialog = false;
    //this.bateauCreate = {};

  }

  saveTypePiece() 
  {
    console.log(this.typePieceCreate);
    this.typePiece.tpiece_nom = this.typePieceCreate.tpiece_nom;
    this.submitted = true;
    this.paramService.createPiece(this.typePiece).subscribe({
        next: (response) => {
            window.location.reload();
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Type pièce créé avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    this.typepieceDialog = false;
    //this.bateauCreate = {};

  }

  saveTypePiece2(id:number) 
  {
    // Utilisation de la fonction
    const type_piece = this.findTypePieceById(id);

    //console.log(this.selectedFile);
    this.submitted = true;

    if (type_piece) {
      console.log(`TypePiece trouvé :`, type_piece);
    } else {
      console.log(`TypePiece avec l'ID ${id} non trouvé.`);
    }

    //console.log(`modifications :`, this.agenceEdit);

    console.log(this.typePieceEdit);
    type_piece.tpiece_nom = this.typePieceEdit.tpiece_nom;
    //this.submitted = true;
    console.log(type_piece);
    
    
    this.paramService.updateTypePiece(type_piece).subscribe({
        next: (response) => {
            window.location.reload();
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Type pièce mis à jour avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    
    this.typepieceEdit = false;
    //this.bateauCreate = {};

  }

  saveVille() 
  {
    console.log(this.villeCreate);
    this.ville.vil_nom = this.villeCreate.vil_nom;
    this.ville.vil_code = this.villeCreate.vil_code;
    this.submitted = true;
    this.paramService.createVille(this.ville).subscribe({
        next: (response) => {
            window.location.reload();
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Ville créée avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    this.typepieceDialog = false;
    //this.bateauCreate = {};

  }

  saveVille2(id:number) 
  {
    // Utilisation de la fonction
    const ville = this.findVilleById(id);

    //console.log(this.selectedFile);
    this.submitted = true;

    if (ville) {
      console.log(`Ville trouvée :`, ville);
    } else {
      console.log(`Ville avec l'ID ${id} non trouvé.`);
    }

    //console.log(`modifications :`, this.agenceEdit);

    console.log(this.villeEdit);
    ville.vil_nom = this.villeEdit.vil_nom;
    ville.vil_code = this.villeEdit.vil_code;
    //this.submitted = true;
    console.log(ville);
    
    
    this.paramService.updateVille(ville).subscribe({
        next: (response) => {
            //window.location.reload();
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Ville mise à jour avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    
    this.villesEdit = false;
    //this.bateauCreate = {};

  }


  saveNiveau2(id:number) 
  {
    // Utilisation de la fonction
    const niveau = this.findNiveauById(id);

    //console.log(this.selectedFile);
    this.submitted = true;

    if (niveau) {
      console.log(`Niveau trouvé :`, niveau);
    } else {
      console.log(`Niveau avec l'ID ${id} non trouvé.`);
    }

    //console.log(`modifications :`, this.agenceEdit);

    console.log(this.niveauEdit);
    niveau.niv_nom = this.niveauEdit.niv_nom;
    //this.submitted = true;
    console.log(niveau);
    
    
    this.typeService.updateNiveau(niveau).subscribe({
        next: (response) => {
            window.location.reload();
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Niveau mis à jour avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    
    this.editAgence = false;
    //this.bateauCreate = {};

  }

  findVilleById(villeId : number) 
  {
    console.log("Recherche de la ville avec l'ID:" + villeId);
    console.log(this.villes);
  
    for (let i = 0; i < this.villes.length; i++) 
      {
        //console.log(this.niveaux[i]) 
        this.villeUpdate = this.villes[i];

        //console.log(this.niveaux[i])
        //console.log(this.niveauUpdate)

      if (villeId == this.villeUpdate.vil_id) {
        //console.log("Bateau trouvé: ", JSON.stringify(this.bateauCreate2, null, 2));
        return this.villeUpdate; // Retourner l'objet bateau trouvé
      }
    }
    //console.warn("Aucun bateau trouvé avec l'ID:", bateauId);
    return null; // Retourner null si aucun bateau n'est trouvé
  }
  
  findTypePieceById(tpieceId : number) 
  {
    console.log("Recherche du type de pièce avec l'ID:" + tpieceId);
    console.log(this.typePieces);
  
    for (let i = 0; i < this.typePieces.length; i++) 
      {
        //console.log(this.niveaux[i]) 
        this.typePieceUpdate = this.typePieces[i];

        //console.log(this.niveaux[i])
        //console.log(this.niveauUpdate)

      if (tpieceId == this.typePieceUpdate.tpiece_id) {
        //console.log("Bateau trouvé: ", JSON.stringify(this.bateauCreate2, null, 2));
        return this.typePieceUpdate; // Retourner l'objet bateau trouvé
      }
    }
    //console.warn("Aucun bateau trouvé avec l'ID:", bateauId);
    return null; // Retourner null si aucun bateau n'est trouvé
  }

  findNiveauById(niveauId: number) 
  {
    console.log("Recherche du niveau avec l'ID:" + niveauId);
    console.log(this.niveaux);
  
    for (let i = 0; i < this.niveaux.length; i++) 
      {
        //console.log(this.niveaux[i]) 
        this.niveauUpdate = this.niveaux[i];

        //console.log(this.niveaux[i])
        //console.log(this.niveauUpdate)

      if (niveauId == this.niveauUpdate.niv_id) {
        //console.log("Bateau trouvé: ", JSON.stringify(this.bateauCreate2, null, 2));
        return this.niveauUpdate; // Retourner l'objet bateau trouvé
      }
    }
    //console.warn("Aucun bateau trouvé avec l'ID:", bateauId);
    return null; // Retourner null si aucun bateau n'est trouvé
  }


  saveProduct() {
      this.submitted = true;

      if (this.product.name?.trim()) {
          if (this.product.id) {
              // @ts-ignore
              this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
              this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          } else {
              this.product.id = this.createId();
              this.product.code = this.createId();
              this.product.image = 'product-placeholder.svg';
              // @ts-ignore
              this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
              this.products.push(this.product);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}

