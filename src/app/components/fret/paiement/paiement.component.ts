import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppMainComponent } from 'src/app/app.main.component';
import { Product } from 'src/app/demo/domain/product';
import { Bateau } from 'src/app/model/Bateau.model';
import { Billet } from 'src/app/model/Billet.model';
import { Categorie } from 'src/app/model/Categorie.model';
import { ClientEnCompte } from 'src/app/model/ClientEnCompte.model';
import { FretClt, FretDTO, LigneFret } from 'src/app/model/FretClt.model';
import { Passager } from 'src/app/model/Passager.model';
import { Payment } from 'src/app/model/Payment.model';
import { VoyageO } from 'src/app/model/VoyageO.model';
import { BateauService } from 'src/app/services/bateau.service';
import { BilletService } from 'src/app/services/billet.service';
import { ClientencompteService } from 'src/app/services/clientencompte.service';
import { FretService } from 'src/app/services/fret.service';
import { TarificationService } from 'src/app/services/tarification.service';
import { VoyageService } from 'src/app/services/voyage.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

  public remise: number = 0;

  public valeurInitiale : number = 0;

  public source : number;

  public montantht : number;
  
  public montant : number = 0;

  productDialog: boolean = false;

  public idBillet : number = 0;

  productDialog2: boolean = false;

  productDialog3: boolean = false;

  productDialog4: boolean = false;

  selectedCltCmpt : number = 0;

  deleteProductDialog: boolean = false;

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

  public selectedBagage: any;

  public selectedBateau : number;

  public voyageOfDay : string;

  public detail : string;

  public qte_unit_vol : number;

  public ligneFret: LigneFret[] = [];

  public ligneFret2: LigneFret[] = [];

  public ligneFret3: LigneFret[] = [];

  public ligneFr: LigneFret[] = [];

  public fretMontantHT : number;

  public fretTva : number;

  public fretMontantTTC : number; 

  public user : any;

  getFretByStateBis : any;

  getFretByState_Bis : any[] = [];

  public onePayment : Payment = {
    fretId: 0,
    fretAcompte: 0,
    fretMontant: 0,
    fretTva: 0,
    fretRemiseTaux: 0,
    fretRemise: 0,
    fretMontant_ht: 0,
    applyTVA: false,
    applyPayment: false,
    fretPayUsr: '',
    cltcmpt_id: 0
  }

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

  bateaux : Bateau[] = [];

  public v : VoyageO = null;

  public oneCltFret : FretDTO = {
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
    motif: ''
  };


  public oneCltFretEdit : FretDTO = {
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
    motif: ''
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

  public fretClts : FretClt[] = [];

  public voyages_ : VoyageO[] = [];

  public outBillet2 : boolean;

  public outBillet3 : boolean;

  constructor(public voyageService: VoyageService, public appMain: AppMainComponent, private bateauService: BateauService, private fret : FretService, private tarificationService : TarificationService, private billetService : BilletService, private cltEnCompteService : ClientencompteService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
      //this.productService.getProducts().then(data => this.products = data);

      console.log(this.ligneFret);

      this.user = this.appMain.user.login;

      this.voyageService.getVoyages().subscribe((response:any) => 
        {
          this.voyages_ = response;
          console.log(this.voyages_);
        }
      );

      // this.fret.getVoyageOfDay().subscribe((response : any) => {
      //   this.voyages = response;
      //   console.log(this.voyages);
      // });

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

      
      this.fret.getFretParEtat_().subscribe((response:any) => 
        {
          this.getFretByStateBis = response;
              this.getFretByState_Bis = Object.entries(this.getFretByStateBis).map(([statut, frets]) => ({
                  statut,
                  frets
              }));
              console.log(this.getFretByState_Bis);
        }
      );

      
  }

  printTicketPassager(oneCltFret : FretDTO) {
    this.oneCltFretEdit = { ...oneCltFret };
    this.ligneFret3 = this.oneCltFretEdit.ligneFretDTOList;
    console.log(this.ligneFret3);
    this.outBillet2 = true; 
  }

  printTicketPassager_(oneCltFret : FretDTO) {
    this.oneCltFretEdit = { ...oneCltFret };
    this.ligneFret3 = this.oneCltFretEdit.ligneFretDTOList;
    console.log(this.ligneFret3);
    this.outBillet3 = true; 
  }

  printTicket() {
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
}

  getVoyageByBoatId(batId: number): VoyageO | null {
    const voyage = this.voyages.find(v => v.bat_id === batId);
    return voyage !== undefined ? voyage : null;
  }

  getVoyageById(voyId: number): string 
  {
    if (voyId === 0)
    {
      return "Pas de voyage";
    }
    else
    {
      const voyage = this.voyages.find(v => v.voy_id === voyId);
      console.log("VOYAGE", voyage)
      return `${voyage.code_voyage} du ${this.formatDateToFrench(voyage.voy_datedpt)}`;
    }
  }
  

  onBoatSelected()
  {
    this.v = this.getVoyageByBoatId(this.selectedBateau);
    console.log(this.v);
    if (this.v !== null)
    {
      this.voyageOfDay = this.v.code_voyage + " du " + this.formatDateToFrench(this.v.voy_datedpt);
    }
    else
    {
      this.voyageOfDay = "";
    }
    
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
    // Retourne la remise si le bagage est trouvé, sinon 0
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
  
    return total;
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

    return total;
  }

  calculateTotal3(): number {
    let total2 = 0;

    console.log("outside");
    console.log(this.oneCltFretEdit);

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
  

  onBagageSelect(event: any) {
    this.selectedBagage = event.value; // Récupère l'objet complet du bagage sélectionné
    console.log(this.selectedBagage); // Affiche l'objet bagage dans la console
  }

  onSaisieChange() 
  {
    if (this.codeBillet) 
    {
      this.searchBillet();
    }

  }

  addLineFret2()
  {
    //this.ligneFret = [];
    //console.warn(`Aucun client trouvé à l'index ${index} dans cltFret.`);
    // Si le client n'est pas trouvé, vous pouvez gérer cela comme vous le souhaitez
    const newLigneFret2 = {
        ligneFret_id : 0,
        fret_id : 0,
        quantity: Number(this.qte_unit_vol),
        weight: Number(this.qte_unit_vol),
        volume: Number(this.qte_unit_vol),
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
    this.qte_unit_vol = 0;
    this.productDialog4 = false;

  }


    
  validerOps()
  {

    console.log(this.ligneFret2);
    console.log(this.oneCltFretEdit.fretClt_id);
    console.log(this.oneCltFretEdit.fretId);

    this.onePayment.fretMontant_ht = this.oneCltFretEdit.fretMontant_ht;
    this.onePayment.fretMontant = this.oneCltFretEdit.fretMontant;
    this.onePayment.fretTva = this.oneCltFretEdit.fretTva;
    this.onePayment.fretRemise = this.oneCltFretEdit.fretRemise;
    this.onePayment.fretRemiseTaux = this.oneCltFretEdit.fretRemiseTaux;
    this.onePayment.applyPayment = true;
    this.onePayment.fretPayUsr = this.user;
    this.onePayment.applyTVA = this.checked2;

    console.log(this.checked2);
    //console.log(this.oneCltFretEdit.applyTVA);

    this.fret.doPayment(this.oneCltFretEdit.fretId, this.oneCltFretEdit.cltcmpt_id, this.onePayment).subscribe(
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

  onCheckChange2(event: any) {

    console.log("Checkbox value:", this.checked2); // Vérifier si la case est cochée
    
    this.source = this.oneCltFretEdit.fretMontant;
    this.montantht = this.oneCltFretEdit.fretMontant_ht;

    if (this.checked2)
      {
        this.oneCltFretEdit.applyTVA = true;
        this.oneCltFretEdit.fretTva = (this.source * 0.18);
        this.montant = this.montantht + this.oneCltFretEdit.fretTva;
      }
      else 
      {
        // Recalculer la TVA si décoché (ajoute une TVA de 18% par exemple)
        this.oneCltFretEdit.applyTVA = false;
        this.oneCltFretEdit.fretTva = 0;
        this.montant = this.montantht + this.oneCltFretEdit.fretTva; // Défalquer TVA du montant TTC
      }

    this.oneCltFretEdit.fretMontant = this.montant;
  }

  arrondir(nombre: number, decimales: number): number {
    const facteur = Math.pow(10, decimales);
    return Math.round(nombre * facteur) / facteur;
  }

  recalculerValeur(): void 
  {
    this.oneCltFretEdit.fretMontant_ht = this.arrondir(this.valeurInitiale * (1 - this.oneCltFretEdit.fretRemiseTaux / 100), 2);
    this.oneCltFretEdit.fretRemise = this.arrondir(((this.valeurInitiale * this.oneCltFretEdit.fretRemiseTaux) / 100), 2);
    this.oneCltFretEdit.fretTva = this.arrondir((this.oneCltFretEdit.fretMontant_ht * 18) / 100, 2);
    if(!this.checked2)
    {
      this.oneCltFretEdit.fretTva = 0;
    }
    this.oneCltFretEdit.fretMontant = this.arrondir(this.oneCltFretEdit.fretMontant_ht + this.oneCltFretEdit.fretTva, 2);
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


  editFret(oneCltFret : FretDTO) {
    this.oneCltFretEdit = { ...oneCltFret };
    this.ligneFret2 = this.oneCltFretEdit.ligneFretDTOList;
    this.checked2 = true;
    console.log(this.oneCltFretEdit);
    this.valeurInitiale = this.oneCltFretEdit.fretMontant_ht;
    this.productDialog3 = true;
}

voirPayment(oneCltFret : FretDTO) {
  this.oneCltFretEdit = { ...oneCltFret };
  this.ligneFret2 = this.oneCltFretEdit.ligneFretDTOList;
  //this.checked2 = true;
  console.log(this.oneCltFretEdit);
  this.valeurInitiale = this.oneCltFretEdit.fretMontant_ht;
  this.productDialog4 = true;
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

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: Product) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteProduct(lignef2: LigneFret) {
      this.deleteProductDialog = true;
      this.ligneFre = { ...lignef2 };
  }

  confirmDelete() 
  {
        this.deleteProductDialog = false;
        this.ligneFret2 = this.ligneFret2.filter(val => val.cat_id !== this.ligneFre.cat_id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Ligne Fret bien supprimée', life: 3000 });
        console.log(this.ligneFre.fret_id);
        this.product = {};
        this.fret.deleteFret(this.ligneFre, this.ligneFre.fret_id).subscribe(
          {
          next: response => 
            {
            console.log('SUCCESSFUL', response);
          },
          error: error => {
            console.error('ERROR', error);
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

  onGlobalFilter(table: Table, event: Event) 
  {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}