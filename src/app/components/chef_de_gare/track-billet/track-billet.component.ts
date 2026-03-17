import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';
import { BilletService } from 'src/app/services/billet.service';

@Component({
  templateUrl: './track-billet.component.html',
  styles: [`
      .custom-marker {
          display: flex;
          width: 2rem;
          height: 2rem;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          border-radius: 50%;
          z-index: 1;
      }
      
      ::ng-deep {
          .p-timeline-event-content,
          .p-timeline-event-opposite {
              line-height: 1;
          }
      }
      
      @media screen and (max-width: 960px) {
          :host ::ng-deep {
              .customized-timeline {
                  .p-timeline-event:nth-child(even) {
                      flex-direction: row !important;
      
                      .p-timeline-event-content {
                          text-align: left !important;
                      }
                  }
      
                  .p-timeline-event-opposite {
                      flex: 0;
                  }
      
                  .p-card {
                      margin-top: 1rem;
                  }
              }
          }
      }
  `]
})
export class TrackBilletComponent implements OnInit{

  customEvents: any[];

  horizontalEvents: any[];

  bilCode:string;

  constructor(private readonly billetService : BilletService) { }

  ngOnInit() {
    
      this.customEvents = [
          {status: 'Payé',date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: "blue"},
          {status: 'Produit',date: '15/10/2020 10:30', icon: PrimeIcons.PRINT, color: "navy"},
          {status: 'Reporté/Surclassé', date: '15/10/2020 14:00', icon: PrimeIcons.TAGS, color: 'orange'},
          {status: 'Annulé', date: '15/10/2020 16:15', icon: PrimeIcons.TRASH, color: 'red'},
          {status: 'Remboursé', date: '16/10/2020 10:00', icon: PrimeIcons.WALLET, color: 'purple'},
          {status: 'Check-In', date: '15/10/2020 16:15', icon: PrimeIcons.QRCODE, color: 'crimson'},
          {status: 'Embarqué', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK_SQUARE, color: 'green'}
      ];
  }

    searchStateBillet()
    { 
        console.log(this.bilCode);

        if(!this.bilCode)
        {
            this.customEvents = [];
        }
        else
        {
            this.billetService.getbilletState(this.bilCode)
            .subscribe((response: Object[]) => {
                // Récupère achatOnLine dans un objet
                this.customEvents = response;
        
                // Remplace les chaînes d'icônes par des constantes PrimeIcons correspondantes
                this.customEvents.forEach(event => {
                    if (event['icon'] === 'PrimeIcons.SHOPPING_CART') {
                        event['icon'] = PrimeIcons.SHOPPING_CART; // Remplace la chaîne par la constante
                    }
                    if (event['icon'] === 'PrimeIcons.PRINT') {
                        event['icon'] = PrimeIcons.PRINT; // Remplace la chaîne par la constante
                    }
                    if (event['icon'] === 'PrimeIcons.QRCODE') {
                        event['icon'] = PrimeIcons.QRCODE; // Remplace la chaîne par la constante
                    }
                    // Vous pouvez ajouter d'autres conversions ici si nécessaire
                });
        
                console.log(this.customEvents);          
            });
        }
        this.bilCode = "";
    }
}
