import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ManifesteFret } from 'src/app/model/ManifesteFret.model';
import { ManifesteFret2 } from 'src/app/model/ManifesteFret2.model';
import { Voyage } from 'src/app/model/Voyage.model';
import { EtatService } from 'src/app/services/etat.service';
import { VoyageService } from 'src/app/services/voyage.service';

@Component({
  selector: 'app-manif-fret',
  templateUrl: './manif-fret.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./manif-fret.component.scss']
})
export class ManifFretComponent implements OnInit
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
    
  constructor(private readonly etatService: EtatService, private readonly voyageService: VoyageService) { }
  
  ngOnInit() 
  {
      this.voyageService.getVoyages().subscribe((response:any) => 
        {
          this.voyages = response;
          console.log(this.voyages);
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

        this.etatService.fretAPayerC(this.selectedVoyage).subscribe((response:any) => 
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

        this.etatService.fretCltenCmptC(this.selectedVoyage2).subscribe((response:any) => 
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
  
          this.etatService.manifesteFretC(this.selectedVoyage3).subscribe((response:any) => 
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
    
            this.etatService.fretAnnulerC(this.selectedVoyage4).subscribe((response:any) => 
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
      
              this.etatService.fretAttenteC(this.selectedVoyage5).subscribe((response:any) => 
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
        
                this.etatService.manifesteFretC(this.selectedVoyage6).subscribe((response:any) => 
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
          
                  this.etatService.manifesteFretC(this.selectedVoyage7).subscribe((response:any) => 
                  {
                      this.tvas = response;
                      console.log(this.tvas);
                  }
                  );  
              }
        

}

