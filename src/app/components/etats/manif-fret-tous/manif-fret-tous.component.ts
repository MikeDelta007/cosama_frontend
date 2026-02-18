import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Bateau } from 'src/app/model/Bateau.model';
import { Country } from 'src/app/model/Country.model';
import { ManifesteFret } from 'src/app/model/ManifesteFret.model';
import { ManifesteFret2 } from 'src/app/model/ManifesteFret2.model';
import { Niveau } from 'src/app/model/Niveau.model';
import { Place } from 'src/app/model/Place';
import { TypePiece } from 'src/app/model/TypePiece.model';
import { TypePlace } from 'src/app/model/TypePlace.model';
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
  selector: 'app-manif-fret-tous',
  templateUrl: './manif-fret-tous.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./manif-fret-tous.component.scss']
})
export class ManifFretTousComponent implements OnInit
{
  voyages: Voyage[] = []; // Pour stocker la valeur sélectionnée du dropdown voyage
  fretAPayers : ManifesteFret[] = [];
  selectedVoyage: any; // Pour stocker la valeur sélectionnée du dropdown voyage
  fretCltComptes : ManifesteFret[] = [];
  selectedVoyage2 : any; // Pour stocker la valeur sélectionnée du dropdown voyage
  manifestes : ManifesteFret2[] = [];
  selectedVoyage3 : any; // Pour stocker la valeur sélectionnée du dropdown voyage
  annulations : ManifesteFret2[] = [];
  selectedVoyage4 : any; // Pour stocker la valeur sélectionnée du dropdown voyage
  enAttentes : ManifesteFret2[] = [];
  selectedVoyage5 : any; // Pour stocker la valeur sélectionnée du dropdown voyage
  rapports : ManifesteFret2[] = [];
  selectedVoyage6 : any; // Pour stocker la valeur sélectionnée du dropdown voyage
  tvas : ManifesteFret2[] = [];
  selectedVoyage7 : any; // Pour stocker la valeur sélectionnée du dropdown voyage

  printDialog : boolean = false;
  printDialog2 : boolean = false;
  printDialog3 : boolean = false;
  printDialog4 : boolean = false;
  printDialog5 : boolean = false;
  printDialog6 : boolean = false;
  printDialog7 : boolean = false;

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
  
  openNew7() 
  {
      this.printDialog7 = true;
  }

  onDropdownChange() 
  {
      if (this.selectedVoyage) 
      {
          this.getData();
      }
  }

  getData() 
    {
        console.log(this.selectedVoyage)
        this.fretAPayers = []

        const voyageCherche = this.voyages.find(voyage => voyage.voy_id === this.selectedVoyage);
        const batId = voyageCherche ? voyageCherche.bat_id : null;
        console.log(batId); // Affichera 1

        this.etatService.fretAPayer(this.selectedVoyage).subscribe((response:any) => 
        {
            this.fretAPayers = response;
            console.log(this.fretAPayers);
        }
        );  
    }
  
    onDropdownChange2() 
  {
      if (this.selectedVoyage2) 
      {
          this.getData2();
      }
  }

  getData2() 
    {
        console.log(this.selectedVoyage2)
        this.fretCltComptes = []

        const voyageCherche = this.voyages.find(voyage => voyage.voy_id === this.selectedVoyage2);
        const batId = voyageCherche ? voyageCherche.bat_id : null;
        console.log(batId); // Affichera 1

        this.etatService.fretCltenCmpt(this.selectedVoyage2).subscribe((response:any) => 
        {
            this.fretCltComptes = response;
            console.log(this.fretCltComptes);
        }
        );  
    }
  
    onDropdownChange3() 
    {
        if (this.selectedVoyage3) 
        {
            this.getData3();
        }
    }
  
    getData3() 
      {
          console.log(this.selectedVoyage3)
          this.manifestes = []
  
          const voyageCherche = this.voyages.find(voyage => voyage.voy_id === this.selectedVoyage3);
          const batId = voyageCherche ? voyageCherche.bat_id : null;
          console.log(batId); // Affichera 1
  
          this.etatService.manifesteFret(this.selectedVoyage3).subscribe((response:any) => 
          {
              this.manifestes = response;
              console.log(this.manifestes);
          }
          );  
      }

      onDropdownChange4() 
      {
          if (this.selectedVoyage4) 
          {
              this.getData4();
          }
      }
    
      getData4() 
        {
            console.log(this.selectedVoyage4)
            this.annulations = []
    
            const voyageCherche = this.voyages.find(voyage => voyage.voy_id === this.selectedVoyage4);
            const batId = voyageCherche ? voyageCherche.bat_id : null;
            console.log(batId); // Affichera 1
    
            this.etatService.fretAnnuler(this.selectedVoyage4).subscribe((response:any) => 
            {
                this.annulations = response;
                console.log(this.annulations);
            }
            );  
        }

        onDropdownChange5() 
        {
            if (this.selectedVoyage5) 
            {
                this.getData5();
            }
        }
      
        getData5() 
          {
              console.log(this.selectedVoyage5)
              this.enAttentes = []
      
              const voyageCherche = this.voyages.find(voyage => voyage.voy_id === this.selectedVoyage5);
              const batId = voyageCherche ? voyageCherche.bat_id : null;
              console.log(batId); // Affichera 1
      
              this.etatService.fretAttente(this.selectedVoyage5).subscribe((response:any) => 
              {
                  this.enAttentes = response;
                  console.log(this.enAttentes);
              }
              );  
          }
    
          onDropdownChange6() 
          {
              if (this.selectedVoyage6) 
              {
                  this.getData6();
              }
          }
        
          getData6() 
            {
                console.log(this.selectedVoyage6)
                this.rapports = []
        
                const voyageCherche = this.voyages.find(voyage => voyage.voy_id === this.selectedVoyage6);
                const batId = voyageCherche ? voyageCherche.bat_id : null;
                console.log(batId); // Affichera 1
        
                this.etatService.manifesteFret(this.selectedVoyage6).subscribe((response:any) => 
                {
                    this.rapports = response;
                    console.log(this.rapports);
                }
                );  
            }
      
            onDropdownChange7() 
            {
                if (this.selectedVoyage7) 
                {
                    this.getData7();
                }
            }
          
            getData7() 
              {
                  console.log(this.selectedVoyage7)
                  this.tvas = []
          
                  const voyageCherche = this.voyages.find(voyage => voyage.voy_id === this.selectedVoyage7);
                  const batId = voyageCherche ? voyageCherche.bat_id : null;
                  console.log(batId); // Affichera 1
          
                  this.etatService.manifesteFret(this.selectedVoyage7).subscribe((response:any) => 
                  {
                      this.tvas = response;
                      console.log(this.tvas);
                  }
                  );  
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
                        th{
                            border: 0.5px solid black;
                            padding: 5px;
                            text-align: left;
                            background-color: #f2f2f2;
                        }
                        td {
                            border: 0.5px solid black;
                            padding: 5px;
                            text-align: left;
                            font-size: 15px;
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
                            height: 55px;
                            width: 110px;
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

}

