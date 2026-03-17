import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { Bateau } from 'src/app/model/Bateau.model';
import { Niveau } from 'src/app/model/Niveau.model';
import { Place } from 'src/app/model/Place.model';
import { TypePlace } from 'src/app/model/TypePlace.model';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  places: Place[] = [];  

  typePlaces: TypePlace[] = [];  

  bateaux: Bateau[] = [];  

  niveaux: Niveau[] = [];  
  
  productDialog: boolean = false;

  placeDialogEdit: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  bloqPlace : number = 0;

  placeCreate : Place = {
    plc_id: 0,
    plc_code: '',
    plc_etat: false,
    sexe: '',
    niv_id: 0,
    tplc_id: 0,
    bat_id: 0,
    typePlace: undefined,
    niveau: undefined,
    bateau: undefined,
    situation: '',
    is_carabane: false
  }

  place : Place = {
    plc_id: 0,
    plc_code: '',
    plc_etat: false,
    sexe: '',
    niv_id: 0,
    tplc_id: 0,
    bat_id: 0,
    typePlace: undefined,
    niveau: undefined,
    bateau: undefined,
    situation: '',
    is_carabane: false
  }
placeEdit : Place = {
  plc_id: 0,
  plc_code: '',
  plc_etat: false,
  sexe: '',
  niv_id: 0,
  tplc_id: 0,
  bat_id: 0,
  typePlace: undefined,
  niveau: undefined,
  bateau: undefined,
  situation: '',
  is_carabane: false
}
placeUpdate : Place = {
  plc_id: 0,
  plc_code: '',
  plc_etat: false,
  sexe: '',
  niv_id: 0,
  tplc_id: 0,
  bat_id: 0,
  typePlace: undefined,
  niveau: undefined,
  bateau: undefined,
  situation: '',
  is_carabane: false
}



  constructor(private placeService: PlaceService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
      //this.productService.getProducts().then(data => this.products = data);

      this.placeService.getPlaces().subscribe((response:any) => 
        {
        this.places = response;
        console.log(this.places);
        }
      );

      this.placeService.getTypePlaces().subscribe((response:any) => 
        {
        this.typePlaces = response;
        console.log(this.typePlaces);
        }
      );

      this.placeService.getBateaux().subscribe((response:any) => 
        {
        this.bateaux = response;
        console.log(this.bateaux);
        }
      );

      this.placeService.getNiveaux().subscribe((response:any) => 
        {
        this.niveaux = response;
        console.log(this.niveaux);
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
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }
  
  savePlace() 
  {
    console.log(this.placeCreate);
    this.place.plc_code = this.placeCreate.plc_code;
    this.place.plc_etat =true;
    this.place.tplc_id = this.placeCreate.tplc_id;
    this.place.bat_id = this.placeCreate.bat_id; 
    this.place.niv_id = this.placeCreate.niv_id; 

    //console.log(this.selectedFile);
    this.submitted = true;
    this.placeService.createPlace(this.place).subscribe({
        next: () => {
            window.location.reload();
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Place créée avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    this.productDialog = false;
    //this.bateauCreate = {};

  } 

  modifPlace(place: Place) 
  {
    this.placeEdit = { ...place };

    if (this.placeEdit.situation === "RESERVE")
    {
      this.bloqPlace = 1;
    }

    console.log(this.bloqPlace);
    
    console.log(this.placeEdit);
    this.placeDialogEdit = true;
  }


    savePlace2(id:number) 
    {
      // Utilisation de la fonction
      const place = this.findPlaceById(id);
  
      //console.log(this.selectedFile);
      this.submitted = true;
  
      if (place) {
        console.log(`Place trouvée :`, place);
      } 
      else {
        console.log(`Place avec l'ID ${id} non trouvé.`);
      }

      if (this.bloqPlace === 1)
      {
        this.placeEdit.situation = "RESERVE";
      }
      else
      {
        this.placeEdit.situation = "";
      }

      console.log(this.placeEdit.situation);
  
      //console.log(`modifications :`, this.agenceEdit);
  
      console.log(this.placeEdit);
      place.plc_code = this.placeEdit.plc_code;
      place.plc_etat = true;
      place.tplc_id = this.placeEdit.tplc_id;
      place.bat_id = this.placeEdit.bat_id; 
      place.niv_id = this.placeEdit.niv_id; 
      place.situation = this.placeEdit.situation;
      place.is_carabane = this.placeEdit.is_carabane

      if (this.placeEdit.tplc_id == null)
      {
        console.log(this.placeEdit.typePlace.tplc_id);
        place.tplc_id = this.placeEdit.typePlace.tplc_id;
      }
      if (this.placeEdit.bat_id == null)
      {
        console.log(this.placeEdit.bateau.bat_id);
        place.bat_id = this.placeEdit.bateau.bat_id;
      }
      if (this.placeEdit.niv_id == null)
      {
        console.log(this.placeEdit.niveau.niv_id);
        place.niv_id = this.placeEdit.niveau.niv_id;
      }

      console.log(place);
      
      
      this.placeService.updatePlace(place).subscribe({
          next: (response) => {
              //window.location.reload();
              console.log(response);
              this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Place mise à jour avec succés', life: 3000 });
          },
          error: error => {
              console.error('ERROR', error);
              this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
          }
      });
      
      
      this.placeDialogEdit = false;
      //this.bateauCreate = {};
  
    }
  
    findPlaceById(placeId: number) 
    {
      console.log("Recherche de la place avec l'ID:" + placeId);
      console.log(this.places);
    
      for (let i = 0; i < this.places.length; i++) 
        {
        this.placeUpdate = this.places[i];
  
        console.log(this.places[i])
        console.log(this.placeUpdate)
  
        if (placeId == this.placeUpdate.plc_id) {
          //console.log("Bateau trouvé: ", JSON.stringify(this.bateauCreate2, null, 2));
          return this.placeUpdate; // Retourner l'objet bateau trouvé
        }
      }
      //console.warn("Aucun bateau trouvé avec l'ID:", bateauId);
      return null; // Retourner null si aucun bateau n'est trouvé
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
}

