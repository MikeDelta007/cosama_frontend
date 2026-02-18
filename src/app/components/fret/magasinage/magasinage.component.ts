import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AppMainComponent } from 'src/app/app.main.component';
import { Billet } from 'src/app/model/AchatOnLine.model';
import { Bateau } from 'src/app/model/Bateau.model';
import { Categorie } from 'src/app/model/Categorie.model';
import { ClientEnCompte } from 'src/app/model/ClientEnCompte.model';
import { FretClt, FretDTO, LigneFret } from 'src/app/model/FretClt.model';
import { VoyageO } from 'src/app/model/VoyageO.model';
import { BateauService } from 'src/app/services/bateau.service';
import { BilletService } from 'src/app/services/billet.service';
import { ClientencompteService } from 'src/app/services/clientencompte.service';
import { FretService } from 'src/app/services/fret.service';
import { TarificationService } from 'src/app/services/tarification.service';
import { VoyageService } from 'src/app/services/voyage.service';

@Component({
  selector: 'app-magasinage',
  templateUrl: './magasinage.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./magasinage.component.scss']
})
export class MagasinageComponent implements OnInit {  
    valideBillet: boolean = false;
    public code_fret : string;
    public bilResult : string
    public bateaux : Bateau[] = [];

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

    public cltEnComptes : ClientEnCompte[] = [];

    public outRF : boolean = false;

      public productDialog : boolean = false;
    
      public bagages: Categorie[] = [];
      
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

      public gare : any;

      public fretClts : FretClt[] = [];
      
      public voyages_ : VoyageO[] = [];

      public voyages : VoyageO[] = [];

      public oneFret : FretDTO = {
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
        carabane: 0,
        ligneFretDTOList: [],
        motif: ''
      };

      public remisePourcentage: number = 0;

    constructor(public voyageService: VoyageService, public appMain: AppMainComponent, private bateauService: BateauService, private fret : FretService, private tarificationService : TarificationService, private fretService : FretService, private cltEnCompteService : ClientencompteService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
    
      ngOnInit() {
          //this.productService.getProducts().then(data => this.products = data);
    
          console.log(this.ligneFret);
    
          this.user = this.appMain.user.login;
          this.gare = this.appMain.user.agence.codeAgc;
    
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
    
    
          this.tarificationService.getTarifs().subscribe((response: any) => {
            this.bagages = response.filter((item: any) => item.bagage === true);
            console.log(this.bagages);
          });      
    
          this.bateauService.getBateaux().subscribe((response: any) =>
            {
              this.bateaux = response;
              console.log(this.bateaux);
            }
          );
    
          
      }

      formatDateToFrench(dateString: string): string {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
      
      
      getVoyageById(id: number): any | null 
      {
        const voy = this.voyages_.find(voyage => voyage.voy_id === id) || null;
        return voy.voy_datearriv;
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

          
      getFraisMagasinage(cat_id: number): any {
        const bagage = this.bagages.find((item: any) => item.cat_id === cat_id);
        //console.log(bagage); // Affiche les détails du bagage
        return bagage.frais_mag;
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

      calculateTotal3(): any[] {

        let listeAttribut = [];

        console.log(this.oneCltFretEdit);

        const date1 = this.getVoyageById(this.oneCltFretEdit.voy_id);

        const voyageDate = new Date(date1); // Exemple : "2025-04-18"
        const today = new Date();

        console.log(voyageDate);
        console.log(today);
      
        // Pour éviter les erreurs dues aux heures/minutes/secondes
        voyageDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
      
        const diffInMs = today.getTime() - voyageDate.getTime();
        let diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        if (diffInDays < 0)
        {
          diffInDays = 0;
        }

        console.log(diffInDays);

        let total = 0;
    
        this.ligneFret2.forEach((ligne) => {
            const prixUnitaire = this.getFraisMagasinage(ligne.cat_id); // Récupère le prix unitaire pour le tbg_id
            total = total + (prixUnitaire * diffInDays);
            listeAttribut.push(diffInDays);
            listeAttribut.push(total);
            listeAttribut.push(prixUnitaire);
            console.log(total);
        });
    
        return listeAttribut;
      }
  
      
      searchFret()
      { 
          console.log(this.code_fret);
    
          if(!this.code_fret)
          {
              this.bilResult = "Frêt inexistant";
          }
          else
          {
            this.fretService.getOneFretByCode(this.code_fret).subscribe((response : any) => {
              this.oneFret = response;
              console.log("The Fret", this.oneFret);
              if (this.oneFret === null)
              {
                this.bilResult = "Frêt déjà libéré ou inexistant";
              }
              else
              {
                this.oneCltFretEdit = {...this.oneFret};
                this.ligneFret2 = this.oneCltFretEdit.ligneFretDTOList;
                console.log(this.oneCltFretEdit);
                
                if (this.oneCltFretEdit.fretEtat === false) 
                {
                  this.bilResult = "Frêt annulé";
                } 
                if (this.oneCltFretEdit.fretEtat === true && this.oneCltFretEdit.usrMagasinage === null && this.oneCltFretEdit.applyPayment === true) 
                {
                  this.productDialog = true;
                }
                if (this.oneCltFretEdit.fretEtat === true && this.oneCltFretEdit.usrMagasinage === null && this.oneCltFretEdit.applyPayment === false) 
                {
                  this.bilResult = "Frêt impayé";
                }
                if (this.oneCltFretEdit.fretEtat === true && this.oneCltFretEdit.usrMagasinage !== null) 
                {
                  this.bilResult = "Frêt déjà contrôlé";
                }                
              }
            });
          }
      }

  arrondir(nombre: number, decimales: number): number {
        const facteur = Math.pow(10, decimales);
        return Math.round(nombre * facteur) / facteur;
  }

  printRecuFret(fret : FretDTO) 
  {
    this.oneCltFretEdit = { ...fret };
    this.ligneFret3 = this.oneCltFretEdit.ligneFretDTOList;
    this.outRF = true;
  }

  validerOps() 
  {
    this.oneCltFretEdit.usrMagasinage = this.user;
    this.oneCltFretEdit.coutMagasinage = this.calculateTotal3()[1];
    console.log(this.oneCltFretEdit.coutMagasinage);
    console.log(this.oneCltFretEdit.fretId);
    this.fret.submitMagasinage(this.oneCltFretEdit.fretId, this.oneCltFretEdit.coutMagasinage, this.oneCltFretEdit.usrMagasinage).subscribe(
      {
      next: response => {
        console.log('SUCCESSFUL', response)
        this.printRecuFret(response);

      },
      error: error => {
        console.error('ERROR', error);
      }
    }
  );
  this.productDialog = false;
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

      
}
