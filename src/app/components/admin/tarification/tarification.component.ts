import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { Categorie } from 'src/app/model/Categorie.model';
import { CategorieBagage } from 'src/app/model/CategorieBagage.model';
import { CategorieCreate } from 'src/app/model/CategorieCreate';
import { CategoriePlace } from 'src/app/model/CategoriePlace.model';
import { Critere } from 'src/app/model/Critere.model';
import { CritereCreate } from 'src/app/model/CritereCreate';
import { GroupeCritereCreate } from 'src/app/model/GroupeCritereCreate';
import { GroupeCritere } from 'src/app/model/GroupeCrt.model';
import { TypeBagage } from 'src/app/model/TypeBagage';
import { TypeBagageCreate } from 'src/app/model/TypeBago';
import { TypePlace } from 'src/app/model/TypePlace';
import { TarificationService } from 'src/app/services/tarification.service';

@Component({
  selector: 'app-tarification',
  templateUrl: './tarification.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./tarification.component.scss']
})

export class TarificationComponent implements OnInit {
    
    critereCreate: CritereCreate = {};
    criteriaForEdit : Critere[] = [];
    criteriaForEdit2 : Critere[] = [];
    criteriaForEdit3 : Critere[] = [];
    critere: Critere = {
        crtId: 0,
        crt_nom: ''
    };
    productDialog: boolean = false;
    groupeCrtDialog: boolean = false;
    groupeCrtEdit: boolean = false;
    tarifPasDialog: boolean = false;
    tarifPasEdit: boolean = false;
    tarifBgDialog: boolean = false;
    tarifBgEdit: boolean = false;
    editDialog: boolean = false;
    deleteCritereDialog: boolean = false;
    deleteCriteresDialog: boolean = false;
    targetCriteria : Critere[];
    targetCriteriaPlaces : Critere[];
    targetCriteriaBagages : Critere[];
    targetGroupeCriteria : Critere[];
    criteres: Critere[] = [];
    places: Categorie[] = [];
    bagages: Categorie[] = [];
    categorieCreate: CategorieCreate = {
        catTaxe: 0,
        tauxRemise: 0,
        code: ''
    };
    groupecritereCreate : GroupeCritereCreate = {};
    groupeCriteres: GroupeCritere[] = [];
    typePlaces: TypePlace[] = [];
    typeBagages: TypeBagageCreate[] = [];

    groupecritere: GroupeCritere = {
        grpcrt_id: 0,
        grpcrt_nom: '',
        criteres: [],
        on_line: 0
    };

    groupecritereEdit: GroupeCritere = {
        grpcrt_id: 0,
        grpcrt_nom: '',
        criteres: [],
        on_line: 0
    };

    groupecritereUpdate: GroupeCritere = {
        grpcrt_id: 0,
        grpcrt_nom: '',
        criteres: [],
        on_line: 0
    };
    
    tarifPlaces: Categorie = {
        cat_id: 0,
        cat_nom: '',
        cat_prix: 0,
        cat_prix_ttc: 0,
        place: false,
        bagage: false,
        cat_remise: 0,
        cat_forfait: 0,
        cat_taxe: 0,
        frais_mag: 0,
        cat_commission: 0,
        tplc_id: 0,
        tbg_id: 0,
        criteres: [],
        taux_remise: 0,
        typeBagage: undefined,
        code: ''
    };

    tarifPlacesEdit : Categorie = {
        cat_id: 0,
        cat_nom: '',
        cat_prix: 0,
        cat_prix_ttc: 0,
        place: false,
        bagage: false,
        cat_remise: 0,
        cat_forfait: 0,
        cat_taxe: 0,
        frais_mag: 0,
        cat_commission: 0,
        tplc_id: 0,
        tbg_id: 0,
        criteres: [],
        taux_remise: 0,
        typeBagage: undefined,
        code: ''
    };

    tarifPlacesUpdate : CategoriePlace = {
        cat_id: 0,
        cat_nom: '',
        cat_prix: 0,
        cat_prix_ttc: 0,
        place: false,
        bagage: false,
        cat_remise: 0,
        cat_forfait: 0,
        cat_taxe: 0,
        frais_mag: 0,
        cat_commission: 0,
        tplc_id: 0,
        criteres: [],
        taux_remise: 0,
        code: ''
    };

    tarifBagages: Categorie = {
        cat_id: 0,
        cat_nom: '',
        cat_prix: 0,
        cat_prix_ttc: 0,
        place: false,
        bagage: false,
        cat_remise: 0,
        cat_forfait: 0,
        cat_taxe: 0,
        frais_mag: 0,
        cat_commission: 0,
        tplc_id: 0,
        tbg_id: 0,
        criteres: [],
        taux_remise: 0,
        typeBagage: undefined,
        code: ''
    };

    tarifBagagesEdit : Categorie = {
        cat_id: 0,
        cat_nom: '',
        cat_prix: 0,
        cat_prix_ttc: 0,
        place: false,
        bagage: false,
        cat_remise: 0,
        cat_forfait: 0,
        cat_taxe: 0,
        frais_mag: 0,
        cat_commission: 0,
        tplc_id: 0,
        tbg_id: 0,
        criteres: [],
        taux_remise: 0,
        typeBagage: undefined,
        code: ''
    };

    tarifBagagesUpdate : CategorieBagage = {
        cat_id: 0,
        cat_nom: '',
        cat_prix: 0,
        cat_prix_ttc: 0,
        place: false,
        bagage: false,
        cat_remise: 0,
        cat_forfait: 0,
        cat_taxe: 0,
        frais_mag: 0,
        cat_commission: 0,
        tbg_id: 0,
        criteres: [],
        taux_remise: 0,
        code: ''
    };


    products: Product[] = [];
    product: Product = {};
    selectedProducts: Product[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    cols1: any[] = [];
    cols2: any[] = [];
    cols3: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    crt : Critere;

  constructor(private readonly tarificationService: TarificationService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  
  ngOnInit() {
    this.targetCriteria = [];
    this.targetCriteriaPlaces = [];
    this.targetGroupeCriteria = [];
    this.targetGroupeCriteria = []
      //this.productService.getProducts().then(data => this.products = data);

      this.tarificationService.getCriteres().subscribe((response:any) => 
        {
        this.criteres = response;
        }
      );

      this.tarificationService.getTypePlaces().subscribe((response:any) => 
        {
        this.typePlaces = response;
        console.log(this.typePlaces);
        }
      );

      this.tarificationService.getTypeBagages().subscribe((response:any) => 
        {
        this.typeBagages = response;
        console.log(this.typeBagages);
        }
      );

      this.tarificationService.getTarifs().subscribe((response: any) => {
        this.places = response.filter((categorie: any) => categorie.place === true);
        console.log(this.places);
      });

      this.tarificationService.getTarifs().subscribe((response: any) => {
        const bagagesBruts = response.filter((categorie: any) => categorie.bagage === true);

         // Aplatir les champs utiles pour le filtre global
        this.bagages = bagagesBruts.map(b => ({
            ...b,
            tbg_nom: b.typeBagage?.tbg_nom ?? '',
            cat_nom: b.cat_nom ?? '',
            cat_prix_ttc: b.cat_prix_ttc ?? 0
        }));
        console.log(this.bagages);
      });

      this.tarificationService.getGroupeCritere().subscribe((response:any) => 
        {
        this.groupeCriteres = response;
        console.log(this.groupeCriteres);
        }
      );

      this.cols1 = [
          { field: 'crtNom', header: 'Criteres' },
          { field: 'action', header: 'Actions' }
      ];

      this.cols2 = [
        { field: 'catNom', header: 'Ligne tarif' },
        { field: 'typePlace', header: 'Type de place' },
        { field: 'criteres', header: 'Critères' },
        { field: 'catPrixTtc', header: 'Prix TTC' }
    ];

    this.cols3 = [
        { field: 'catNom', header: 'Ligne tarif' },
        { field: 'typePlace', header: 'Bagage' },
        { field: 'criteres', header: 'Critères' },
        { field: 'catPrixTtc', header: 'Prix TTC' }
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

  getCritereById(id: number): any {

    this.crt = this.criteres.find(critere => critere.crtId === id);
    return this.crt
  }
    
    editProduct(product: Product) {
      this.product = { ...product };
      this.productDialog = true;
  }


  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveCritere() 
  {
    this.critere.crt_nom = this.critereCreate.crtNom;
    //console.log(this.selectedFile);
    this.submitted = true;
    this.tarificationService.createCritere(this.critere).subscribe({
        next: (response) => {
            window.location.reload();
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Critère créé avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    this.productDialog = false;
    //this.bateauCreate = {};

  }

  saveCritere2() 
  {
    console.log(this.critere);
    this.submitted = true;
    this.tarificationService.updateCritere(this.critere.crtId, this.critere).subscribe({
        next: (response) => {
            //window.location.reload();
            console.log(response);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Critère édité avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    this.editDialog = false;
    //this.bateauCreate = {};

  } 
  
  editCritere(critere: Critere) {
    this.critere = { ...critere };
    this.editDialog = true;
    }

  
  hideEditDialog() {
    this.editDialog = false;
    this.submitted = false;
    }

    deleteCritere(critere: Critere) {
        this.deleteCritereDialog = true;
        this.critere = { ...critere };
    }
  
    confirmDelete() {
        this.deleteCritereDialog = false;
        //this.products = this.products.filter(val => val.id !== this.product.id);
        this.tarificationService.deleteCritere(this.critere.crtId).subscribe({
            next: (response) => {
                window.location.reload();
                console.log(response);
                this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Critère éffacé avec succés', life: 3000 });
            },
            error: error => {
                console.error('ERROR', error);
                this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
            }
        });
        //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Critère Effacé', life: 3000 });
        //this.product = {};
    }

    openTarifsPas() {
        //this.category = {};
        this.submitted = false;
        this.tarifPasDialog = true;
    }

    saveTarifPlace() 
    {
        console.log(this.categorieCreate.catPrix);
        console.log(this.categorieCreate.tauxRemise);
        console.log(this.categorieCreate.catTaxe);

        let montant_with_rem = Number(this.categorieCreate.catPrix - (this.categorieCreate.catPrix * (this.categorieCreate.tauxRemise) / 100));

        console.log(montant_with_rem);

        let Remise = Number(this.categorieCreate.catPrix * (this.categorieCreate.tauxRemise / 100));
        
        console.log(Remise);

        let Prix_TTC = Number(montant_with_rem * 1 + this.categorieCreate.catTaxe);

        console.log(Prix_TTC);

        console.log(this.targetCriteria);
        this.tarifPlaces.cat_nom = this.categorieCreate.catNom;
        this.tarifPlaces.cat_prix = Number(this.categorieCreate.catPrix);
        this.tarifPlaces.cat_taxe = Number(this.categorieCreate.catTaxe);
        this.tarifPlaces.taux_remise = this.categorieCreate.tauxRemise;
        this.tarifPlaces.cat_prix_ttc = Prix_TTC
        this.tarifPlaces.cat_remise = Remise;
        this.tarifPlaces.criteres = this.targetCriteria;
        this.tarifPlaces.place = true;
        this.tarifPlaces.tplc_id = this.categorieCreate.tplcId;
        //this.tarifPlaces.tbg_id = 0;
        this.submitted = true;
        this.tarificationService.createCategorie(this.tarifPlaces).subscribe({
            next: (response) => {
                //window.location.reload();
                console.log(response);
                this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Tarif place créé avec succés', life: 3000 });
            },
            error: error => {
                console.error('ERROR', error);
                this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
            }
        });
        this.tarifPasDialog = false;
        this.targetCriteria = [];
        //this.bateauCreate = {};

    } 

    saveTarifBagage() 
    {

        console.log(this.categorieCreate.catPrix);
        console.log(this.categorieCreate.tauxRemise);
        console.log(this.categorieCreate.catTaxe);

        let montant_with_rem = Number(this.categorieCreate.catPrix - (this.categorieCreate.catPrix * (this.categorieCreate.tauxRemise) / 100));

        console.log(montant_with_rem);

        let Remise = Number(this.categorieCreate.catPrix * (this.categorieCreate.tauxRemise / 100));
        
        console.log(Remise);

        let Prix_TTC = Number(montant_with_rem * 1.18 + this.categorieCreate.catTaxe);

        console.log(Prix_TTC);

        this.tarifBagages.cat_nom = this.categorieCreate.catNom;
        this.tarifBagages.cat_prix_ttc = Prix_TTC;
        this.tarifBagages.cat_prix = Number(this.categorieCreate.catPrix);
        this.tarifBagages.cat_remise = Remise;
        this.tarifBagages.taux_remise = this.categorieCreate.tauxRemise;
        this.tarifBagages.criteres = this.targetCriteria;
        this.tarifBagages.bagage = true;
        this.tarifBagages.tbg_id = this.categorieCreate.typeBagage;
        this.tarifBagages.code = this.categorieCreate.code;
        this.tarifBagages.frais_mag = Number(this.categorieCreate.fraisMag);
        //this.tarifBagages.tplc_id = 0;
        this.submitted = true;
        this.tarificationService.createCategorieBagage(this.tarifBagages).subscribe({
            next: (response) => {
                //window.location.reload();
                console.log(response);
                this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Tarif place créé avec succés', life: 3000 });
            },
            error: error => {
                console.error('ERROR', error);
                this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
            }
        });
        this.tarifBgDialog = false;
        this.targetCriteria = [];
        //this.bateauCreate = {};

    } 

    savegroupeCritere() 
    {
        console.log(this.targetGroupeCriteria);
        this.groupecritere.grpcrt_nom = this.groupecritereCreate.grpcrtNom;
        this.groupecritere.criteres = this.targetCriteria;
        //this.tarifPlaces.tbg_id = 0;
        this.submitted = true;
        this.tarificationService.createGroupeCritere(this.groupecritere).subscribe({
            next: (response) => {
                //window.location.reload();
                console.log(response);
                this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Groupe de critere créé avec succés', life: 3000 });
            },
            error: error => {
                console.error('ERROR', error);
                this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
            }
        });
        this.groupeCrtDialog = false;
        this.targetCriteria = [];
        //this.bateauCreate = {};

    } 

    savegroupeCritere2(id:number) 
    {
        // Utilisation de la fonction
        const groupeCritere = this.findGroupeCritereById(id);

        //console.log(this.selectedFile);
        this.submitted = true;

        if (groupeCritere) {
        console.log(`Groupe critere trouvé :`, groupeCritere);
        } else {
        console.log(`Groupe critere avec l'ID ${id} non trouvé.`);
        }

        //console.log(`modifications :`, this.agenceEdit);
        console.log(this.groupecritereEdit);

        groupeCritere.grpcrt_id = this.groupecritereEdit.grpcrt_id;
        groupeCritere.grpcrt_nom = this.groupecritereEdit.grpcrt_nom;
        groupeCritere.criteres = this.targetGroupeCriteria;
        groupeCritere.on_line = this.groupecritereEdit.on_line;

        console.log(this.groupecritereEdit);
        //this.submitted = true;

        this.tarificationService.updateGrpCritere(groupeCritere).subscribe({
            next: (response) => {
                //window.location.reload();
                console.log(response);
                this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Groupe de critères mis à jour avec succés', life: 3000 });
            },
            error: error => {
                console.error('ERROR', error);
                this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
            }
        });
        
        this.groupeCrtEdit = false;
        
        //this.bateauCreate = {};

    }

    getDifference(): Critere[] {
        return this.criteres.filter(item => 
            !this.targetCriteriaPlaces.some(targetItem => targetItem.crtId === item.crtId)
        );
    }    

    getDifference2(): Critere[] {
        return this.criteres.filter(item => 
            !this.targetCriteriaBagages.some(targetItem => targetItem.crtId === item.crtId)
        );
    }  

    getDifference3(): Critere[] {
        return this.criteres.filter(item => 
            !this.targetGroupeCriteria.some(targetItem => targetItem.crtId === item.crtId)
        );
    } 

    modifTarifsPlace(place: Categorie) {
        console.log(place);
        this.tarifPlacesEdit = { ...place };
        this.targetCriteriaPlaces = this.tarifPlacesEdit.criteres;
        this.criteriaForEdit = this.getDifference();
        console.log(this.targetCriteriaPlaces);
        console.log(this.criteriaForEdit);
        this.tarifPasEdit = true;
    }

    modifTarifsBagage(bagage: Categorie) {
        console.log(bagage);
        this.tarifBagagesEdit = { ...bagage };
        this.targetCriteriaBagages = this.tarifBagagesEdit.criteres;
        this.criteriaForEdit2 = this.getDifference2();
        console.log(this.targetCriteriaPlaces);
        console.log(this.criteriaForEdit2);
        console.log(this.tarifBagagesEdit);
        this.tarifBgEdit = true;
    }

    saveTarifPlace2(id:number) 
    {
        // Utilisation de la fonction
        const place = this.findTarifPlaceById(id);

        //console.log(this.selectedFile);
        this.submitted = true;

        if (place) {
        console.log(`Tarif place trouvé :`, place);
        } else {
        console.log(`Tarif place avec l'ID ${id} non trouvé.`);
        }

        //console.log(`modifications :`, this.agenceEdit);
        console.log(this.tarifPlacesEdit);

        let montant_with_rem = Number(this.tarifPlacesEdit.cat_prix - (this.tarifPlacesEdit.cat_prix * (this.tarifPlacesEdit.taux_remise) / 100));

        let Remise = Number(this.tarifPlacesEdit.cat_prix * (this.tarifPlacesEdit.taux_remise / 100));

        console.log(Remise);

        let Prix_TTC = (montant_with_rem * 1) + Number(this.tarifPlacesEdit.cat_taxe);

        console.log(Prix_TTC);

        console.log(Number(this.tarifPlacesEdit.cat_taxe));

        place.cat_nom = this.tarifPlacesEdit.cat_nom;
        place.cat_prix = Number(this.tarifPlacesEdit.cat_prix);
        place.cat_taxe = Number(this.tarifPlacesEdit.cat_taxe);
        place.taux_remise = this.tarifPlacesEdit.taux_remise;       
        place.cat_prix_ttc = Prix_TTC;
        place.cat_remise = Remise;
        place.criteres = this.targetCriteriaPlaces;
        place.place = true;
        place.tplc_id = this.tarifPlacesEdit.tplc_id;

        console.log(this.tarifPlacesEdit.tplc_id);

        //this.submitted = true;
        console.log(place);
        
        this.tarificationService.updateCatPlace(place).subscribe({
            next: (response) => {
                //window.location.reload();
                console.log(response);
                this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Tarif mis à jour avec succés', life: 3000 });
            },
            error: error => {
                console.error('ERROR', error);
                this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
            }
        });
        
        this.tarifPasEdit = false;
        
        //this.bateauCreate = {};

    }

    findTarifPlaceById(tbgId: number) 
    {
        console.log("Recherche du tarif avec l'ID:" + tbgId);
        console.log(this.places);
    
        for (let i = 0; i < this.places.length; i++) 
        {
        this.tarifPlacesUpdate = this.places[i];

        console.log(this.places[i])
        console.log(this.tarifPlacesUpdate)

        if (tbgId == this.tarifPlacesUpdate.cat_id) {
            //console.log("Bateau trouvé: ", JSON.stringify(this.bateauCreate2, null, 2));
            return this.tarifPlacesUpdate; // Retourner l'objet bateau trouvé
        }
        }
        //console.warn("Aucun bateau trouvé avec l'ID:", bateauId);
        return null; // Retourner null si aucun bateau n'est trouvé
    }

    findGroupeCritereById(grpcrtId: number) 
    {
        console.log("Recherche du groupe critere avec l'ID:" + grpcrtId);
        console.log(this.groupeCriteres);
    
        for (let i = 0; i < this.groupeCriteres.length; i++) 
        {
            this.groupecritereUpdate = this.groupeCriteres[i];
            console.log(this.groupeCriteres[i])
            console.log(this.groupecritereUpdate)

            if (grpcrtId == this.groupecritereUpdate.grpcrt_id) 
            {
                return this.groupecritereUpdate;
            }
        }
        return null; // Retourner null si aucun bateau n'est trouvé
    }



    saveTarifBagage2(id:number) 
    {
        // Utilisation de la fonction
        const bagage = this.findTarifBagageById(id);

        //console.log(this.selectedFile);
        this.submitted = true;

        //console.log(`modifications :`, this.agenceEdit);

        let montant_with_rem2 = Number(this.tarifBagagesEdit.cat_prix - (this.tarifBagagesEdit.cat_prix * (this.tarifBagagesEdit.taux_remise) / 100));

        let Remise2 = Number(this.tarifBagagesEdit.cat_prix * (this.tarifBagagesEdit.taux_remise)/100);

        
        //console.log(Remise);
        
        let Prix_TTC2 = montant_with_rem2 * 1.18;

        if (bagage) {
        console.log(`Tarif place trouvé :`, bagage);
        } else {
        console.log(`Tarif place avec l'ID ${id} non trouvé.`);
        }

        //console.log(`modifications :`, this.agenceEdit);
        console.log(this.tarifBagagesEdit);

        bagage.cat_nom = this.tarifBagagesEdit.cat_nom;
        bagage.cat_prix = Number(this.tarifBagagesEdit.cat_prix);
        bagage.frais_mag = Number(this.tarifBagagesEdit.frais_mag);
        bagage.code = this.tarifBagagesEdit.code;
        bagage.cat_prix_ttc = Prix_TTC2;
        bagage.cat_remise = Remise2;
        bagage.taux_remise = this.tarifBagagesEdit.taux_remise;
        bagage.criteres = this.targetCriteriaBagages;
        bagage.bagage = true;
        bagage.tbg_id = this.tarifBagagesEdit.tbg_id;

        //this.submitted = true;
        console.log(bagage);
        
        this.tarificationService.updateCatBagage(bagage).subscribe({
            next: (response) => {
                //window.location.reload();
                console.log(response);
                this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Tarif mis à jour avec succés', life: 3000 });
            },
            error: error => {
                console.error('ERROR', error);
                this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
            }
        });
        
        this.tarifBgEdit = false;
        
        //this.bateauCreate = {};

    }

    findTarifBagageById(tbgId: number) 
    {
        console.log("Recherche du tarif avec l'ID:" + tbgId);
        console.log(this.bagages);
    
        for (let i = 0; i < this.bagages.length; i++) 
        {
        this.tarifBagagesUpdate = this.bagages[i];

        console.log(this.bagages[i])
        console.log(this.tarifBagagesUpdate)

        if (tbgId == this.tarifBagagesUpdate.cat_id) {
            //console.log("Bateau trouvé: ", JSON.stringify(this.bateauCreate2, null, 2));
            return this.tarifBagagesUpdate; // Retourner l'objet bateau trouvé
        }
        }
        //console.warn("Aucun bateau trouvé avec l'ID:", bateauId);
        return null; // Retourner null si aucun bateau n'est trouvé
    }

    hideTarifPasDialog() {
        this.tarifPasDialog = false;
        this.submitted = false;
    }

    openNewTarifBagage() {
        //this.category = {};
        this.submitted = false;
        this.tarifBgDialog = true;
    }

    openNewGrpCrt() {
        //this.product = {};
        this.submitted = false;
        this.groupeCrtDialog = true;
    }

    modifGroupeCrt(grpcrt: GroupeCritere)
    {
        console.log(grpcrt);
        this.groupecritereEdit = { ...grpcrt };
        this.targetGroupeCriteria = this.groupecritereEdit.criteres;
        this.criteriaForEdit3 = this.getDifference3();
        console.log(this.targetGroupeCriteria);
        console.log(this.criteriaForEdit3);
        this.groupeCrtEdit = true;
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
    console.log("Test");
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
