import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { error } from 'console';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppMainComponent } from 'src/app/app.main.component';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { AchatOnLine, AchatOnLineWithBillets, Billet, EtatBillet } from 'src/app/model/AchatOnLine.model';
import { Bateau } from 'src/app/model/Bateau.model';
import { Place } from 'src/app/model/Place.model';
import { TypePiece } from 'src/app/model/TypePiece.model';
import { TypePlace } from 'src/app/model/TypePlace.model';
import { Ville } from 'src/app/model/Ville.model';
import { Voyage } from 'src/app/model/Voyage.model';
import { AuthService } from 'src/app/services/auth.service';
import { BateauService } from 'src/app/services/bateau.service';
import { BilletService } from 'src/app/services/billet.service';
import { OpsbilletsService } from 'src/app/services/opsbillets.service';
import { PlaceService } from 'src/app/services/place.service';
import { VoyageService } from 'src/app/services/voyage.service';
import { Infovoyage2Pipe } from 'src/app/infovoyage2.pipe';  // 🔹 Import du pipe
import { PlanVoyage } from 'src/app/model/PlanVoyage.model';
import { Section } from 'src/app/model/Place';
import { forkJoin, map } from 'rxjs';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { GroupeCritere } from 'src/app/model/GroupeCrt.model';
import { Country } from 'src/app/model/Country.model';
import { EnfantDTO, PassagerSimple, PassagerWithBilletDTO } from 'src/app/model/Passager.model';

@Component({
  selector: 'app-edit-billet',
  providers: [MessageService, ConfirmationService],
  templateUrl: './edit-billet.component.html',
  styleUrls: ['./edit-billet.component.scss']
})
export class EditBilletComponent implements OnInit {
  [x: string]: any;

    public nomPlace : string;

    public nomCompletEnfant : string;

    enfOptions: { name: string; value: number; }[];

    situation : string = "";

    passagerBillet : PassagerWithBilletDTO = {
      paxId: 0,
      numeropiece: '',
      civilite: '',
      lastName: '',
      firstName: '',
      phone: '',
      natId: 0,
      typePiece: 0,
      typePlace: 0,
      idPlace: 0,
      nomPlace: '',
      valCheck: 0,
      valCheck1: 0,
      valCheck2: 0,
      valCheck3: 0,
      valCheck4: 0,
      prixVoiture: 0,
      billetsDTOS: {
        bilCode: 0,
        ipVente: '',
        firstname: '',
        lastname: '',
        numeropiece: '',
        civilite: '',
        bilPht: 0,
        bilPtt: 0,
        bilTaxe: 0,
        bilRemise: 0,
        bilDateEmission: '',
        bilDateValidite: '',
        bilEtat: '',
        bilPenalite: 0,
        bilReporter: '',
        noShow: 0,
        dateNoShow: '',
        userModif: '',
        dateModif: '',
        userAnnule: '',
        dateAnnule: '',
        userEmbarq: '',
        dateEmbarq: '',
        userDebarque: '',
        dateDebarque: '',
        userRembours: '',
        dateRembours: '',
        mtnRembours: 0,
        motifRembours: '',
        typePieceId: 0,
        typePlaceId: 0,
        clientEnCompteId: 0,
        passagerId: 0,
        voyageId: 0,
        batId: 0,
        plcId: 0,
        natId: 0,
        critereIds: [],
        enfantDTOS:  {
          enfNomComplet: '',
          enfAge: 0,
          uniteTemps: '',
          bil_id: 0
        }
      }
    }
    
    passagerForBillet: PassagerSimple = {
      paxId: 0,
      numeropiece: '',
      civilite: '',
      lastName: '',
      firstName: '',
      phone: '',
      natId: 0,
      typePiece: 0
    };

    public forCarabane : number = 0;

    public tPlace : number = 0;

    selectedOption1: object;
    selectedDate1: Date;
    selectedOption2: object;
    selectedDate2: Date;
    civilityOption: object;
    public selectedDate3: Date;
    public age : number;
    selectedDate4: Date;
    categoriageOption: object;
    typePiecesOption: object;
    typePlacesOption: any;
    nationalityOption: object;
    numPiecePassager: String;
    selectedCountry: Country | undefined;

    events: PlanVoyage[] = [];

    passager: any = {};
    
    options: any;
    
    header: any;
    
    eventDialog: boolean;
    
    changedEvent: any;
    
    clickedEvent = null;
    
    bateaux: Bateau[] = []; 
        
    results : Object[] = [];
    
    public sections: Section[] = [];

    voyages : Voyage[] = [];

    public filteredTypePlaces: any[] = []; // Liste filtrée des types de places

    public motif : string;

    public penality : number;

    selectedVoyage: any; // Pour stocker la valeur sélectionnée du dropdown voyage

    selectedTypePlace: any; // Pour stocker la valeur sélectionnée du dropdown type de place

    selectedPlaces:any;
    
    public typePlaces: TypePlace[] = [];

    public typePieces: TypePiece[] = [];

    public places: Place[] = [];

    public villes: Ville[] = [];

    public etatBillet : EtatBillet = {
      ebId: 0,
      status: '',
      bilTime: '',
      billetId: 0,
      color: '',
      icon: ''
    }
  
  placeDialog; boolean = false;

  voyId : number = 0;

  batId : number = 0;

  depart : number = 0;

  arrive : number = 0;

  codeV : string = "";

  productDialog: boolean = false;

  productDialog2: boolean = false;

  productDialog3: boolean = false;

  productDialog4: boolean = false;

  passagerDialog4: boolean = false;
  
  deletepassagerDialog: boolean = false;

  passagerDialog: boolean = false;

  valideBillet: boolean = false;

  outBillet : boolean = false;

  outBillet2 : boolean = false;

  outBillet3 : boolean = false;

  public billet : Billet;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  codeAchat: string;

  billets: Billet[];

  achatOnLine: AchatOnLine;

  public qrCodeUrl: SafeUrl;

  public qrCodeUrl2: SafeUrl;

  public token: any;

  public sigle : string;

  public user : string;

  public user2 : string;
  
  sourcePlaces: Place[] = []; // Places disponibles pour le PickList

  currentDate: Date = new Date(); // Stocke la date actuelle

  public countries: Country[] = [];
  public tarifs: any[] = [];

  billetsDTOS: Billet = {
    //bilCode: 0,
    ipVente: '',
    firstname: '',
    lastname: '',
    numeropiece: '',
    civilite: '',
    bilPht: 0,
    bilPtt: 0,
    bilTaxe: 0,
    bilRemise: 0,
    bilDateEmission: '',
    bilDateValidite: '',
    bilEtat: false,
    bilPenalite: 0,
    bilReporter: '',
    noShow: 0,
    dateNoShow: '',
    userModif: '',
    dateModif: '',
    userAnnule: '',
    dateAnnule: '',
    userEmbarq: '',
    dateEmbarq: '',
    userDebarque: '',
    dateDebarque: '',
    userRembours: '',
    dateRembours: '',
    mtnRembours: 0,
    motifRembours: '',
    typePieceId: 0,
    typePlaceId: 0,
    batId: 0,
    plcId: 0,
    natId: 0,
    criteres: [],
    enfants: {
      enfNomComplet: '',
      enfAge: 0,
      uniteTemps: '',
      bil_id: 0
    },
    bilId: 0,
    bilCode: '',
    code_achat: '',
    etatBillets: [],
    nationalite: 0,
    edit: false,
    remb: false,
    cancel: false,
    rep_sur: false,
    voyageDTO: undefined,
    bilCheck: false
  };

  groupesCriteres: GroupeCritere[] = [];

  ageInfo: { age: number, temps: string } | null = null;

  cities = [
    {label: 'Dakar', value: 1},
    {label: 'Ziguinchor', value: 2},
  ];

  civilities = [
    { label: 'M.', value: 'M.' },
    { label: 'Mme', value: 'Mme' },
    { label: 'Mlle', value: 'Mlle' }
  ];

  codeofBillet : any;
  voyage: any;

  constructor(private config: PrimeNGConfig, private infovoyage2Pipe: Infovoyage2Pipe, private opsbilletService : OpsbilletsService, public appMain: AppMainComponent, private readonly authService: AuthService, private sanitizer: DomSanitizer, private bateauService : BateauService, private voyageService : VoyageService, private placeService : PlaceService, private billetService : BilletService, private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() 
  {
    this.config.setTranslation({
      firstDayOfWeek: 1,
      dayNames: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
      dayNamesShort: ["dim","lun","mar","mer","jeu","ven","sam"],
      dayNamesMin: ["D","L","M","M","J","V","S"],
      monthNames: [
        "janvier","février","mars","avril","mai","juin",
        "juillet","août","septembre","octobre","novembre","décembre"
      ],
      monthNamesShort: [
        "janv","févr","mars","avr","mai","juin",
        "juil","août","sept","oct","nov","déc"
      ],
      today: "Aujourd'hui",
      clear: "Effacer"
    });

    this.passager.billetsDTOS = this.passager.billetsDTOS || {};
    this.passager.billetsDTOS.enfantDTOS = this.passager.billetsDTOS.enfantDTOS || {
      enfNomComplet: ''
      // ajoute les autres champs de EnfantDTO ici si besoin
    };

    this.enfOptions = [
      { name: 'OUI', value: 1 },
      { name: 'NON', value: 0 }
    ];

    this.passager = {
      billetsDTOS: { ...this.billetsDTOS } // Assure une copie propre de l'objet
    };
    

    this.voyageService.getPlan2().subscribe((response:any) => 
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
                    //this.eventDialog = true;
                    this.passagerDialog = true;
                    console.log(e);
                    console.log(e.event._def.extendedProps.batId);
                    console.log(e.event.id);
                    this.voyId = e.event.id;
                    this.batId = e.event._def.extendedProps.batId;
                    this.codeV = e.event._def.extendedProps.codeV;
                    this.depart = e.event._def.extendedProps.depart;
                    this.arrive = e.event._def.extendedProps.arrive;
                    // this.placeCheck(e.event._def.extendedProps.batId, e.event.id);
                    // this.clickedEvent = e.event;
                    // this.changedEvent.title = this.clickedEvent.title;
                    // this.changedEvent.start = this.clickedEvent.start;
                    // this.changedEvent.end = this.clickedEvent.end;
                }
            };
    
            this.changedEvent = {title: '', start: null, end: '', allDay: null};

    this.authService.token$.subscribe(response => {
      if (response) {
          this.token = response; // Mettez à jour la variable locale avec le token
      }
    });

    this.user = this.appMain.user.login;
    this.sigle = this.appMain.user.agence.codeAgc;
    
    console.log("A ce niveau" + this.sigle + "/" + this.user);

    this.user2 = this.sigle + "/" + this.user;

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
        console.log(this.bateaux)
      });

      this.filteredTypePlaces = this.typePlaces; // Initialisez par défaut

      this.opsbilletService.getVoyagesAujourdhuiUlterieur().subscribe((response:any) => 
        {
          this.voyages = response;
          console.log(this.voyages);
        }
      );

      this.voyages = this.voyages.map(voyage => ({
        ...voyage,
        voyageLabel : this.infovoyage2Pipe.transform(voyage.voy_id, this.voyages) // Appliquer le pipe ici
      }));
      
      this.productService.getProducts().then(data => this.products = data);

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

      this.ok();
      
  }

  onDateChange(date: Date): void {
    this.ageInfo = this.calculateAge2(date);
  }

  get typePieces_(): any[] {
    return this.passager?.natId === 205
    ? this.typePieces
    : this.typePieces.filter(item => item.tpiece_id === 1)  // Exclut 'CNI' si natId = 205;
  }

  ok()
  {
    this.voyageService.getCountries().subscribe((response:any) => 
      {
      this.countries = response;
      console.log(this.countries);
      }
    );

    this.voyageService.getGroupeCriteres().subscribe((response: any) => {
      this.groupesCriteres = response.filter((groupe: any) => groupe.grpcrt_nom !== 'Surclassement');
      console.log(this.groupesCriteres);
    });    

    this.voyageService.getTypePlace().subscribe((response:any) => {
      this.typePlaces = response;
      console.log(this.typePlaces);
    });
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
        
        getButtonClass(place: any): string {
          console.log(place);
          
          // if (place?.vplstate === 0) return 'p-button p-button-success';
          // if (place?.vplstate === 1) return 'p-button p-button-warning';
          // if (place?.vplstate === 2) return 'p-button p-button-help';
          // if (place?.vplstate === 3) return 'p-button p-button-primary';
          // if (place?.vplstate === 4) return 'p-button p-button-secondary';
      
          return 'p-button p-button-warning'; // Valeur par défaut
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
  

      // Méthode pour lister les places disponibles
      searchTitre() 
      { 
        console.log(this.codeAchat);

        if (!this.codeAchat) 
        {
          this.billets = [];
        } 
        else 
        {
          // Récupération du titre et des billets
          this.billetService.getTitreAndBillets(this.codeAchat).subscribe({
              next: (response: AchatOnLineWithBillets) => {
                  this.messageService.add({ 
                      severity: 'success', 
                      summary: 'COSAMA/ARTIM', 
                      detail: 'Titre récupéré avec succès', 
                      life: 3000 
                  });
      
                  // Stocker l'achat en ligne
                  this.achatOnLine = response.achatOnLine;
                  console.log("Achat On Line:", this.achatOnLine);
      
                  // Stocker les billets
                  this.billets = response.billets;
                  console.log("Billets:", this.billets);
              },
              error: (error) => {
                  console.error('Erreur lors de la récupération du titre:', error);
                  this.messageService.add({ 
                      severity: 'error', 
                      summary: 'COSAMA/ARTIM', 
                      detail: 'Titre inexistant dans la base', 
                      life: 3000 
                  });
              }
          });
      
          // // Récupération des détails du billet
          // this.opsbilletService.getDetailsBillet(this.codeAchat).subscribe({
          //     next: (response: any) => {
          //         if (response) {
          //             this.billet = response;
          //             this.billets = [this.billet]; // Assigner directement sous forme de tableau
          //             console.log("Billets:", this.billets);
          //         }
          //     },
          //     error: (error) => {
          //         console.error('Erreur lors de la récupération des détails du billet:', error);
          //     }
          // });
        } 
      
        this.productDialog = false;
        this.codeAchat = "";

      }

        validateBillet() {
    
            this.valideBillet = false;
    
        }


        printBillet(billet: Billet) {
            this.billet = { ...billet };
            this.billetService.generateQRCode(billet.bilCode).subscribe({
                next: (data: string) => {
                  this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(data);
                },
                error: (error) => {
                  console.error('Error generating QR code', error);
                }
              });
    
            this.outBillet = true;
    
        }

        
        printBillet2(billet: Billet) 
        {
          this.billet = { ...billet };
          this.billetService.generateQRCode(billet.bilCode).subscribe({
              next: (data: string) => {
                this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(data);
              },
              error: (error) => {
                console.error('Error generating QR code', error);
              }
            });
  
          this.outBillet3 = true;
        }

        
        printTicketRemb(billet: Billet) {
          this.billet = { ...billet };
          this.outBillet2 = true;
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
                          <title>Print Ticket</title>
                          <style>
                              @media print {
                                /* Format pour un rouleau de 79,50 mm de largeur */
                                * {
                                    font-family: 'Times New Roman', Times, serif !important;
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
          this.outBillet = false;
          this.passagerDialog = false;
      }

      getLabel(depart: number): string {
        const map: any = {
          1: 'DAKAR',
          2: 'ZIGUINCHOR'
        };
        return map[depart] || '';
      }

      
      saveEtatBillet() 
      {
        this.etatBillet.color = "navy";
        this.etatBillet.icon = "PrimeIcons.PRINT";
        this.etatBillet.status = "Produit";
        this.etatBillet.billetId = this.billet.bilId;

        console.log(this.etatBillet);

        //console.log(this.selectedFile);
        this.submitted = true;
        this.billetService.submitEtatBillet(this.etatBillet).subscribe({
            next: () => {
                //window.location.reload();
                //this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Bateau créé avec succés', life: 3000 });
            },
            error: error => {
                //console.error('ERROR', error);
                //this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
            }
        });
        this.outBillet = false;
        //this.bateauCreate = {};

      }   
      

          getTypePlaceLabel(typePlaceId: number): string {
            const typePlace = this.typePlaces.find(tp => tp.tplc_id === typePlaceId);
            return typePlace ? typePlace.tplc_nom : 'Aucun';
          }
        
          getPlaceLabel(placeId: number): string {
            const place = this.places.find(p => p.plc_id === placeId);
            return place ? place.plc_code : 'Aucun';
          }

          getVille(vilId: number): string {
            const ville = this.villes.find(v => v.vil_id === vilId);
            console.log(ville);
            return ville ? ville.vil_nom : 'Aucun';
          }

          getVille2(vilId2: number): string {
            const ville2 = this.villes.find(v => v.vil_id === vilId2);
            console.log(ville2);
            return ville2 ? ville2.vil_nom : 'Aucun';
          }

          getTypePiece(typePieceId: number): string {
            const typePiece = this.typePieces.find(tp => tp.tpiece_id === typePieceId);
            console.log(typePiece);
            return typePiece ? typePiece.tpiece_nom : 'Aucun';
          }

          getBateau(batId: number): string
          {
            const bateau = this.bateaux.find(b => b.bat_id === batId);
            console.log(bateau);
            return bateau ? bateau.bat_nom : 'Aucun';
          }

          updateSelectedTypePiece(event : any)
          {
            this.passager.billetsDTOS.typePieceId = event.value;
            console.log(this.passager.billetsDTOS.typePieceId)
          }
        
          calculateAge(birthdate: Date): number {
            const diff = Date.now() - new Date(birthdate).getTime();
            const ageDate = new Date(diff);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
          }

          calculateAge2(birthdate: Date): { age: number, temps: string } {
            const today = new Date();
            const birth = new Date(birthdate);
          
            let years = today.getFullYear() - birth.getFullYear();
            let months = today.getMonth() - birth.getMonth();
            const days = today.getDate() - birth.getDate();
          
            // Ajustement mois/jours
            if (days < 0) months--;
            if (months < 0) {
              years--;
              months += 12;
            }
          
            const totalMonths = years * 12 + months;
          
            if (totalMonths < 12) {
              return { age: totalMonths, temps: 'Mois' };
            } else {
              return { age: years, temps: 'Ans' };
            }
          }
          
        
          // Filtrer les options du dropdown en fonction des conditions
          filterOptions(groupe: any): any[] {
            // Filtrage pour "Résident ou Etranger"
            if (groupe.grpcrt_nom === "Résident ou Etranger") 
              {
              if (this.passager.natId === 205) 
                {
                return groupe.criteres.filter(criter => criter.crt_nom === "Résident");
                }
              return groupe.criteres.filter(criter => criter.crt_nom === "Etranger" || criter.crt_nom === "Etranger-Résident");
              }
          
            // Filtrage pour "Catégorie d'âges"
            if (groupe.grpcrt_nom === "Catégorie d'âges") 
              {
              this.age = this.calculateAge(this.selectedDate3);
                if (this.age >= 12)
                {
                  return groupe.criteres.filter(criter => criter.crt_nom === "Adulte");
                }
              return groupe.criteres.filter(criter => criter.crt_nom === "Enfant");
              }
          
            // Retour par défaut pour les autres groupes
            return groupe.criteres;
          }

          updateSelectedCriteres() 
        {
          this.passager.billetsDTOS.criteres = this.groupesCriteres
          .map((groupe, index) => this.passager?.billetsDTOS?.criteres?.[index] || null) // Utilisation de `?.` pour éviter undefined
          .filter(critere => critere !== null || critere !== undefined);

          if (this.passager.paxId) 
          {
            const index = this.findIndexById(this.passager.paxId);
            if (index !== -1)
              {
                this.passager.billetsDTOS.criteres;
              }
          }
          console.log(this.passager.billetsDTOS.criteres);

          if (this.passager && this.passager.billetsDTOS && Array.isArray(this.passager.billetsDTOS.criteres)) 
          {
            console.log("Tableau complet : ", this.passager.billetsDTOS.criteres);
            // Filtrer les valeurs null et vérifier si un élément a crtId = 19
            const found = this.passager.billetsDTOS.criteres
              .filter(item => item !== null) // Supprime les `null`
              .some(item => item.crtId === 19); // Vérifie si `crtId` est 19 dans un des objets
          
            if (found) 
              {
                this.forCarabane = 19; console.log("crtID 19 trouvé !");
              } 
            else 
              {
                this.forCarabane = 0; 
                console.log("crtID 19 NON trouvé !");
              }
          } 
            else 
          {
            console.log("critereIds est indéfini ou n'est pas un tableau.");
          }
        }

  openNew0() 
  {
    this.product = {};
    this.submitted = false;
    this.productDialog4 = true;
  } 

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  openNew2(billet: Billet) {
    this.billet = { ...billet };
    console.log("remboursement")
    this.productDialog2 = true;
  }
  
  openNew3(billet: Billet) {
    this.billet = { ...billet };
    console.log("report/surclassement")
    this.productDialog3 = true;
  }


  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editBillet(billet: Billet) {
      this.billet = { ...billet };
      this.valideBillet = true;
  }

  deleteProduct(product: Product) {
      this.deleteProductDialog = true;
      this.product = { ...product };
  }

  confirmDeleteSelected() {
      this.deleteProductsDialog = false;
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      this.selectedProducts = [];
  }

  confirmDelete() {
      this.deleteProductDialog = false;
      this.products = this.products.filter(val => val.id !== this.product.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      this.product = {};
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

  onDropdownChange_() 
  {
      console.log('TypePlaces disponibles:', this.typePlaces);

      let allowedIds: number[] = [];

      if (this.billet.voyageDTO.voy_id === this.selectedVoyage) 
      {
        this.situation = 'Vous effectuerez un surclassement';
          // Cas où le voyage correspond => filtrage normal
          switch (this.billet.typePlaceId) {
            case 1:
              allowedIds = [2, 3, 4];
              break;
            case 2:
              allowedIds = [];
              break;
            case 3:
              allowedIds = [2];
              break;
            case 4:
              allowedIds = [2, 3];
              break;
            default:
              allowedIds = [];
          }
          this.filteredTypePlaces = this.typePlaces.filter(typePlace => allowedIds.includes(typePlace.tplc_id));
          console.log('TypePlaces filtrées après correspondance voyage:', this.filteredTypePlaces);
      } 
      else 
      {
          this.situation = 'Vous effectuerez un report';
          // Cas où le voyage ne correspond pas => règles spécifiques
          switch (this.billet.typePlaceId) {
            case 1:
              this.filteredTypePlaces = this.typePlaces; // accès à tout
              break;
            case 2:
              this.filteredTypePlaces = []; // aucun accès
              break;
            case 3:
              this.filteredTypePlaces = this.typePlaces.filter(typePlace => typePlace.tplc_id === 2); // seulement 2
              break;
            case 4:
              this.filteredTypePlaces = this.typePlaces.filter(typePlace => [2, 3, 4].includes(typePlace.tplc_id)); // 2, 3, 4
              break;
            default:
              this.filteredTypePlaces = [];
          }
          console.log('TypePlaces filtrées après NON correspondance voyage:', this.filteredTypePlaces);
      }
      console.log(this.situation);

      return this.filteredTypePlaces;
  }

      get isSurclassement(): boolean {
      return this.situation === 'Vous effectuerez un surclassement';
      }

      get isReport(): boolean {
        return this.situation === 'Vous effectuerez un report';
      }
      onDropdownChange() 
      {
        console.log(this.filteredTypePlaces);
        if (this.selectedVoyage && this.selectedTypePlace) 
        {
          this.listerPlacesDispo(); // Appelle la méthode pour rafraîchir les données de places
        }
      }

        listerPlacesDispo() {
          const bat_id = this.getBatIdByVoyId(this.selectedVoyage)
          console.log(this.selectedVoyage, " + ", this.selectedTypePlace, " + ", bat_id)
          console.log(this.selectedTypePlace, this.selectedVoyage, bat_id)
          this.sourcePlaces = []
          
          this.opsbilletService.getAvailablePlaces(this.selectedTypePlace, this.selectedVoyage, bat_id)
            .subscribe((places: Place[]) => {
              this.sourcePlaces = places || []; // Met à jour la source des places disponibles pour le PickList
              console.log(this.sourcePlaces);
            });
            
      }

      
      obtTypePlace()
      {
        this.tPlace = this.passager.typePlace;
        console.log(this.tPlace);
      }
  
      saveReportSU(billet:Billet)
      {
        console.log(this.selectedPlaces.plc_id);
        const newObject = {
          plcId: this.selectedPlaces.plc_id || 0, // Assure-toi d'accéder au bon attribut
          typePlaceId: this.selectedTypePlace || 0 // Valeur par défaut si selectedTypePlace est indéfini
        };
  
        console.log(newObject);
  
        this.opsbilletService.reportBillet(billet.bilId, false, this.selectedVoyage, newObject, 0).subscribe({
          next: (response:any) => {
              //console.log(bateau);
              this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Report, surclassement avec succés', life: 3000 });
              this.productDialog3 = false;
              this.printBillet2(response);
          },
          error: error => {
              console.error('ERROR', error);
              this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur du report, surclassement', life: 3000 });
          }
        });
      }
      
      getBatIdByVoyId(voyId) {
        const voyage = this.voyages.find(v => v.voy_id === voyId);
        return voyage ? voyage.bat_id : null; // retourne bat_id ou null si non trouvé
      }
  
      rembourser()
      {
        console.log(this.motif, " ", this.penality);
        this.opsbilletService.rembourserBillet(this.billet.bilId, this.motif, this.penality, this.user2).subscribe({
          next: (response : any) => {
              console.log(response);
              this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Billet remboursé avec succés', life: 3000 });
              this.printTicketRemb(response);
              console.log(this.billet.bilId);
              this.opsbilletService.cancelBillet(this.billet.bilId).subscribe({
                next: () => {
                  this.billetX = response;
                  this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Place recupérée.', life: 3000 });
                  this.opsbilletService.libererPlace(this.billetX)
                  .subscribe({
                    next: () => {
                      console.log("libérer avec succés");
                      //this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Billet annulé avec succés', life: 3000 });
                      },
                      error: error => {
                        console.error('ERROR', error);
                        this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
                        }
                      });
                      this.productDialog2 = false;
                    },
                    error: error => {
                      console.error('ERROR', error);
                      this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
                      }
                    });
                  },
                error: error => {
                    console.error('ERROR', error);
                    this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur de remboursement', life: 3000 });
                }
              });
  
      }
  
      placeCheck() {
        this.sections = [];
        console.log("Id du voyage : ", this.voyId);
        this.voyageService.getNiveauPlace2(this.batId)
          .subscribe(
            (response: any) => {
              if (response != null) {
                const placeIds: number[] = [];
                response.forEach((niveau: any) => {
                  niveau.places.forEach((place: any) => {
                    if (place.typePlace === this.tPlace) {  // Filtre selon le type de place
                      placeIds.push(place.plcId);
                    }
                  });
                });
      
                this.voyageService.isPlacesInVoyage2(placeIds, this.voyId, this.tPlace).subscribe(isInVoyagePlaces => {
                  let index = 0;
                  console.log("A:", isInVoyagePlaces);
      
                  response.forEach((niveau: any) => {
                    let filteredPlaces = niveau.places.filter((place: any) => place.typePlace === this.tPlace);
                    console.log("B:", isInVoyagePlaces);
                    
                    filteredPlaces.forEach((place: any) => {
                      if (index < isInVoyagePlaces.length) {
                        place.alreadyInVoyage = isInVoyagePlaces[index];
                      }
                      index++;
                    });
      
                    console.log(this.forCarabane);
      
                    // Appliquer le filtrage si l'ID est 19
                    if (this.forCarabane === 19) 
                      {
                      filteredPlaces = filteredPlaces.filter(place => place.isCarabane === true);
                      }
      
                    niveau.places = filteredPlaces;
                  });
      
                  this.sections = response.filter(niveau => niveau.places.length > 0);
                  console.log(this.sections.length);
                  console.log(this.sections);
                });
                
              }
            },
            (error: any) => {
              console.error('NOT FOUND : ', error);
              this.sections = [];
            }
          );
        this.placeDialog = true;
      }

      set selectedCountryCode(value: number) 
      {
        this.passager.natId = value;
      }
    
      isEnfantPresent(enfantDTOS: any): boolean {
        return enfantDTOS && enfantDTOS.enfNomComplet && enfantDTOS.enfNomComplet.trim() !== '';
      }

      savePassager() 
      {
        console.log(this.passager.billetsDTOS.criteres.filter(critere => critere !== null && critere !== undefined).length);


        if (!this.passager.natId)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez remplir la nationnalité', life: 3000 });
            return;
          }

        if (!this.passager.typePiece)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez remplir le type de pièce', life: 3000 });
            return;
          }

        if (!this.numPiecePassager)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez remplir le numéro de pièce', life: 3000 });
            return;
          }  

        if (!this.passager.civilite)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez remplir la civilité', life: 3000 });
            return;
          }

        if (!this.passager.firstName)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez remplir le prénom (s)', life: 3000 });
            return;
          }

        if (!this.passager.lastName)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez remplir le nom', life: 3000 });
            return;
          } 

        if (!this.selectedDate3)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez remplir la date de naissance', life: 3000 });
            return;
          }

        if (!this.passager.phone)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez remplir le téléphone', life: 3000 });
            return;
          }  

        

        if (!this.passager.billetsDTOS.criteres || (this.passager.billetsDTOS.criteres.filter(critere => critere !== null && critere !== undefined).length) < 2)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez bien remplir les critères', life: 3000 });
            return;
          } 


        if (!this.passager.typePlace)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez remplir le type de place', life: 3000 });
            return;
          }  

        if (!this.passager.nomPlace)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez choisir la place', life: 3000 });
            return;
          }  

        if (this.passager.valCheck === 1 && !this.selectedDate4)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez remplir la date de naissance du bébé', life: 3000 });
            return;
          } 
          
        if (this.passager.valCheck === 1 && !this.nomCompletEnfant)
          {
            this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Veuillez remplir le nom complet du bébé', life: 3000 });
            return;
          }
          

        console.log(this.passager);
        this.passagerBillet.natId = this.passager.natId;
        this.passagerBillet.civilite = this.passager.civilite;
        this.passagerBillet.firstName = this.passager.firstName;
        this.passagerBillet.lastName = this.passager.lastName;
        this.passagerBillet.phone = this.passager.phone;
        this.passagerBillet.numeropiece = this.passager.numeropiece;

        this.passagerBillet.billetsDTOS.critereIds = this.passager.billetsDTOS.criteres;
        this.passagerBillet.billetsDTOS.firstname = this.passager.firstName;
        this.passagerBillet.billetsDTOS.lastname = this.passager.lastName;
        this.passagerBillet.billetsDTOS.natId = this.passager.natId;
        this.passagerBillet.billetsDTOS.typePieceId = this.passager.typePiece;
        this.passagerBillet.billetsDTOS.typePlaceId = this.passager.typePlace;
        this.passagerBillet.billetsDTOS.civilite = this.passager.civilite;
        this.passagerBillet.billetsDTOS.typePieceId = this.passager.typePiece;
        this.passagerBillet.billetsDTOS.typePlaceId = this.passager.typePlace;
        this.passagerBillet.billetsDTOS.plcId = this.passager.idPlace;
        this.passagerBillet.billetsDTOS.voyageId = this.voyId;

        if (this.ageInfo != null)
        {
          this.passagerBillet.billetsDTOS.enfantDTOS.enfNomComplet = this.nomCompletEnfant;
          this.passagerBillet.billetsDTOS.enfantDTOS.enfAge = Number(this.ageInfo.age);
          this.passagerBillet.billetsDTOS.enfantDTOS.uniteTemps = this.ageInfo.temps;
        }

        console.log(this.passagerBillet.billetsDTOS.enfantDTOS);
      
        console.log(this.passagerBillet.billetsDTOS.critereIds);

        this.passagerBillet.billetsDTOS.critereIds = this.passagerBillet.billetsDTOS.critereIds.filter(critere => critere !== null && critere !== undefined && Object.keys(critere).length > 0);
        console.log("CritereIds après néttoyage :", this.passagerBillet.billetsDTOS.critereIds);

        this.voyageService.getTarif(this.passagerBillet.billetsDTOS.typePlaceId, this.passagerBillet.billetsDTOS.critereIds).subscribe(
          (data: any) => {
            this.tarifs = data;
            this.passagerBillet.billetsDTOS.bilPht = this.tarifs[0];
            this.passagerBillet.billetsDTOS.bilRemise = this.tarifs[1];
            this.passagerBillet.billetsDTOS.bilTaxe = this.tarifs[2];
            this.passagerBillet.billetsDTOS.bilPtt = this.tarifs[4];
          },
          (error) => {
            console.error('Erreur lors de la récupération des tarifs:', error);
          }
        );

        console.log(this.tarifs);
        console.log(this.passagerBillet);

        this.submitReservation();

      }

      onCheckChange(event: any)
      {
        this.passager.valCheck = event.value.value; // Met à jour la valeur sélectionnée
        console.log(this.passager.valCheck);
      }
    
      searchPassager() 
      { 
        if(!this.numPiecePassager)
        {
            this.passager.civilite = "";
            this.passager.firstName = "";
            this.passager.lastName = "";
            this.passager.phone = "";
            this.passager.mail = "";      
            this.passager.numeropiece = this.numPiecePassager;
            //this.passager.typePiece = this.passager.typePiece
            //this.passager.natId = 0;
        }
        else
        {
            this.voyageService.getPassager(this.numPiecePassager).subscribe((response: any) => {
                if (response.numeropiece != null)
                    {
                        // Récupère billets dans une liste
                        this.passagerForBillet = response;
                        console.log("Passager : ", this.passagerForBillet);
                        //this.passager.civilite = this.billet.civilite;
                        this.passager.civilite = this.passagerForBillet.civilite;
                        this.passager.firstName = this.passagerForBillet.firstName;
                        this.passager.lastName = this.passagerForBillet.lastName;
                        this.passager.phone = this.passagerForBillet.phone;
                        this.passager.numeropiece = this.passagerForBillet.numeropiece;
                        //this.passager.typePiece = this.passagerForBillet.typePiece;
                        //this.passager.natId = this.passagerForBillet.natId;
                        console.log("Passager", this.passager);
                    }
                else
                    {
                        console.log(this.passager.numeropiece);
                        this.passager.civilite = "";
                        this.passager.firstName = "";
                        this.passager.lastName = "";
                        this.passager.phone = "";
                        this.passager.numeropiece = this.numPiecePassager;
                        //this.passager.typePiece = this.passager.typePiece
                        //this.passager.natId = 0;
                    }
                });
            
        }
    
        //this.productDialog = false;
        //this.codeBillet = "";
    
      }
  
      submitReservation() 
      {
        this.voyageService.submitAchatBillet(this.passagerBillet, this.voyId).subscribe({
          next: response => {
            console.log('SUCCESSFUL', response);
            this.codeofBillet = response.bilCode;
            this.printBillet(response);
            console.log(this.codeofBillet);
            // this.billetService.generateQRCode(this.codeofBillet).subscribe({
            //   next: (data: string) => {
            //     this.qrCodeUrl2 = this.sanitizer.bypassSecurityTrustUrl(data);
            //   },
            //   error: (error) => {
            //     console.error('Error generating QR code', error);
            //   }
            // });
          },
          error: error => {
            console.error('ERROR', error);
          }
        });
      
      }

  onPlaceClick(place: Place) 
  {
    //this.idPlace = 0;
    this.nomPlace = "";
    this.selectedPlaces = place;
    this.placeDialog = false;
    console.log('Selected Places Aller:', this.selectedPlaces.plcId);
    this.passager.idPlace = this.selectedPlaces.plcId;
    this.passager.nomPlace = this.selectedPlaces.plcCode

  }

  hasCritere(id: number, billet: any): boolean {
    return billet?.critereIds?.some(c => c.crtId === id) ?? false;
  }
}
