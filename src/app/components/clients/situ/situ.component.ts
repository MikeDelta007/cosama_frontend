import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppMainComponent } from 'src/app/app.main.component';
import { AppConfig } from 'src/app/demo/domain/appconfig';
import { Product } from 'src/app/demo/domain/product';
import { ConfigService } from 'src/app/demo/service/app.config.service';
import { ClientEnCompte } from 'src/app/model/ClientEnCompte.model';
import { Facturation } from 'src/app/model/Facturation.model';
import { SituationClient } from 'src/app/model/SituationClient.model';
import { ClientencompteService } from 'src/app/services/clientencompte.service';

@Component({
  selector: 'app-situ',
  templateUrl: './situ.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./situ.component.scss']
})
export class SituComponent implements OnInit {

    ordersChart: any;

    ordersOptions: any;

    activeOrders = 0;

    trafficChart: any;

    trafficOptions: any;

    activeTraffic = 0;

    goalChart: any;

    goalOptions: any;

    items: MenuItem[];

    val1 = 1;

    val2 = 2;

    orderWeek: any;

    selectedOrderWeek: any;

    products: Product[];

    productsThisWeek: Product[];

    productsLastWeek: Product[];

    config: AppConfig;

    subscription: Subscription;

    situClients: SituationClient[] = [];

    clientEnComptes : ClientEnCompte[] = [];

    selectedYear : number;

    selectedClientId : number;

    startDate : string = '';

    endDate : string = '';

    factures : Facturation[] = [];

    constructor(private readonly appMain: AppMainComponent, public readonly configService: ConfigService, private readonly clientEnCompteService : ClientencompteService) 
    {

    }

    ngOnInit() {

      // this.clientEnCompteService.getSituClient(1, 2025).subscribe((response:any) => 
      //   {
      //     this.situClients = response;
      //     console.log(this.situClients);
      //   }
      // );

      this.clientEnCompteService.getAllClientEnCompte().subscribe((response:any) => 
        {
          this.clientEnComptes = response;
          console.log(this.clientEnComptes);
        }
      );

        this.ordersChart = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Montant TTC',
                data: Array(12).fill(0),
                borderColor: [
                    'red',
                ],
                backgroundColor: [
                    'rgba(250, 128, 114, 0.1)'
                ],
                borderWidth: 2,
                fill: false,
                pointRadius: 3,
                tension: .4
              }, 
              {
                label: 'Montant HT',
                data: Array(12).fill(0),
                borderColor: [
                    'orange',
                ],
                backgroundColor: [
                    'rgba(255, 165, 0, 0.1)',
                ],
                borderWidth: 2,
                fill: false,
                pointRadius: 3,
                tension: .4
              },
              {
              label: 'Montant TVA',
              data: Array(12).fill(0),
              borderColor: [
                  '#b22222',
              ],
              backgroundColor: [
                  'rgba(255, 69, 0, 0.05)',
              ],
              borderWidth: 2,
              fill: false,
              pointRadius: 3,
              tension: .4
              },
            {
            label: 'Recouvrement',
            data: Array(12).fill(0),
            borderColor: [
                '#32cd32',
            ],
            backgroundColor: [
                'rgba(47, 142, 229, 0.05)',
            ],
            borderWidth: 2,
            fill: false,
            pointRadius: 3,
            tension: .4
          },
          {
            label: 'Reliquat',
            data: Array(12).fill(0),
            borderColor: [
                '#2f8ee5',
            ],
            backgroundColor: [
                'rgba(47, 142, 229, 0.05)',
            ],
            borderWidth: 2,
            fill: false,
            pointRadius: 3,
            tension: .4
          }
        
        ],
            responsive: true
        };

    }

    onYearSelect(event: Date) {
      this.selectedYear = event.getFullYear();
      console.log('Année sélectionnée :', this.selectedYear);
    }

    onDateSelect(event: Date) {
      console.log('Année sélectionnée :', event);
    }

    onClientSelect(event: any): void {
      this.selectedClientId = event.value;
    }


    getTracer()
    {
      this.clientEnCompteService.getSituClient(this.selectedClientId, this.selectedYear).subscribe((response:any) => 
        {
          this.situClients = response;
          console.log(this.situClients);
          const moisLabels = this.situClients.map(obj => obj.mois); // ["Janvier", "Février", ...]
          const m_ttc = this.situClients.map(obj => obj.total_ttc); // [141600, ..., etc.]
          const m_ht = this.situClients.map(obj => obj.total_ht); // [141600, ..., etc.]
          const m_tva = this.situClients.map(obj => obj.total_tva); // ou un autre champ comme total_ht
          const rec = this.situClients.map(obj => obj.total_verse); // ou un autre champ comme total_ht
          const rel = this.situClients.map(obj => obj.total_reliquat); // ou un autre champ comme total_ht

          this.ordersChart = {
            labels: moisLabels,
            datasets: [{
                label: 'Montant TTC',
                data: m_ttc,
                borderColor: [
                    'red',
                ],
                backgroundColor: [
                    'rgba(250, 128, 114, 0.1)'
                ],
                borderWidth: 2,
                fill: false,
                pointRadius: 3,
                tension: .4
              }, 
              {
                label: 'Montant HT',
                data: m_ht,
                borderColor: [
                    'orange',
                ],
                backgroundColor: [
                    'rgba(255, 165, 0, 0.1)',
                ],
                borderWidth: 2,
                fill: false,
                pointRadius: 3,
                tension: .4
              },
              {
              label: 'Montant TVA',
              data: m_tva,
              borderColor: [
                  '#b22222',
              ],
              backgroundColor: [
                  'rgba(255, 69, 0, 0.05)',
              ],
              borderWidth: 2,
              fill: false,
              pointRadius: 3,
              tension: .4
              },
            {
            label: 'Recouvrement',
            data: rec,
            borderColor: [
                '#32cd32',
            ],
            backgroundColor: [
                'rgba(47, 142, 229, 0.05)',
            ],
            borderWidth: 2,
            fill: false,
            pointRadius: 3,
            tension: .4
          },
          {
            label: 'Reliquat',
            data: rel,
            borderColor: [
                '#2f8ee5',
            ],
            backgroundColor: [
                'rgba(47, 142, 229, 0.05)',
            ],
            borderWidth: 2,
            fill: false,
            pointRadius: 3,
            tension: .4
          }
        
        ],
            responsive: true
        };
        }
      );

    }

    
    getConsultation()
    {
      console.log('Client sélectionné :', this.selectedClientId);
      const dateFormatted1_ = formatDate(this.startDate, 'yyyy-MM-dd', 'en-US');
      const dateFormatted2_ = formatDate(this.endDate, 'yyyy-MM-dd', 'en-US');
      this.clientEnCompteService.getToutesLesFactures(this.selectedClientId, dateFormatted1_, dateFormatted2_).subscribe((response:any) => 
        {
          this.factures = response;
          console.log(this.factures);
        }
      );
    }
}