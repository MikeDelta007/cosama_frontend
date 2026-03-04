import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AppMainComponent } from 'src/app/app.main.component';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { Annulation } from 'src/app/model/Annulation.model';
import { Bagage } from 'src/app/model/Bagages.model';
import { Bateau } from 'src/app/model/Bateau.model';
import { Billet } from 'src/app/model/Billet.model';
import { Categorie } from 'src/app/model/Categorie.model';
import { ClientEnCompte } from 'src/app/model/ClientEnCompte.model';
import { FretClt, FretDTO, LigneFret } from 'src/app/model/FretClt.model';
import { LigneFrets } from 'src/app/model/LigneFrets.model';
import { Passager } from 'src/app/model/Passager.model';
import { Place } from 'src/app/model/Place.model';
import { TypeBagage } from 'src/app/model/TypeBagage';
import { TypePlace } from 'src/app/model/TypePlace.model';
import { Voyage } from 'src/app/model/Voyage.model';
import { VoyageO } from 'src/app/model/VoyageO.model';
import { BateauService } from 'src/app/services/bateau.service';
import { BilletService } from 'src/app/services/billet.service';
import { ClientencompteService } from 'src/app/services/clientencompte.service';
import { FretService } from 'src/app/services/fret.service';
import { PlaceService } from 'src/app/services/place.service';
import { TarificationService } from 'src/app/services/tarification.service';
import { VoyageService } from 'src/app/services/voyage.service';

@Component({
  selector: 'app-crud-fret',
  templateUrl: './crud-fret.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./crud-fret.component.scss']
})
export class CrudFretComponent implements OnInit {

  getFretByState : any;

  qrCodeUrl$: Observable<SafeUrl>;

  getFretByState_ : any[] = [];

  productDialog: boolean = false;

  public idBillet : number = 0;

  productDialog2: boolean = false;

  public outBillet2 : boolean;

  productDialog3: boolean = false;

  productDialog4: boolean = false;

  productDialog5: boolean = false;

  motifDialog: boolean = false;

  selectedCltCmpt : number = 0;

  deleteProductDialog: boolean = false;

  deleteProductDialog2: boolean = false;

  deleteProductDialog3: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  public cltEnComptes : ClientEnCompte[] = [];

  bagages: Categorie[] = [];
  
  public cltEnCompte : ClientEnCompte;

  public solde : number;

  public checked: boolean = false;

  public checked2: boolean = false;

  public billet : Billet;

  public codeBillet : string;

  public selectedBagage: any = {};

  public selectedBagage2: Bagage = {
    tbg_id: 0,
    tbg_nom: '',
    etat: false,
    code: '',
    unite_id: 0,
    vol_id: 0
  };

  public selectedBateau : number;

  public selectedVoyage : number;

  public detail : string;

  public qte : number;

  public unit : number;

  public vol : number;

  public ligneFret: LigneFret[] = [];

  public ligneFret2: LigneFret[] = [];

  public ligneFret3: LigneFret[] = [];

  public ligneFr: LigneFret[] = [];

  public ligneFre : LigneFret = {
    quantity: 0,
    weight: 0,
    volume: 0,
    tbg_id: 0,
    cat_id: 0,
    details: '',
    ligneFret_id: 0,
    fret_id: 0
  };

  public voyages : VoyageO[] = [];

  public voyages_ : VoyageO[] = [];

  bateaux : Bateau[] = [];

  public v : VoyageO = null;

  public motif : string = "";

  public oneCltFret : FretClt = {
    fretClt_id: 0,
    pax_id: 0,
    raisonSociale: '',
    expEqDest: false,
    firstname: '',
    lastname: '',
    numeroPiece: '',
    telephone: '',
    email: '',
    fretDTOS: {
      voy_id: 0,
      ligneFretDTOList: LigneFret[0],
      fretId: 0,
      fretCode: '',
      expEqDest: false,
      raisonSocialeDest: '',
      firstnameDest: '',
      lastnameDest: '',
      telephoneDest: '',
      emailDest: '',
      fretAcompte: 0,
      fretMontant: 0,
      fretTva: 0,
      fretRemiseTaux: 0,
      fretRemise: 0,
      fretMontant_ht: 0,
      applyTVA: false,
      applyPayment: false,
      fretDate: '',
      fretDesc: '',
      usrLogin: '',
      fretPayDate: '',
      fretPayUsr: '',
      fretEtat: false,
      coutMagasinage: 0,
      coutMagasinageRemise: 0,
      usrMagasinage: '',
      dateMagasinage: '',
      usrLoginPayable: '',
      dateEncaissPayable: '',
      cltcmpt_id: 0,
      billet: '',
      fretClt_id: 0,
      carabane: 0,
      motif: '',
      paymentMethod : ''
    },
    ligneFretDTOList: LigneFret[0],
    fretId: 0
  };


  public oneCltFretEdit : FretClt = {
    fretClt_id: 0,
    pax_id: 0,
    raisonSociale: '',
    expEqDest: false,
    firstname: '',
    lastname: '',
    numeroPiece: '',
    telephone: '',
    email: '',
    fretDTOS: {
      voy_id: 0,
      ligneFretDTOList: LigneFret[0],
      fretId: 0,
      fretCode: '',
      expEqDest: false,
      raisonSocialeDest: '',
      firstnameDest: '',
      lastnameDest: '',
      telephoneDest: '',
      emailDest: '',
      fretAcompte: 0,
      fretMontant: 0,
      fretTva: 0,
      fretRemiseTaux: 0,
      fretRemise: 0,
      fretMontant_ht: 0,
      applyTVA: false,
      applyPayment: false,
      fretDate: '',
      fretDesc: '',
      usrLogin: '',
      fretPayDate: '',
      fretPayUsr: '',
      fretEtat: false,
      coutMagasinage: 0,
      coutMagasinageRemise: 0,
      usrMagasinage: '',
      dateMagasinage: '',
      usrLoginPayable: '',
      dateEncaissPayable: '',
      cltcmpt_id: 0,
      billet: '',
      fretClt_id: 0,
      carabane: 0,
      motif: '',
      paymentMethod : ''
    },
    ligneFretDTOList: LigneFret[0],
    fretId: 0
  };

  public passager : Passager = {
      numBillet: '',
      numeropiece: '',
      civilite: '',
      lastName: '',
      firstName: '',
      phone: '',
      mail: '',
      tPiece: 0
  };

  public passager2 : Passager = {
    numBillet: '',
    numeropiece: '',
    civilite: '',
    lastName: '',
    firstName: '',
    phone: '',
    mail: '',
    tPiece: 0
};

public oneCltFretEdit_ : FretDTO = {
    fretId: 0,
    fretCode: '',
    expEqDest: false,
    raisonSocialeDest: '',
    firstnameDest: '',
    lastnameDest: '',
    telephoneDest: '',
    emailDest: '',
    fretAcompte: 0,
    fretMontant: 0,
    fretTva: 0,
    fretRemiseTaux: 0,
    fretRemise: 0,
    fretMontant_ht: 0,
    applyTVA: false,
    applyPayment: false,
    fretDate: '',
    fretDesc: '',
    usrLogin: '',
    fretPayDate: '',
    fretPayUsr: '',
    fretEtat: false,
    billet: '',
    coutMagasinage: 0,
    coutMagasinageRemise: 0,
    usrMagasinage: '',
    dateMagasinage: '',
    usrLoginPayable: '',
    dateEncaissPayable: '',
    cltcmpt_id: 0,
    voy_id: 0,
    fretClt_id: 0,
    ligneFretDTOList: [],
    carabane: 0,
    motif: '',
    paymentMethod : ''
  };

  public fretClts : FretClt[] = [];

  public displayFretOk : LigneFrets[] = [];

  public user : any;
  public profil : any;
  public gare : any;

  public outBillet : boolean;

  public annulation : Annulation = 
  {
    fretId: 0,
    motif: ''
  };

  expediteurs$ = new BehaviorSubject<{ [key: number]: string }>({});

  constructor(private sanitizer: DomSanitizer, public voyageService: VoyageService, public appMain: AppMainComponent, private readonly bateauService: BateauService, private fret : FretService, private tarificationService : TarificationService, private billetService : BilletService, private cltEnCompteService : ClientencompteService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
      //this.productService.getProducts().then(data => this.products = data);

      console.log(this.ligneFret);

      this.user = this.appMain.user.login;
      this.profil = this.appMain.user.profil;
      this.gare = this.appMain.user.agence.codeAgc;

      console.log(this.profil);

      this.bateauService.getBateaux().subscribe((response: any) =>
        {
          this.bateaux = response;
          console.log(this.bateaux);
        }
      );

      this.voyageService.getVoyages().subscribe((response:any) => 
        {
          this.voyages_ = response;
          console.log(this.voyages_);
        }
      );

      this.fret.getFrets().subscribe((response : any) => {
        this.fretClts = response;
        console.log("All Fret", this.fretClts);
      });

      this.cltEnCompteService.getAllClientEnCompte().subscribe((response:any) => {
        this.cltEnComptes = response;
        console.log(this.cltEnComptes);
      });

      this.tarificationService.getTarifs().subscribe((response: any) => {
        this.bagages = response.filter((item: any) => item.bagage === true);
        console.log(this.bagages);
      });      

      this.cols = [
          { field: 'product', header: 'Product' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' },
          { field: 'rating', header: 'Reviews' },
          { field: 'inventoryStatus', header: 'Status' }
      ];

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];

      this.bateauService.getBateaux().subscribe((response: any) =>
        {
          this.bateaux = response;
          console.log(this.bateaux);
        }
      );

      this.fret.getFretParEtat().subscribe((response:any) => 
        {
          this.getFretByState = response;
              this.getFretByState_ = Object.entries(this.getFretByState).map(([statut, frets]) => ({
                  statut,
                  frets
              }));
              console.log(this.getFretByState_);
        }
      );
  }

  cancelFret() {
    this.submitted = true; // pour afficher le message d'erreur si nécessaire

    // Vérification du motif
    if (!this.motif || this.motif.trim().length < 5) {
      // on ne ferme pas le dialogue, on ne fait rien
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'SILECS', 
        detail: 'Veuillez fournir un motif d\'au moins 5 caractères', 
        life: 3000 
      });
      return;
    }

    // Si le motif est valide
    this.annulation.fretId = this.oneCltFretEdit.fretId;
    this.annulation.motif = this.motif;

    this.fret.annulerFret(this.annulation).subscribe({
      next: response => {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'SILECS', 
          detail: 'Frêt annulé avec succès', 
          life: 3000 
        });
        this.motif = "";
        this.motifDialog = false;
        this.submitted = false; // réinitialisation
      },
      error: error => {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'SILECS', 
          detail: 'Erreur serveur', 
          life: 3000 
        });
        console.error('ERROR', error);
      }
    });
  }

  getVoyageById(voyId: number): VoyageO | null {
    const voyage = this.voyages.find(v => v.voy_id === voyId);
    return voyage !== undefined ? voyage : null;
  }

  getExpediteur(fret_id : number)
  {
    console.log(fret_id);
    this.fret.getOneFret(fret_id).subscribe((response : any) => {
      this.displayFretOk = response;
    });
  }
  

  onBoatSelected()
  {
    this.fret.getVoyageOfDay(this.selectedBateau).subscribe((response : any) => {
        this.voyages = response;
        console.log(this.voyages);
    });
    
  }

  onVoySelected()
  {
    console.log(this.selectedVoyage);
    this.v = this.getVoyageById(this.selectedVoyage);
    console.log(this.v);
  }

  formatDateToFrench(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getCltEnCompte(cltCmpt : number)
  {
    this.cltEnCompteService.getClientEnCompte(cltCmpt).subscribe((response:any) => {
        this.cltEnCompte = response;
        this.solde = this.cltEnCompte.soldeCompte;
        console.log(this.cltEnCompte);

        this.passager.firstName = this.cltEnCompte.firstnameContact;
        this.passager.lastName = this.cltEnCompte.lastnameContact;
        this.passager.phone = this.cltEnCompte.contact;
        this.passager.mail = this.cltEnCompte.mail;;      
        
      });
  }

  getBagageDetails(tbg_id: number): any {
    const bagage = this.bagages.find((item: any) => item.typeBagage.tbg_id === tbg_id);
    //console.log(bagage); // Affiche les détails du bagage
    return bagage.cat_nom;
  }

  getCategorieDetails(cat_id: number): any {
    const bagage = this.bagages.find((item: any) => item.cat_id === cat_id);
    //console.log(bagage); // Affiche les détails du bagage
    return bagage.cat_nom;
  }

  getBagagePU(cat_id: number | null): any 
  {
    if (cat_id === null) 
    {
      return 0; // Retourne 0 si cat_id est null
    }
    const bagage = this.bagages.find((item: any) => item.cat_id === cat_id);
    return bagage ? bagage.cat_prix : 0;
  }
  
  
  getUniteBagage(tbg_id: number): any {
    const bagage = this.bagages.find((item: any) => item.typeBagage.tbg_id === tbg_id);
    return bagage.typeBagage.unite.vol_id;
  }

  calculateTotal(): number {
    let total = 0;
  
    this.ligneFret.forEach((ligne) => {
      const prixUnitaire = this.getBagagePU(ligne.cat_id); // Récupère le prix unitaire pour le tbg_id
      const unite = this.getUniteBagage(ligne.tbg_id);
      if (prixUnitaire !== undefined) {
        if (unite === 1)
          {
            total += ligne.quantity * prixUnitaire; // Multiplie la quantité par le prix unitaire et ajoute au total
          }
          if (unite === 2)
            {
              total += ligne.weight * prixUnitaire; // Multiplie la quantité par le prix unitaire et ajoute au total
            }
            if (unite === 3)
              {
                total += ligne.volume * prixUnitaire; // Multiplie la quantité par le prix unitaire et ajoute au total
              }
        }
    });
  
    return Math.round(total);
  }

  calculateTotal2(): number {
    let total = 0;

    console.log("outside");
    console.log(this.oneCltFretEdit);

      this.ligneFret2.forEach((ligne) => {
        const prixUnitaire = this.getBagagePU(ligne.cat_id); // Récupère le prix unitaire pour le tbg_id
        const unite = this.getUniteBagage(ligne.tbg_id);
        console.log(prixUnitaire);
        console.log(unite);
        if (prixUnitaire !== undefined) {
          if (unite === 1)
            {
              total += ligne.quantity * prixUnitaire; // Multiplie la quantité par le prix unitaire et ajoute au total
            }
            if (unite === 2)
              {
                total += ligne.weight * prixUnitaire; // Multiplie la quantité par le prix unitaire et ajoute au total
              }
              if (unite === 3)
                {
                  total += ligne.volume * prixUnitaire; // Multiplie la quantité par le prix unitaire et ajoute au total
                }
          }
      });

    return Math.round(total);
  }
  
  onBagageSelect(event: any) {
    this.selectedBagage = event.value;
    console.log("selectedBagage:", this.selectedBagage); // Vérifie son contenu
  
    if (!this.selectedBagage?.typeBagage) {
      console.error("ERREUR: typeBagage est undefined dans selectedBagage !");
      return;
    }
  
    if (!this.selectedBagage?.typeBagage?.unite) {
      console.error("ERREUR: unite est undefined dans typeBagage !");
      return;
    }
  
    this.selectedBagage2.tbg_id = this.selectedBagage.tbg_id;
    this.selectedBagage2.vol_id = this.selectedBagage.typeBagage.unite.vol_id;
  
    console.log("selectedBagage2:", this.selectedBagage2);
  }
  

  onSaisieChange() 
  {
    if (this.codeBillet) 
    {
      this.searchBillet();
    }

  }

  addLineFret() 
  {
    //this.ligneFret = [];
    //console.warn(`Aucun client trouvé à l'index ${index} dans cltFret.`);
    // Si le client n'est pas trouvé, vous pouvez gérer cela comme vous le souhaitez
    const newLigneFret = {
        ligneFret_id : 0,
        fret_id : 0,
        quantity: Number(this.unit),
        weight: Number(this.qte),
        volume: Number(this.vol),
        tbg_id: this.selectedBagage.typeBagage.tbg_id,
        cat_id: this.selectedBagage.cat_id,
        details: this.detail // Inclure le pax_id dans la nouvelle ligne de fret
    };

    // Ajouter la nouvelle ligne de fret à la liste
    this.ligneFret.push(newLigneFret);

    // Maintenant, assigner ligneFretDTOList à fretDTOS de oneCltFret
    //this.oneCltFret.fretDTOS = this.oneCltFret.fretDTOS || {};
    this.oneCltFret.fretDTOS.ligneFretDTOList = this.ligneFret;
    console.log(this.oneCltFret);
    this.detail = "";
    this.qte = 0;
    this.unit = 0;
    this.vol = 0;
    this.productDialog2 = false;

  }

  addLineFret2()
  {
    //this.ligneFret = [];
    //console.warn(`Aucun client trouvé à l'index ${index} dans cltFret.`);
    // Si le client n'est pas trouvé, vous pouvez gérer cela comme vous le souhaitez
    const newLigneFret2 = {
        ligneFret_id : 0,
        fret_id : 0,
        quantity: Number(this.unit),
        weight: Number(this.qte),
        volume: Number(this.vol),
        tbg_id: this.selectedBagage.typeBagage.tbg_id,
        cat_id: this.selectedBagage.cat_id,
        details: this.detail // Inclure le pax_id dans la nouvelle ligne de fret
    };

    // Ajouter la nouvelle ligne de fret à la liste
    this.ligneFret2.push(newLigneFret2);

    // Maintenant, assigner ligneFretDTOList à fretDTOS de oneCltFret
    //this.oneCltFret.fretDTOS = this.oneCltFret.fretDTOS || {};
    this.oneCltFretEdit.ligneFretDTOList = this.ligneFret2;
    console.log(this.oneCltFretEdit);
    this.detail = "";
    this.qte = 0;
    this.unit = 0;
    this.vol = 0;
    this.productDialog4 = false;

  }

  async validerOps() 
  {
    if (!this.passager.firstName)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez remplir le prénom (s) de l\'expéditeur', life: 3000 });
            return;
          }

    if (!this.passager.lastName)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez remplir le nom de l\'expéditeur', life: 3000 });
            return;
          }

    if (!this.passager.phone)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez remplir le téléphone de l\'expéditeur', life: 3000 });
            return;
          }      

    // Autres champs pour cltFret et ligneFret
    if (!this.oneCltFret.fretDTOS) {
                this.oneCltFret.fretDTOS = {
                  voy_id: 0,
                  fretClt_id: 0,
                  ligneFretDTOList: LigneFret[0],
                  fretId: 0,
                  fretCode: '',
                  expEqDest: false,
                  raisonSocialeDest: '',
                  firstnameDest: '',
                  lastnameDest: '',
                  telephoneDest: '',
                  emailDest: '',
                  fretAcompte: 0,
                  fretMontant: 0,
                  fretTva: 0,
                  fretRemiseTaux: 0,
                  fretRemise: 0,
                  fretMontant_ht: 0,
                  applyTVA: false,
                  applyPayment: false,
                  fretDate: '',
                  fretDesc: '',
                  usrLogin: '',
                  fretPayDate: '',
                  fretPayUsr: '',
                  fretEtat: false,
                  coutMagasinage: 0,
                  coutMagasinageRemise: 0,
                  usrMagasinage: '',
                  dateMagasinage: '',
                  usrLoginPayable: '',
                  dateEncaissPayable: '',
                  cltcmpt_id: 0,
                  billet:'',
                  carabane : 0,
                  motif:'',
                  paymentMethod : ''
                };  // Initialisation de fretDTOS s'il n'existe pas
    }
    
    // Initialiser également ligneFretDTOList si nécessaire
    if (!this.oneCltFret.fretDTOS.ligneFretDTOList) 
    {
        this.oneCltFret.fretDTOS.ligneFretDTOList = [];  // Initialiser la liste si elle n'existe pas
    }

    if (this.oneCltFret.fretDTOS.ligneFretDTOList.length === 0) 
    {
        this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Le frêt doit contenir obligatoirement des produits', life: 3000 });
        return;
    }
    
    // Assigner les détails du passager à oneCltFret
    //this.oneCltFret.pax_id = this.passagers[index].paxId;
    this.oneCltFret.firstname = this.passager.firstName;
    this.oneCltFret.lastname = this.passager.lastName;
    this.oneCltFret.numeroPiece = this.passager.numeropiece;
    this.oneCltFret.telephone = this.passager.phone;
    this.oneCltFret.fretDTOS.fretCode = this.gare;
    this.oneCltFret.fretDTOS.usrLogin = this.user;

    this.oneCltFret.fretDTOS.firstnameDest = this.passager2.firstName;
    this.oneCltFret.fretDTOS.lastnameDest = this.passager2.lastName;
    this.oneCltFret.fretDTOS.telephoneDest = this.passager2.phone;
    this.oneCltFret.fretDTOS.emailDest = this.passager2.mail;

    if (this.gare === "GMK")
    {
      this.oneCltFret.fretDTOS.carabane = 1;
    }

    console.log(this.oneCltFret);
    console.log(this.idBillet);

    this.fret.submitFret(this.oneCltFret, this.selectedCltCmpt, this.v.voy_id, this.idBillet, this.checked).subscribe(
      {
      next: response => {
        console.log('SUCCESSFUL', response);
        if (response === null)
        {
          this.deleteProductDialog3 = true;
        }
        else
        {
          this.productDialog = false;
          window.location.reload();
        }
        
        //this.onNext();
        //this.idReservation = response.aolId;
      },
      error: error => {
        console.error('ERROR', error);
      }
    }
    
  );
        await this.getAllFret();
  }


  async getAllFret() {
      this.fret.getFretParEtat().subscribe((response:any) => 
        {
          this.getFretByState = response;
              this.getFretByState_ = Object.entries(this.getFretByState).map(([statut, frets]) => ({
                  statut,
                  frets
              }));
              console.log(this.getFretByState_);
        }
      );
  }

  closeSoldeIns()
  {
    this.deleteProductDialog3 = false;
    window.location.reload();
  }

  validerOps2() 
  {

    console.log(this.ligneFret2);
    console.log(this.oneCltFretEdit.fretClt_id);
    console.log(this.oneCltFretEdit.fretId);
    this.fret.updateFret(this.oneCltFretEdit.fretId, this.ligneFret2, 0, 0, 0, false).subscribe(
      {
      next: response => {
        console.log('SUCCESSFUL', response)
      },
      error: error => {
        console.error('ERROR', error);
      }
    }
  );
  this.productDialog3 = false;

  }

  onCheckChange2(event : any) 
  {
    console.log(event.checked2); // Met à jour la valeur sélectionnée
  }

  onCheckChange(event : any) 
  {
    console.log(event.checked); // Met à jour la valeur sélectionnée
    if(event.checked)
    {
        this.passager2.firstName = this.passager.firstName;
        this.passager2.lastName = this.passager.lastName;
        this.passager2.phone = this.passager.phone;
        this.passager2.mail = this.passager.mail;
        this.passager2.numeropiece = this.passager.numeropiece;
        this.passager2.tPiece = this.passager.tPiece;
    }
    else
    {
        this.passager2.firstName = "";
        this.passager2.lastName = "";
        this.passager2.phone = "";
        this.passager2.mail = "";
        this.passager2.numeropiece = "";
        this.passager2.tPiece = 0;
    }
  }

  onCheckChange3(event : any) 
  {
    
  }


  printTicketFret(oneCltFret : FretClt) {
    this.oneCltFretEdit = { ...oneCltFret };
    console.log(oneCltFret as any);
    this.ligneFret3 = this.oneCltFretEdit.ligneFretDTOList;
    console.log(this.ligneFret3);
    this.outBillet = true;
    this.getExpediteur(oneCltFret.fretId);

    this.qrCodeUrl$ = this.billetService.generateQRCode(String((oneCltFret as any).fretCode)).pipe(map(data => this.sanitizer.bypassSecurityTrustUrl(data)));
  }

  generateQR(ok: any) {
    this.billetService.generateQRCode(String(ok)).subscribe({
      next: (data: string) => {
        // data contient probablement "data:image/png;base64,...."
        // this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(data);
      },
      error: (error) => {
        console.error('Error generating QR code', error);
      }
    });
  }

  printTicket() 
  {
    
    const printContents = document.getElementById('ticket-container')?.innerHTML;
    if (printContents) {
        //this.saveEtatBillet() 
        console.log("Ok")

        // Créer une iframe temporaire
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.top = '-10000px'; // Hors de la vue
        document.body.appendChild(iframe);
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(`
                <html>
                <head>
                    <title>Impression ticket (s) frêt</title>
                    <style>
                        body 
                          {
                            background: white;
                            font-size: 10pt;
                          }

                          .table
                          { width: 20cm;
                            height: 24cm;
                            margin: 0;
                            padding: 0;
                            border-spacing: 0;
                          }

                          .stable
                          { width:  20cm;
                            height: 24cm;
                            
                          }

                          .stable_billet
                          { width: 20cm;
                            height: 7.6cm;
                          }

                          .table_ticket_fret
                          { width: 8.5cm;
                            height: 8cm;
                            border : 1px solid;
                          }

                          .stable_ticket_fret
                          { width:  10cm;
                            height: 10cm;
                          }

                          .td_class {
                          border:thin solid black;
                            margin: 0;
                            padding: 0;
                            border-spacing: 0;
                          }

                          .titre_1 {
                          font-family:Verdana, Arial, Helvetica, sans-serif;
                          font-size:24px;
                          font-weight:bold;
                          text-align:left;
                          }

                          .titre_1t {
                          font-family:Verdana, Arial, Helvetica, sans-serif;
                          font-size:18px;
                          font-weight:bold;
                          text-align:left;
                          }
                          
                          .titre_2 {
                          font-family:Verdana, Arial, Helvetica, sans-serif;
                          font-size:11px;
                          font-weight:bold;
                          }

                          .titre_2t {
                          font-family:Verdana, Arial, Helvetica, sans-serif;
                          font-size:11px;
                          font-weight:bold;
                          }

                          .titre_3 {
                          font-family:Verdana, Arial, Helvetica, sans-serif;
                          font-size:11px;
                          color:#666666;
                          }

                          .value{
                          font-family:Verdana, Arial, Helvetica, sans-serif;
                          font-size:11px;
                          font-weight: bold;
                          color: black;
                          }

                          .valuet{
                          font-family:Verdana, Arial, Helvetica, sans-serif;
                          font-size:8px;
                          font-weight: bold;
                          color: black;
                          }

                          .value_1{
                          font-family:Verdana, Arial, Helvetica, sans-serif;
                          font-size:11px;
                          color: black;
                          font-weight: bold;
                          }

                          .date {
                          font-family:Verdana, Arial, Helvetica, sans-serif;
                          font-size:11px;
                          color: black;
                          }

                          .pied_page {
                          font-family:Verdana, Arial, Helvetica, sans-serif;
                          font-size:11px;
                          font-weight:bold;
                          }

                          .pied_paget {
                          font-family:Verdana, Arial, Helvetica, sans-serif;
                          font-size:9px;
                          }

                          .pied_page_1 {
                          font-family:Verdana, Arial, Helvetica, sans-serif;
                          font-size:11px;
                          font-weight:lighter;
                          }

                    </style>
                </head>
                <body>
                    ${printContents}
                </body>
                </html>
            `);

            iframeDoc.close();

            // Imprimer l'iframe
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();

            // Nettoyer l'iframe après l'impression
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000);

            console.log("Final")
        }
        
    }
    this.outBillet = false;
  }


  printTicket_() 
  {
    const printContents = document.getElementById('ticket-content')?.innerHTML;
    if (printContents) {
        //this.saveEtatBillet() 
        const originalContents = document.body.innerHTML;

        // Créer une iframe temporaire
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.top = '-10000px'; // Hors de la vue
        document.body.appendChild(iframe);

        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(`
                <html>
                <head>
                    <title>COSAMA SA</title>
                    <style>
                        @media print {
                          /* Format pour un rouleau de 79,50 mm de largeur */
                          * {
                              font-family: 'Consolas', Courrier New !important;
                          }
                          body 
                          {
                              background: white;
                          }                   
                          #ticket-content {
                              /*width: 79.5mm; /* Largeur pour un rouleau de 79.50 mm */
                              width: 57.5mm; /*Largeur pour un rouleau de 57.50 mm */
                              font-size: 10px;
                              text-align: center;
                              position: absolute;
                              left: 0;
                              margin: 0px;
                              padding: 5px; /* Réduction du padding pour minimiser l'espace */
                              color: black; /* Couleur de texte */
                          }   

                          .titre_1 {
                              font-family:Verdana, Arial, Helvetica, sans-serif;
                              font-size:30px;
                              font-weight:bold;
                              text-align:left;
                          }

                            .titre_2 {
                              font-family:Verdana, Arial, Helvetica, sans-serif;
                              font-size:10px;
                              font-weight:bold;
                            }
                            
                            .titre_3 {
                              font-family:Verdana, Arial, Helvetica, sans-serif;
                              font-size:11px;
                              color:#666666;
                            }
                      }


                    </style>
                </head>
                <body>
                    ${printContents}
                </body>
                </html>
            `);
            iframeDoc.close();

            // Imprimer l'iframe
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();

            // Nettoyer l'iframe après l'impression
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000);
        }
    }  
    this.outBillet2 = false;
}

  searchBillet() { 
    console.log(this.codeBillet);
    if(!this.codeBillet)
    {
        this.passager.firstName = "";
        this.passager.lastName = "";
        this.passager.phone = "";
        this.passager.mail = "";      
        this.passager.numeropiece = "";
        this.passager.tPiece = 0;
    }
    else
    {
        this.billetService.getDetailsBillet(this.codeBillet).subscribe((response: any) => {
            if (response)
                {
                    console.log(response);
                    // Récupère billets dans une liste
                    this.billet = response;
                    console.log("Billet: ", this.billet);
                    this.idBillet = this.billet.bilId;
                    //this.passager.civilite = this.billet.civilite;
                    this.passager.firstName = this.billet.firstname;
                    this.passager.lastName = this.billet.lastname;
                    this.passager.phone = this.billet.phone;
                    this.passager.numeropiece = this.billet.numeropiece;
                    this.passager.tPiece = this.billet.typePieceId;
                    console.log("Passager", this.passager);
                }
            else
                {
                    this.passager.firstName = "";
                    this.passager.lastName = "";
                    this.passager.phone = "";
                    this.passager.mail = "";
                    this.passager.numeropiece = "";
                    this.passager.tPiece = 0;
                }
            });
        
    }

    //this.productDialog = false;
    //this.codeBillet = "";

    }

  onDropdownChange1() 
    {
        if(!this.selectedCltCmpt)
        {
            return null;
        }
        else
        {
            this.getCltEnCompte(this.selectedCltCmpt);
        }
    }

  openNew() 
  {
      this.oneCltFret;
      this.submitted = false;
      this.productDialog = true;
  }

  motifNew(oneCltFret : FretClt) 
  {
      this.oneCltFretEdit = { ...oneCltFret };
      this.motif = ""
      this.motifDialog = true;
  }

  editFret(oneCltFret : FretClt) {
    this.oneCltFretEdit = { ...oneCltFret };
    this.ligneFret2 = this.oneCltFretEdit.ligneFretDTOList;
    console.log(this.oneCltFretEdit);
    this.productDialog3 = true;
}

  openNew2() {
    this.product = {};
    this.submitted = false;
    this.productDialog2 = true;
    }

    openNew3() {
      this.product = {};
      this.submitted = false;
      this.productDialog4 = true;
      }

      openNew4(oneCltFret : FretClt) 
      {
        this.oneCltFretEdit = { ...oneCltFret };
        this.ligneFret2 = this.oneCltFretEdit.ligneFretDTOList;
        this.productDialog5 = true;
      }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: Product) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteProduct() {
      this.deleteProductDialog = true;
  }

  confirmDelete_(lignef: LigneFret) 
  {
      this.ligneFre = { ...lignef };
      this.ligneFret = this.ligneFret.filter(val => val.cat_id === this.ligneFre.cat_id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Produit frêt supprimé avec succés', life: 3000 });
      this.deleteProductDialog = false;
  }


  printTicketPassager(oneCltFret : FretDTO) 
  {
    this.oneCltFretEdit_ = { ...oneCltFret };
    this.ligneFret3 = this.oneCltFretEdit_.ligneFretDTOList;
    console.log(this.ligneFret3);
    this.outBillet2 = true;
  }

  calculateTotal3(): number {
    let total2 = 0;

    console.log("outside");
    console.log(this.oneCltFretEdit_);

      this.ligneFret3.forEach((ligne) => {
        const prixUnitaire = this.getBagagePU(ligne.cat_id); // Récupère le prix unitaire pour le tbg_id
        const unite = this.getUniteBagage(ligne.tbg_id);
        console.log(prixUnitaire);
        console.log(unite);
        if (prixUnitaire !== undefined) {
          if (unite === 1)
            {
              total2 += ligne.quantity * prixUnitaire; // Multiplie la quantité par le prix unitaire et ajoute au total
            }
            if (unite === 2)
              {
                total2 += ligne.weight * prixUnitaire; // Multiplie la quantité par le prix unitaire et ajoute au total
              }
              if (unite === 3)
                {
                  total2 += ligne.volume * prixUnitaire; // Multiplie la quantité par le prix unitaire et ajoute au total
                }
          }
      });

    return total2;
  }

  confirmDelete(lignef2: LigneFret) 
  {
        this.ligneFre = { ...lignef2 };
        this.deleteProductDialog = false;
        this.ligneFret2 = this.ligneFret2.filter(val => val.cat_id === this.ligneFre.cat_id);
        console.log(this.ligneFre.fret_id);

        //console.log("Actuellement", this.ligneFre);
        //this.product = {};
        this.fret.deleteFret(this.ligneFre, this.ligneFre.fret_id).subscribe(
          {
          next: response => 
            {
            console.log('SUCCESSFUL', response);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Ligne Fret bien supprimée', life: 3000 });
            //window.location.reload();
          },
          error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Erreur serveur', life: 3000 });
          }
    });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
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