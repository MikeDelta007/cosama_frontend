import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/domain/product';
import { AchatOnLine, EtatBillet } from 'src/app/model/AchatOnLine.model';
import { Billet } from 'src/app/model/Billet.model';

import { Bateau } from 'src/app/model/Bateau.model';
import { Place } from 'src/app/model/Place.model';
import { TypePiece } from 'src/app/model/TypePiece.model';
import { TypePlace } from 'src/app/model/TypePlace.model';
import { Ville } from 'src/app/model/Ville.model';
import { Voyage } from 'src/app/model/Voyage.model';
import { OpsbilletsService } from 'src/app/services/opsbillets.service';

@Component({
  selector: 'app-ops-billet',
  providers: [MessageService, ConfirmationService],
  templateUrl: './ops-billet.component.html',
  styleUrls: ['./ops-billet.component.scss']
})
export class OpsBilletComponent implements OnInit {
    
  public typePlaces: TypePlace[] = [];

  public motif : string;

  public penality : number;

  public filteredTypePlaces: any[] = []; // Liste filtrée des types de places

  public typePieces: TypePiece[] = [];

  public places: Place[] = [];

  public villes: Ville[] = [];

  deletepassagerDialog: boolean = false;

  public etatBillet : EtatBillet = {
    ebId: 0,
    status: '',
    bilTime: '',
    billetId: 0,
    color: '',
    icon: ''
  }

  
  voyages : Voyage[] = [];

  sourcePlaces: Place[] = []; // Places disponibles pour le PickList

productDialog: boolean = false;

enableEdit : boolean = false;

enableRemb : boolean = false;

enableRepS : boolean = false;

valideBillet: boolean = false;

outBillet : boolean = false;

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

codeBillet: string;

billets: Billet[];

achatOnLine: AchatOnLine;

public qrCodeUrl: SafeUrl;

public bateaux : Bateau[] = [];

selectedVoyage: any; // Pour stocker la valeur sélectionnée du dropdown voyage

selectedTypePlace: any; // Pour stocker la valeur sélectionnée du dropdown type de place

selectedPlaces:any;


constructor(private sanitizer: DomSanitizer, private opsbilletService : OpsbilletsService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

currentDate: Date = new Date(); // Stocke la date actuelle

ngOnInit() {

  this.filteredTypePlaces = this.typePlaces; // Initialisez par défaut

  this.opsbilletService.getPiece().subscribe((response:any) => {
      this.typePieces = response;
      console.log(this.typePieces);
    });

  this.opsbilletService.getTypePlace().subscribe((response:any) => {
      this.typePlaces = response;
      console.log(this.typePlaces);
    });

    this.opsbilletService.getPlaces().subscribe((response:any) => {
      this.places = response;
      console.log(this.places);
    });

    this.opsbilletService.getVilles().subscribe((response:any) => {
      this.villes = response;
      console.log(this.villes);
    });

    this.opsbilletService.getBateaux().subscribe((response:any) => {
      this.bateaux = response;
      console.log(this.bateaux)
    });

    this.opsbilletService.getVoyages().subscribe((response:any) => 
      {
        this.voyages = response;
        console.log(this.voyages);
      }
    );

    //this.productService.getProducts().then(data => this.products = data);

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
}

    // Méthode pour lister les places disponibles
    searchTitre() { 
      console.log(this.codeBillet);

      if(!this.codeBillet)
      {
          this.billets = [];
      }
      else
      {
          this.opsbilletService.getDetailsBillet(this.codeBillet)
          .subscribe((response: any) => {
              // Récupère billets dans une liste
              this.billets = []
              this.billet = response;
              this.billets.push(this.billet)
              console.log("Billets: ", this.billets);
              });
      }

      this.productDialog = false;
      this.codeBillet = "";

      }

      validateBillet() {
  
          this.valideBillet = false;
  
      }

      filterTypePlaces() {
        // Réinitialisez filteredTypePlaces par défaut
        this.filteredTypePlaces = this.typePlaces.filter(typePlace => typePlace.tplc_id !== this.billet.typePlaceId);
        
        // Affichez les types de places selon la condition
        if (this.billet.voyageDTO.voy_id === this.selectedVoyage) {
          console.log(this.filteredTypePlaces);
        } else {
          this.filteredTypePlaces = this.typePlaces; // Afficher tous les types de places
        }
        return this.filteredTypePlaces;
      }

      onDropdownChange() 
      {
        this.filteredTypePlaces;
        console.log(this.filterTypePlaces());
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

    saveReportSU(billet:Billet)
    {
      console.log(this.selectedPlaces.plc_id);
      const newObject = {
        plcId: this.selectedPlaces.plc_id || 0, // Assure-toi d'accéder au bon attribut
        typePlaceId: this.selectedTypePlace || 0 // Valeur par défaut si selectedTypePlace est indéfini
      };

      console.log(newObject);

      this.opsbilletService.reportBillet(billet.bilId, false, this.selectedVoyage, newObject, 0).subscribe({
        next: () => {
            //console.log(bateau);
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Report, surclassement avec succés', life: 3000 });
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

    // rembourser()
    // {
    //   console.log(this.motif, " ", this.penality);
    //   this.opsbilletService.rembourserBillet(this.billet.bilId, this.motif, this.penality).subscribe({
    //     next: () => {
    //         //console.log(bateau);
    //         this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Billet Remboursé avec succés', life: 3000 });
    //     },
    //     error: error => {
    //         console.error('ERROR', error);
    //         this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur de remboursement', life: 3000 });
    //     }
    //   });

    // } 

    cancelBillet(billet: Billet) {
      this.deletepassagerDialog = true;
      this.billet = { ...billet };
    }

    annulerBillet(billet: Billet)
      {
        this.billet = { ...billet };
        console.log(billet.bilId);
        this.opsbilletService.cancelBillet(billet.bilId).subscribe({
          next: () => {
            window.location.reload();
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Billet annulé avec succés, place recupérée.', life: 3000 });
            this.opsbilletService.libererPlace(billet)
            .subscribe({
              next: () => {
                console.log("libérer avec succés");
              },
                error: error => {
                }
              });
              this.deletepassagerDialog = false;
            },
            error: error => {
              //console.error('ERROR', error);
              this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
              }
            });
      }


      printBillet(billet: Billet) {
          this.billet = { ...billet };
          this.opsbilletService.generateQRCode(billet.bilCode).subscribe({
              next: (data: string) => {
                this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(data);
              },
              error: (error) => {
                console.error('Error generating QR code', error);
              }
            });
  
          this.outBillet = true;
  
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

        
    }

    
    

        getTypePlaceLabel(typePlaceId: number): string {
          const typePlace = this.typePlaces.find(tp => tp.tplc_id === typePlaceId);
          return typePlace ? typePlace.tplc_nom : 'Aucun';
        }
      
        getPlaceLabel(placeId: number): string {
          const place = this.places.find(p => p.plc_id === placeId);
          return place ? place.plc_code : 'Aucun';
        }

        getIdPlaceViaCode(placeCode: string): number {
          const place = this.places.find(p => p.plc_code === placeCode);
          return place ? place.plc_id : 0;
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


        openNew_() {
          this.productDialog = true;
        }

        
openNew() {
  this.enableEdit = true;
}

openNew2() {
  this.enableRemb = true;
}

openNew3() {
  this.enableRepS = true;
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


isEdit(billet:Billet)
{
  this.opsbilletService.isEdit(billet.bilId).subscribe({
    next: () => {
        //console.log(bateau);
        this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Edition du billet activé avec succés', life: 3000 });
    },
    error: error => {
        console.error('ERROR', error);
        this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur de remboursement', life: 3000 });
    }
  });

  this.enableEdit = false;

}


isRembs(billet:Billet)
{
  this.opsbilletService.isRemb(billet.bilId).subscribe({
    next: () => {
        //console.log(bateau);
        this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Remboursement du billet activé avec succés', life: 3000 });
    },
    error: error => {
        console.error('ERROR', error);
        this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur de remboursement', life: 3000 });
    }
  });

  this.enableRemb = false;

}


isRepSur(billet:Billet)
{
  this.opsbilletService.isRepSur(billet.bilId).subscribe({
    next: () => {
        //console.log(bateau);
        this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Report/Surclassement du billet activé avec succés', life: 3000 });
    },
    error: error => {
        console.error('ERROR', error);
        this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur de remboursement', life: 3000 });
    }
  });

  this.enableRepS = false;

}

isCancel(billet:Billet)
{
  this.opsbilletService.isCancel(billet.bilId).subscribe({
    next: () => {
        //console.log(bateau);
        this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Annulation du billet activé avec succés', life: 3000 });
    },
    error: error => {
        console.error('ERROR', error);
        this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur de remboursement', life: 3000 });
    }
  });

}



}