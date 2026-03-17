import {Component, OnInit} from '@angular/core';
import {EventService} from '../../../demo/service/eventservice';
import {AppBreadcrumbService} from "../../../app.breadcrumb.service";
// @fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { VoyageService } from 'src/app/services/voyage.service';
import { PlanVoyage } from 'src/app/model/PlanVoyage.model';
import { PlaceService } from 'src/app/services/place.service';
import { Bateau } from 'src/app/model/Bateau.model';
import { Section } from 'src/app/model/Place';
import { catchError, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { BilletService } from 'src/app/services/billet.service';
import { BilletDTO } from 'src/app/model/Passager.model';
import { Billet } from 'src/app/model/AchatOnLine.model';
import { VoyagePlace } from 'src/app/model/VoyagePlace.model';
import { AchatOnLine, AchatOnLineWithBillets } from 'src/app/model/AchatOnLine.model';

@Component({
    selector: 'app-calendar',
    providers: [MessageService, ConfirmationService],
    templateUrl: './app.calendar.component.html',
    styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .fc-header-toolbar {
                display: flex;
                flex-wrap: wrap;

                .fc-dayGridMonth-button {
                    margin-top: 1rem;
                }
                .fc-timeGridWeek-button{
                    margin-top: 1rem;
                }
                .fc-timeGridDay-button{
                    margin-top: 1rem;
                }
            }
        }

        :host ::ng-deep {
            .fc.fc-theme-standard .fc-highlight {
                color: #ffffff;
                background: var(--fc-highlight-color, rgba(63, 81, 181, 0.12));
            }
        }
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
export class AppCalendarComponent implements OnInit {

    events: PlanVoyage[]=[];

    options: any;

    header: any;

    eventDialog: boolean;

    changedEvent: any;

    clickedEvent = null;

    bateaux: Bateau[] = []; 
    
    results : Object[] = [];

    public sections: Section[] = [];

    public vp: VoyagePlace;

    customEvents: any[];

    horizontalEvents: any[];

    public productDialog : boolean = false;

    public voyage : number;
    
    public bateau : number;

    public achatOnLine: AchatOnLine;

    public billets: Billet[];
    
    public billet: Billet;

    constructor(private messageService: MessageService, private readonly billetService : BilletService, private placeService: PlaceService, private voyageService: VoyageService, private eventService: EventService, private breadcrumbService: AppBreadcrumbService) 
    {
        /**
        this.breadcrumbService.setItems([
            {label: 'Pages'},
            {label: 'Calendar'}
        ]);**/
    }

    ngOnInit() 
    {

        this.voyageService.getPlan().subscribe((response:any) => 
            {
              this.events = response;
              this.options = {...this.options, ...{events: this.events}};
              console.log(this.events);
            }
          );

          this.placeService.getBateaux().subscribe((response:any) => 
            {
            this.bateaux = response;
            console.log(this.bateaux);
            this.results = this.getBateauMarkersAndNames(this.bateaux);
            console.log(this.results);
            }
          );

        this.options = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            initialDate: new Date().toISOString().split('T')[0], // Date actuelle
            //new Date().toISOString().split('T')[0], // Date actuelle
            headerToolbar: {
                left: 'prev,next today',
                center: 'title'
                //right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            locale: frLocale, // Traduction en français
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            eventClick: (e) => {
                this.eventDialog = true;
                console.log(e);
                console.log(e.event._def.extendedProps.batId);
                console.log(e.event.id);
                this.placeCheck(e.event._def.extendedProps.batId, e.event.id);
                this.voyage = Number(e.event.id);
                this.bateau = Number(e.event._def.extendedProps.batId);
                this.clickedEvent = e.event;
                this.changedEvent.title = this.clickedEvent.title;
                this.changedEvent.start = this.clickedEvent.start;
                this.changedEvent.end = this.clickedEvent.end;
            }
        };

        this.changedEvent = {title: '', start: null, end: '', allDay: null};
    }

    getBateauMarkersAndNames(bateaux: Array<any>): Array<{ bat_nom: string, bat_markeur: string | null }> {
        return bateaux.map(bateau => {
          return {
            bat_nom: bateau.bat_nom,
            bat_markeur: bateau.bat_markeur
          };
        });
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
      
      getButtonClass(place: any): string 
      {
        //console.log(place);  
        if (place?.vplstate === 0) return 'p-button p-button-success';
        if (place?.vplstate === 1) return 'p-button p-button-warning';
        if (place?.vplstate === 2) return 'p-button p-button-help';
        if (place?.vplstate === 3) return 'p-button p-button-primary';
        if (place?.vplstate === 4) return 'p-button p-button-secondary';
    
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
    
        this.eventDialog = true;
    }

    save() {
        this.eventDialog = false;

        this.clickedEvent.setProp('title', this.changedEvent.title);
        this.clickedEvent.setStart(this.changedEvent.start);
        this.clickedEvent.setEnd(this.changedEvent.end);
        this.clickedEvent.setAllDay(this.changedEvent.allDay);

        this.changedEvent = {title: '', start: null, end: '', allDay: null};
    }

    reset() {
        this.changedEvent.title = this.clickedEvent.title;
        this.changedEvent.start = this.clickedEvent.start;
        this.changedEvent.end = this.clickedEvent.end;
    }

    getDetailsbillet(idVoy: number, idBat: number, idPlc: number) 
    {
        this.billetService.getPlaceByVoyAndBat(idVoy, idBat, idPlc).subscribe((response: VoyagePlace) => 
            {
                this.customEvents = [];
                this.vp = response;

                if (this.vp)
                    {
                        if(this.vp.code_billet === "" || this.vp.code_billet === null)
                            {
                                console.log("a ce niveau");
                                this.customEvents = [];
                            }
                            else
                            {
                                this.billets = [];
                                this.billet = new Billet;
                                this.billetService.getbilletState(this.vp.code_billet)
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
                                        if (event['icon'] === 'PrimeIcons.CHECK_SQUARE') {
                                            event['icon'] = PrimeIcons.CHECK_SQUARE; // Remplace la chaîne par la constante
                                        }
                                        if (event['icon'] === 'PrimeIcons.WALLET') {
                                            event['icon'] = PrimeIcons.WALLET; // Remplace la chaîne par la constante
                                        }
                                        if (event['icon'] === 'PrimeIcons.TRASH') {
                                            event['icon'] = PrimeIcons.TRASH; // Remplace la chaîne par la constante
                                        }
                                        if (event['icon'] === 'PrimeIcons.TAGS') {
                                            event['icon'] = PrimeIcons.TAGS; // Remplace la chaîne par la constante
                                        }
                                        // Vous pouvez ajouter d'autres conversions ici si nécessaire
                                    });
                            
                                    console.log(this.customEvents); 
                                    
                                    // Récupération du titre et des billets
                                    this.billetService.getTitreAndBillets(this.vp.code_billet).subscribe({
                                        next: (response: AchatOnLineWithBillets) => {
                                            this.messageService.add({ 
                                                severity: 'success', 
                                                summary: 'COSAMA/ARTIM', 
                                                detail: 'Billet récupéré avec succès', 
                                                life: 3000 
                                            });
                                                
                                            console.log("The billets :", this.billets);
                                            // Stocker les billets
                                            this.billets = response.billets;
                                            this.billet = this.billets[0];
                                            console.log("Billets:", this.billet);
                                        },
                                        error: (error) => {
                                            console.error('Erreur lors de la récupération du billet :', error);
                                            this.messageService.add({ 
                                                severity: 'error', 
                                                summary: 'COSAMA/ARTIM', 
                                                detail: 'Titre inexistant dans la base', 
                                                life: 3000 
                                            });
                                        }
                                    });
                                });
                            }
                    }      
            });
            this.productDialog = true;
            console.log("Ici");
    }
}
