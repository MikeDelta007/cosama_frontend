import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { Bateau } from 'src/app/model/Bateau.model';
import { Place } from 'src/app/model/Place.model';
import { TypePlace } from 'src/app/model/TypePlace.model';
import { Voyage } from 'src/app/model/Voyage.model';
import { DeblocageplaceService } from 'src/app/services/deblocageplace.service';
import { PlaceService } from 'src/app/services/place.service';
import { VoyageService } from 'src/app/services/voyage.service';

@Component({
  selector: 'app-deblocage-place',
  templateUrl: './deblocage-place.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./deblocage-place.component.scss']
})
export class DeblocagePlaceComponent implements OnInit {

  products: Product[];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  sourceCities: any[];

  targetCities: any[];

  orderCities: any[];

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  places: Place[] = [];  

  typePlaces: TypePlace[] = [];  

  bateaux: Bateau[] = [];  

  voyages : Voyage[] = [];

  reserved : any[] = [];

  dispo : any[] = [];

  selectedBateau: any; // Pour stocker la valeur sélectionnée du dropdown bateau
  selectedVoyage: any; // Pour stocker la valeur sélectionnée du dropdown voyage
  selectedTypePlace: any; // Pour stocker la valeur sélectionnée du dropdown type de place

  sourcePlaces: Place[] = []; // Places disponibles pour le PickList
  targetPlaces: Place[] = []; // Places réservées pour le PickList

  constructor(private readonly deblocageplaceService: DeblocageplaceService, private readonly messageService: MessageService, private readonly confirmationService: ConfirmationService) {
  }

  ngOnInit() 
  {
      this.deblocageplaceService.getPlaces().subscribe((response:any) => 
        {
        this.places = response;
        console.log(this.places);
        }
      );

      this.deblocageplaceService.getTypePlaces().subscribe((response:any) => 
        {
        this.typePlaces = response;
        console.log(this.typePlaces);
        }
      );

      this.deblocageplaceService.getBateaux().subscribe((response:any) => 
        {
        this.bateaux = response;
        console.log(this.bateaux);
        }
      );

      
      this.deblocageplaceService.getVoyages().subscribe((response:any) => 
        {
          this.voyages = response;
          console.log(this.voyages);
        }
      );

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

      
      //this.productService.getProducts().then(data => this.products = data);

      this.sourceCities = [
          {name: 'San Francisco', code: 'SF'},
          {name: 'London', code: 'LDN'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Berlin', code: 'BRL'},
          {name: 'Barcelona', code: 'BRC'},
          {name: 'Rome', code: 'RM'}];
      this.targetCities = [];

      this.orderCities = [
          {name: 'San Francisco', code: 'SF'},
          {name: 'London', code: 'LDN'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Berlin', code: 'BRL'},
          {name: 'Barcelona', code: 'BRC'},
          {name: 'Rome', code: 'RM'}];

      this.sortOptions = [
          {label: 'Price High to Low', value: '!price'},
          {label: 'Price Low to High', value: 'price'}
      ];
  }

    // Méthode appelée lorsque les dropdowns sont modifiés
    onDropdownChange() {
        if (this.selectedBateau && this.selectedVoyage && this.selectedTypePlace) {
          this.listerPlacesDispo(); // Appelle la méthode pour rafraîchir les données de places
          this.listerPlacesReserved(); // Appelle la méthode pour rafraîchir les données de places
        }
    }
    
    // Méthode pour lister les places disponibles
    listerPlacesDispo() {
        console.log(this.selectedTypePlace, this.selectedVoyage, this.selectedBateau)
        this.sourcePlaces = []
        
        this.deblocageplaceService.getAvailablePlaces(this.selectedTypePlace, this.selectedVoyage, this.selectedBateau)
          .subscribe((places: Place[]) => {
            this.sourcePlaces = places || []; // Met à jour la source des places disponibles pour le PickList
            console.log(this.sourcePlaces);
          });
          
    }

    // Méthode pour lister les places disponibles
    listerPlacesReserved() {
        console.log(this.selectedTypePlace, this.selectedVoyage, this.selectedBateau)
        this.targetPlaces = this.targetPlaces || []
        this.deblocageplaceService.getReservedPlace(this.selectedTypePlace, this.selectedVoyage, this.selectedBateau)
          .subscribe((places: Place[]) => {
            this.targetPlaces = places || []; // Reset les places réservées
            console.log(this.targetPlaces);
          });
    }   
    
    
    logMovedToTarget(event: any) {
        this.reserved = event.items; // Les éléments déplacés vers target
        console.log('Déplacé vers RESERVES :', this.reserved);
        this.reserved.forEach(item => {
          console.log(`Code: ${item.plc_code}, Sexe: ${item.sexe}`);
        });
      }
    
      // Méthode appelée lorsque des éléments sont déplacés de target vers source
    logMovedToSource(event: any) {
        this.dispo = event.items; // Les éléments déplacés vers source
        console.log('Déplacé vers DISPONIBLES :', this.dispo);
        this.dispo.forEach(item => {
          console.log(`Code: ${item.plc_code}, Sexe: ${item.sexe}`);
        });
      }

  saveModification()
  {
    if(this.dispo.length > 0)
    {
      console.log("Données dispo")
      this.dispo.forEach(item => {
        this.deblocageplaceService.libererPlace(item.plc_id, this.selectedVoyage, item.bat_id);
      });
    }
    

    if (this.reserved.length > 0) {
      console.log("Données réservées");
      this.reserved.forEach(item => {
        this.deblocageplaceService.doReservation(item.plc_id, this.selectedVoyage, item.bat_id)
          .subscribe(
            response => {
              console.log('Réservation réussie pour', item.plc_id);
            },
            error => {
              console.error('Erreur lors de la réservation pour', item.plc_id, error);
            }
          );
      });
    }
    
    
  }


      
  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: Product) {
      this.product = { ...product };
      this.productDialog = true;
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


  onSortChange(event) {
      const value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      } else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }
}
