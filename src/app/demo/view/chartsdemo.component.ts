import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppBreadcrumbService} from '../../app.breadcrumb.service';
import {forkJoin, map, Subscription} from 'rxjs';
import {AppConfig} from '../domain/appconfig';
import {ConfigService} from '../service/app.config.service';
import { StatsAdminService } from 'src/app/services/stats-admin.service';
import { CountProfilByUser } from 'src/app/model/CountProfilByUser.model';
import { CountTPByLevel } from 'src/app/model/CountTPByLevel.model';
import { Section } from 'src/app/model/Place';
import { VoyageService } from 'src/app/services/voyage.service';
import { Bateau } from 'src/app/model/Bateau.model';
import { VoyageO } from 'src/app/model/VoyageO.model';
import { BateauService } from 'src/app/services/bateau.service';
import { FretService } from 'src/app/services/fret.service';
import { DataForStatBilletCheck } from 'src/app/model/DataForStatBilletCheck.model';
import { AppMainComponent } from 'src/app/app.main.component';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './chartsdemo.component.html',
    providers: [MessageService],
    styles: [`
        .place-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 2px;
        }

        button {
            margin: 5px;
        }

        .icon-svg {
            width: 1.5em; /* Ajustez la taille de l'icône SVG selon vos besoins */
            height: 1.5em;
            vertical-align: middle; /* Assurez un alignement vertical correct avec le texte du bouton */
        }
        
        .button-content {
            display: flex;
            align-items: center;
            position: relative;
        }
        
        .button-text {
            margin-left: 1em; /* Ajustez l'espacement entre l'icône et le texte */
        }

        .color-indicator {
            width: 20px; /* Taille du cercle */
            height: 20px; /* Taille du cercle */
            border-radius: 50%; /* Rend le div arrondi */
            display: inline-block; /* Affiche le div en ligne */
            vertical-align: middle; /* Aligne verticalement le div */
            margin-right: 8px; /* Espacement à droite */
        }

        .blue {
            background-color:#007FFF; /* Bleu foncé */
        }

        .pink {
            background-color: #FFC0CB; /* Rose */
        }

        .purple {
            background-color: #800080; /* Violet */
        }

        /* Style for the button */
        .hover-button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        }

        /* Initially hide the image */
        #hover-image {
        display: none;
        position: absolute;
        top: 50px; /* Adjust the position as needed */
        left: 50px; /* Adjust the position as needed */
        }

        /* Show the image when the button is hovered */
        .hover-button:hover + #hover-image {
        display: block;
        }

        .dark-pink {
        background-color: #E0115F;
        }

        .legend-container {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px; /* Espacement entre les éléments */
            margin-bottom: 10px;
        }

        .status-indicators {
            display: flex;
            gap: 10px;
        }

        .status-box {
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: bold;
            color: white;
            text-align: center;
            min-width: 50px;
        }

        /* Couleurs */
        .libre {
            background-color: green;
        }

        .occupe {
            background-color: orange;
        }

        .reserve {
            background-color: purple;
        }

        .checkin {
            background-color: blue;
        }

        .abord {
            background-color: gray;
        }

        .other {
            background-color: red;
        }


    `]
})
export class ChartsDemoComponent implements OnInit, OnDestroy {

    billetsVendus : number = 0;

    partbilletsVendus : number = 0;

    billetsControles : number = 0;

    partbilletsControles : number = 0;

    billetsEnAttente : number = 0;

    partbilletsEnAttente : number = 0;

    lineData: any;

    barData: any;

    empbarData: any = {};

    empbarData2: any = {};

    pieData: any;

    pieData2: any;

    polarData: any;

    radarData: any;

    lineOptions: any;

    barOptions: any;

    barOptions2: any;

    barOptions3: any;

    pieOptions: any;

    polarOptions: any;

    radarOptions: any;

    config: AppConfig;

    subscription: Subscription;

    public statProfilByUser : CountProfilByUser[] = [];

    public statTPByLevel : CountTPByLevel[] = [];

    public statTPByLevel_ : CountTPByLevel[] = [];

    public statTBByUnite : CountProfilByUser[] = [];

    public sections: Section[] = [];

    public selectedBateau : number;

    public selectedBateau2 : number;

    public voyages : VoyageO[] = [];
    
    public voyages_ : VoyageO[] = [];
    
    bateaux : Bateau[] = [];
    
    public v : VoyageO = null;

    public v2 : VoyageO = null;

    public voyageOfDay : string;

    public voyageOfDay2 : string;

    public id_voy : number;

    public id_voy2 : number;

    trafficOptions: any;

    dataForStatCheck : DataForStatBilletCheck[] = [];

    public user : string;

    public user2 : string;

    public user3 : string;

    constructor(public appMain: AppMainComponent, private readonly bateauService: BateauService, private readonly fret : FretService, private readonly voyageService : VoyageService, private readonly statAdminService : StatsAdminService, public configService: ConfigService) 
    {}


    ngOnInit() 
    {

        this.user = this.appMain.user.profil.add_embarqment;
        this.user2 = this.appMain.user.profil.add_check_billet;
        this.user3 = this.appMain.user.login;

        console.log(this.user);
        console.log(this.user2);
        console.log(this.user3);

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
    
        //   this.fret.getVoyageOfDay().subscribe((response : any) => {
        //     this.voyages = response;
        //     console.log(this.voyages);
        //   });

        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });

        this.statAdminService.countProfilByUser().subscribe((response:any) => {
            this.statProfilByUser = response;

            // Générer une couleur unique par profil
            const colors_ = this.statProfilByUser.map(() => getRandomColor());

            this.barData = {
                labels: this.statProfilByUser.map(item => item.prfl_libelle), // Les libellés des profils
                datasets: [
                    {
                        label: 'Utilisateur (s) ',
                        backgroundColor: colors_,
                        borderColor: 'black',
                        data: this.statProfilByUser.map(item => item.decompte) // Les valeurs de `decompte`
                    }
                ]
            };
            console.log(this.statProfilByUser);
        });

        this.statAdminService.CountTPByLevel().subscribe((response:any) => {
            this.statTPByLevel = response;

            this.empbarData = 
            {
                labels: this.statTPByLevel.map(item => item.niveau),
                datasets: [
                    {
                        label: 'Chaise',
                        backgroundColor: '#228B22',
                        data: this.statTPByLevel.map(item => item.chaise),
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Cabine à 2 places',
                        backgroundColor: '#FFD700',
                        data: this.statTPByLevel.map(item => item.c2),
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Cabine à 4 places',
                        backgroundColor: '#FF4500',
                        data: this.statTPByLevel.map(item => item.c4),
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Cabine à 8 places',
                        backgroundColor: '#0000CD',
                        data: this.statTPByLevel.map(item => item.c8),
                        stack: 'Stack 0'
                    }
                ]
            };
            console.log(this.statTPByLevel);
        });

        this.statAdminService.CountTPByBateau().subscribe((response:any) => {
            this.statTPByLevel_ = response;

            this.empbarData2 = 
            {
                labels: this.statTPByLevel_.map(item => item.niveau),
                datasets: [
                    {
                        label: 'Chaise',
                        backgroundColor: '#228B22',
                        data: this.statTPByLevel_.map(item => item.chaise),
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Cabine à 2 places',
                        backgroundColor: '#FFD700',
                        data: this.statTPByLevel_.map(item => item.c2),
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Cabine à 4 places',
                        backgroundColor: '#FF4500',
                        data: this.statTPByLevel_.map(item => item.c4),
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Cabine à 8 places',
                        backgroundColor: '#0000CD',
                        data: this.statTPByLevel_.map(item => item.c8),
                        stack: 'Stack 0'
                    }
                ]
            };
            console.log(this.statTPByLevel_);
        });

        

        this.lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: 'rgb(255, 205, 86)',
                    borderColor: 'rgb(255, 205, 86)',
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: 'rgb(75, 192, 192)',
                    borderColor: 'rgb(75, 192, 192)',
                    tension: .4
                }
            ]
        };

        this.pieData = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }
            ]
        };

        this.statAdminService.countUserByAgence().subscribe((response: any) => {
            this.statProfilByUser = response;
        
            // Générer une couleur unique par profil
            const colors = this.statProfilByUser.map(() => getRandomColor());
        
            this.pieData = {
                labels: this.statProfilByUser.map(item => item.prfl_libelle), // Libellés
                datasets: [
                    {
                        label: 'Utilisateur (s)',
                        backgroundColor: colors,
                        borderColor: 'black',
                        data: this.statProfilByUser.map(item => item.decompte) // Valeurs
                    }
                ]
            };
            console.log(this.statProfilByUser);
        });
        
        // Fonction pour générer une couleur aléatoire
        function getRandomColor(): string {
            return `#${Math.floor(Math.random()*16777215).toString(16)}`;
        }

        this.statAdminService.countProductByUnite().subscribe((response: any) => {
            this.statTBByUnite = response;
        
            // Générer une couleur unique par profil
            const colors = this.statTBByUnite.map(() => getRandomColor());
        
            this.pieData2 = {
                labels: this.statTBByUnite.map(item => item.prfl_libelle), // Libellés
                datasets: [
                    {
                        label: 'Utilisateur (s)',
                        backgroundColor: colors,
                        borderColor: 'black',
                        data: this.statTBByUnite.map(item => item.decompte) // Valeurs
                    }
                ]
            };
            console.log(this.statTBByUnite);
        });

        this.polarData = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    3,
                    14
                ],
                backgroundColor: [
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB"
                ],
                label: 'My dataset'
            }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ]
        };

        this.radarData = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };

        this.updateChartOptions();
    }

    updateChartOptions() {
        if (this.config.dark)
            this.applyDarkTheme();
        else
            this.applyLightTheme();
    }

    onBoatSelected()
    {
      this.v = this.getVoyageByBoatId(this.selectedBateau);
      console.log(this.v);
      if (this.v !== null)
      {
        this.id_voy = this.v.voy_id;
        this.voyageOfDay = this.v.code_voyage + " du " + this.formatDateToFrench(this.v.voy_datedpt);
        this.placeCheck(this.selectedBateau, this.id_voy);
      }
      else
      {
        this.voyageOfDay = "";
      }
      
    }

    calculateTotalSumByLevel(level: string): number {
        return this.statTPByLevel_
            .filter(item => item.niveau === level)  // Filtrer par niveau
            .reduce((sum, item) => sum + item.chaise + item.c2 + item.c4 + item.c8, 0); // Additionner tous les champs
    }

    getBateauNomById(id: number): string | undefined {
        const bateau = this.bateaux.find(b => b.bat_id === id);
        return bateau ? bateau.bat_nom : undefined;
    }
    
    onBoatSelected2()
    {
      this.v2 = this.getVoyageByBoatId(this.selectedBateau2);
      console.log(this.v2);
      if (this.v2 !== null)
      {
        this.id_voy2 = this.v2.voy_id;
        console.log(this.id_voy2);
        this.voyageOfDay2 = this.v2.code_voyage + " du " + this.formatDateToFrench(this.v2.voy_datedpt);

        const X = this.calculateTotalSumByLevel(this.getBateauNomById(this.selectedBateau2));
        console.log(X);

        this.statAdminService.statCheckBillet(this.id_voy2).subscribe((response: any) =>
            {
              this.dataForStatCheck = response;
              this.billetsVendus = this.dataForStatCheck[0].val1;
              this.partbilletsVendus = parseFloat(((this.billetsVendus / X) * 100).toFixed(2));
              this.billetsControles = this.dataForStatCheck[0].val2
              this.partbilletsControles = parseFloat(((this.billetsControles / this.billetsVendus) * 100).toFixed(2));
              this.billetsEnAttente = this.dataForStatCheck[0].val3
              this.partbilletsEnAttente = parseFloat(((this.billetsEnAttente / this.billetsVendus) * 100).toFixed(2));

              console.log(this.partbilletsVendus, " ", this.partbilletsControles, " ", this.partbilletsEnAttente);
            }
          );

      }
      else
      {
        this.voyageOfDay2 = "";
      }
      
    }

    getVoyageByBoatId(batId: number): VoyageO | null {
        const voyage = this.voyages.find(v => v.bat_id === batId);
        return voyage !== undefined ? voyage : null;
    }

    formatDateToFrench(dateString: string): string {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
    
    
    applyLightTheme() {
        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: '#A0A7B5'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#A0A7B5'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#A0A7B5'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        this.barOptions = {
            plugins: 
            {
                legend: 
                {
                    display: false // Supprime la légende
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#A0A7B5'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#A0A7B5'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        this.barOptions2 = 
        {
            scales: {
                x: {
                    stacked: true,
                    ticks: 
                    {
                        color: '#A0A7B5'
                    },
                    grid: 
                    {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: '#A0A7B5'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        };

        this.polarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        this.radarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

    }

    applyDarkTheme() {
        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            }
        };

        this.polarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        this.radarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    getIcon(typePlace: number): string {
        switch (typePlace) {
          case 1:
            return 'assets/layout/images/seat.svg';
          case 2:
          case 3:
          case 4:
            return 'assets/layout/images/bed.svg';
          default:
            return '';
        }
      }

    getButtonClass(place: any): string {
        console.log(place);

        if (place?.vplstate === 4) return 'p-button p-button-success';
        return 'p-button p-button-danger'; // Valeur par défaut
    }

    getBadgeNumber(typePlace: number): number {
        switch (typePlace) {
          case 2:
            return 2;
          case 3:
            return 4;
          case 4:
            return 8;
          default:
            return 1;
        }
      }

      getColorClass(sexe: string): string 
        {
        switch (sexe) {
            case 'H':
            return 'blue';
            case 'F':
            return 'dark-pink'; // Darker pink
            default:
            return 'purple'; // Mauve violet for M or other values
        }
        }

        getSeverity(typePlace: number): string {
        switch (typePlace) {
            case 1:
            return "danger"; // Couleur pour type 1
            case 2:
            return "success"; // Couleur pour type 2
            case 3:
            return "primary"; // Couleur pour type 3
            case 4:
            return "info"; // Couleur pour type 4
            default:
            return "default"; // Valeur par défaut si aucune correspondance
        }
        }

        placeCheck(idBat: number, idVoy: number) 
        {
            this.sections = [];
            console.log(idBat, idVoy);
        
            this.voyageService.getNiveauPlace(idBat).subscribe((response: any) => {
                if (!response) return;
        
                // Récupération optimisée des placeIds
                const placeIds = response.flatMap((niveau: any) => niveau.places.map((place: any) => place.plcId));
        
                // Exécuter les deux appels en parallèle
                forkJoin({
                    isInVoyagePlaces: this.voyageService.isPlacesInVoyage(placeIds, idVoy),
                    stateResponses: forkJoin(placeIds.map(placeId => 
                        this.voyageService.getStateVP(idVoy, placeId).pipe(map(state => ({ placeId, state })))
                    ))
                }).subscribe(({ isInVoyagePlaces, stateResponses }) => {
                    
                    // Création d'une map pour retrouver plus facilement l'état par placeId
                    const stateMap = new Map((stateResponses as { placeId: number, state: number }[]).map(res => [res.placeId, res.state]));
        
                    response.forEach((niveau: any) => {
                        niveau.places.forEach((place: any, index: number) => {
                            place.alreadyInVoyage = isInVoyagePlaces[index] ?? false;
                            place.vplstate = stateMap.get(place.plcId) ?? null; // Assure une bonne correspondance
                        });
                    });
        
                    this.sections = response;
                    console.log("Nombre de sections:", this.sections.length, this.sections);
                }, (error) => {
                    console.error("Erreur lors de la récupération des données :", error);
                    this.sections = [];
                });
        
            }, (error) => {
                console.error("NOT FOUND :", error);
                this.sections = [];
            });
        
        }

    
}
