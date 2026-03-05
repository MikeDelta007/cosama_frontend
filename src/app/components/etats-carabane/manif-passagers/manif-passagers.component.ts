import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { Bateau } from 'src/app/model/Bateau.model';
import { Categorie } from 'src/app/model/Categorie.model';
import { CategorieBagage } from 'src/app/model/CategorieBagage.model';
import { CategorieCreate } from 'src/app/model/CategorieCreate';
import { CategoriePlace } from 'src/app/model/CategoriePlace.model';
import { Country } from 'src/app/model/Country.model';
import { Critere } from 'src/app/model/Critere.model';
import { CritereCreate } from 'src/app/model/CritereCreate';
import { GroupeCritereCreate } from 'src/app/model/GroupeCritereCreate';
import { GroupeCritere } from 'src/app/model/GroupeCrt.model';
import { ManifesteAdulte } from 'src/app/model/ManifesteAdulte.model';
import { ManifesteBebe } from 'src/app/model/ManifesteBebe.model';
import { Niveau } from 'src/app/model/Niveau.model';
import { Place } from 'src/app/model/Place';
import { TypeBagage } from 'src/app/model/TypeBagage';
import { TypeBagageCreate } from 'src/app/model/TypeBago';
import { TypePiece } from 'src/app/model/TypePiece.model';
import { TypePlace } from 'src/app/model/TypePlace';
import { Ville } from 'src/app/model/Ville.model';
import { Voyage } from 'src/app/model/Voyage.model';
import { BateauService } from 'src/app/services/bateau.service';
import { BilletService } from 'src/app/services/billet.service';
import { DeblocageplaceService } from 'src/app/services/deblocageplace.service';
import { EtatService } from 'src/app/services/etat.service';
import { PlaceService } from 'src/app/services/place.service';
import { TarificationService } from 'src/app/services/tarification.service';
import { VoyageService } from 'src/app/services/voyage.service';

@Component({
  selector: 'app-manif-passagers',
  templateUrl: './manif-passagers.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./manif-passagers.component.scss']
})
export class ManifPassagersComponent implements OnInit {
  
  datamanifesteAdulte : ManifesteAdulte[] = [];
  datamanifesteEnfant : ManifesteAdulte[] = [];
  datamanifesteBebe : ManifesteAdulte[] = [];
  datamanifestePNE : any[] = [];
  databilletsReportes : any[] = [];
  datarapportPax : any[] = [];
  dataFounds : any[] = [];
  dataFounds_ : any[] = [];
  dataFounds__ : any[] = [];
  printDialog : boolean = false;
  printDialog2 : boolean = false;
  printDialog3 : boolean = false;
  printDialog4 : boolean = false;
  printDialog5 : boolean = false;
  printDialog6 : boolean = false;
  selectedTypePlace : any;
  selectedTypePlace2 : any;
  selectedTypePlace3 : any;
  selectedVoyage: any; // Pour stocker la valeur sélectionnée du dropdown voyage
  selectedVoyage2: any; // Pour stocker la valeur sélectionnée du dropdown voyage
  selectedVoyage3: any; // Pour stocker la valeur sélectionnée du dropdown voyage
  selectedVoyage4: any; // Pour stocker la valeur sélectionnée du dropdown voyage
  selectedVoyage5: any; // Pour stocker la valeur sélectionnée du dropdown voyage
  selectedVoyage6: any; // Pour stocker la valeur sélectionnée du dropdown voyage
  voyages: Voyage[] = []; // Pour stocker la valeur sélectionnée du dropdown voyage
  typePlaces: TypePlace[] = [];  
  public countries: Country[] = [];
  public typePieces: TypePiece[] = [];
  public places: Place[] = [];
  public villes: Ville[] = [];
  public bateaux: Bateau[] = [];
  niveaux: Niveau[] = [];  
  
  constructor(private readonly bateauService: BateauService, private readonly dbpS: DeblocageplaceService, private readonly placeService : PlaceService, private readonly billetService : BilletService, private readonly voyageService: VoyageService, private readonly etatService: EtatService, private readonly tarificationService: TarificationService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  
  ngOnInit() 
  {
      this.voyageService.getVoyages().subscribe((response:any) => 
        {
          this.voyages = response;
          console.log(this.voyages);
        }
      );

      this.dbpS.getTypePlaces().subscribe((response:any) => 
        {
        this.typePlaces = response;
        console.log(this.typePlaces);
        }
      );

      this.voyageService.getCountries().subscribe((response:any) => 
        {
        this.countries = response;
        console.log(this.countries);
        }
      );

      this.billetService.getPiece().subscribe((response:any) => {
        this.typePieces = response;
        console.log(this.typePieces);
      });

      this.billetService.getTypePlace().subscribe((response:any) => {
        this.typePlaces = response;
        console.log(this.typePlaces);
      });

      this.placeService.getPlaces().subscribe((response:any) => {
        this.places = response;
        console.log(this.places);
      });

      this.voyageService.getVilles().subscribe((response:any) => {
        this.villes = response;
        console.log(this.villes);
      });

      this.bateauService.getBateaux().subscribe((response:any) => {
        this.bateaux = response;
        console.log(this.bateaux);
      });

      this.placeService.getNiveaux().subscribe((response:any) => 
        {
        this.niveaux = response;
        console.log(this.niveaux);
        }
      );
  }
  
  openNew() 
  {
      this.printDialog = true;
  }

  openNew2() 
  {
      this.printDialog2 = true;
  }

  
  openNew3() 
  {
      this.printDialog3 = true;
  }

  openNew4() 
  {
      this.printDialog4 = true;
  }

  openNew5() 
  {
      this.printDialog5 = true;
  }

    openNew6() 
  {
      this.printDialog6 = true;
  }

  printManifeste() {
    const printContents = document.getElementById('ticket-content')?.innerHTML;
    console.log(printContents)
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
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Manifeste Passagers</title>
                  <style>
                      @page {
                          size: A4 landscape;
                          margin: 5mm;
                      }
                      body {
                          font-family: Times New Roman;
                          margin: 10px;
                      }
                      table {
                          width: 100%;
                          border-collapse: collapse;
                      }
                      th, td {
                          border: 0.5px solid black;
                          padding: 5px;
                          text-align: left;
                      }
                      th {
                          background-color: #f2f2f2;
                      }
                      .header {
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                      }
                      .header h2 {
                          margin: 0 auto;
                          text-align: center;
                      }
                      .header img {
                          height: 60px;
                      }
                  .footer 
                  {
                  position: fixed;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  text-align: center;
                  font-size: 10px;
                  border-top: 0.5px solid black;
                  padding: 5px 0;
                  background: white;
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
    this.printDialog = false;
}

    onDropdownChange() 
    {
        if (this.selectedVoyage) 
        {
            this.getManifeste();
        }
    }

    onDropdownChange2() 
    {
        if (this.selectedVoyage2) 
        {
            this.getManifeste2();
        }
    }

    onDropdownChange3() 
    {
        console.log("Ok");
        if (this.selectedVoyage3) 
        {
            this.getManifeste3();
        }
    }

    onDropdownChange4() 
    {
        console.log("Ok");
        if (this.selectedVoyage4) 
        {
            this.getManifeste4();
        }
    }

    onDropdownChange4_() 
    {
        this.dataFounds = [];
        console.log(this.selectedTypePlace)
        console.log(this.datamanifestePNE);
        this.dataFounds = this.datamanifestePNE.filter(pne => pne.typePlaceId === this.selectedTypePlace);
        console.log(this.dataFounds);

    }

    onDropdownChange5() 
    {
        console.log("Ok");
        if (this.selectedVoyage5) 
        {
            this.getManifeste5();
        }
    }

    onDropdownChange5_() 
    {
        this.dataFounds_ = [];
        console.log(this.selectedTypePlace2)
        console.log(this.databilletsReportes);
        this.dataFounds = this.databilletsReportes.filter(pne => pne.typePlaceId === this.selectedTypePlace2);
        console.log(this.dataFounds_);

    }

    onDropdownChange6() 
    {
        console.log("Ok");
        if (this.selectedVoyage6) 
        {
            this.getManifeste6();
        }
    }

    onDropdownChange6_() 
    {
        this.dataFounds_ = [];
        console.log(this.selectedTypePlace3)
        console.log(this.datarapportPax);
        this.dataFounds = this.datarapportPax.filter(pne => pne.typePlaceId === this.selectedTypePlace3);
        console.log(this.dataFounds__);

    }


    // Méthode pour lister les places disponibles
    getManifeste() 
    {
        console.log(this.selectedVoyage)
        this.datamanifesteAdulte = []

        const voyageCherche = this.voyages.find(voyage => voyage.voy_id === this.selectedVoyage);
        const batId = voyageCherche ? voyageCherche.bat_id : null;
        console.log(batId); // Affichera 1

        this.etatService.getManifesteAdulte_(this.selectedVoyage, batId).subscribe((response:any) => 
        {
            this.datamanifesteAdulte = response;
            console.log(this.datamanifesteAdulte);
        }
        );  
    }

    getManifeste2() 
    {
        console.log(this.selectedVoyage2)
        this.datamanifesteEnfant = []

        const voyageCherche = this.voyages.find(voyage => voyage.voy_id === this.selectedVoyage2);
        const batId = voyageCherche ? voyageCherche.bat_id : null;
        console.log(batId); // Affichera 1

        this.etatService.getManifesteEnfant_(this.selectedVoyage2, batId).subscribe((response:any) => 
        {
            this.datamanifesteEnfant = response;
            console.log(this.datamanifesteEnfant);
        }
        );  
    }

    getManifeste3()
    {
        console.log(this.selectedVoyage3)
        this.datamanifesteBebe = []

        const voyageCherche = this.voyages.find(voyage => voyage.voy_id === this.selectedVoyage3);
        const batId = voyageCherche ? voyageCherche.bat_id : null;
        console.log(batId); // Affichera 1

        this.etatService.getManifesteBebe_(this.selectedVoyage3, batId).subscribe((response:any) => 
        {
            this.datamanifesteBebe = response;
            console.log(this.datamanifesteBebe);
        }
        );  
    }

    getManifeste4()
    {
        console.log(this.selectedVoyage4)
        this.datamanifestePNE = []
        this.dataFounds = []

        const voyageCherche = this.voyages.find(voyage => voyage.voy_id === this.selectedVoyage4);
        const batId = voyageCherche ? voyageCherche.bat_id : null;
        console.log(batId); // Affichera 1

        this.etatService.getManifestePNE_(this.selectedVoyage4, batId).subscribe((response:any) => 
            {
                this.datamanifestePNE = response;
                this.dataFounds = this.datamanifestePNE;
                console.log(this.datamanifestePNE);
            }
        );  

        console.log(this.dataFounds);
    }

    getManifeste5()
    {
        console.log(this.selectedVoyage5)
        this.databilletsReportes = []
        this.dataFounds_ = []

        const voyageCherche = this.voyages.find(voyage => voyage.voy_id === this.selectedVoyage5);
        const batId = voyageCherche ? voyageCherche.bat_id : null;
        console.log(batId); // Affichera 1

        this.etatService.getBilletsReportes_(this.selectedVoyage5, batId).subscribe((response:any) => 
            {
                this.databilletsReportes = response;
                this.dataFounds_ = this.databilletsReportes;
                console.log(this.databilletsReportes);
            }
        );  

        console.log(this.dataFounds_);
    }

    getManifeste6()
    {
        console.log(this.selectedVoyage6)
        this.datarapportPax = []
        this.dataFounds__ = []

        const voyageCherche = this.voyages.find(voyage => voyage.voy_id === this.selectedVoyage6);
        const batId = voyageCherche ? voyageCherche.bat_id : null;
        console.log(batId); // Affichera 1

        this.etatService.getRapportPAX_(this.selectedVoyage6, batId).subscribe((response:any) => 
            {
                this.datarapportPax = response;
                this.dataFounds__ = this.datarapportPax;
                console.log(this.datarapportPax);
            }
        );  

        console.log(this.dataFounds__);
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