import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { Bateau } from 'src/app/model/Bateau.model';
import { MotifAVoy } from 'src/app/model/MotifAVoy.model';
import { Section } from 'src/app/model/Place';
import { Ville } from 'src/app/model/Ville.model';
import { Voyage } from 'src/app/model/Voyage.model';
import { PlaceService } from 'src/app/services/place.service';
import { VoyageService } from 'src/app/services/voyage.service';

@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./voyage.component.scss']
})
export class VoyageComponent implements OnInit {

  eventDialog : boolean = false;

  productDialog: boolean = false;

  motifVoyDialog: boolean = false;

  editVoyageDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  voyages : Voyage[] = [];

  villes : Ville[] = [];

  voyage : Voyage = {
    voy_id: 0,
    voy_depart: 0,
    voy_destination: 0,
    voy_datedpt: '',
    voy_datearriv: '',
    voy_etat: 0,
    bat_id: 0,
    motif: '',
  };

  public mt : MotifAVoy = 
  {
    motif: ''
  }

  voyageEdit : Voyage = {
    voy_id: 0,
    voy_depart: 0,
    voy_destination: 0,
    voy_datedpt: '',
    voy_datearriv: '',
    voy_etat: 0,
    bat_id: 0,
    motif: '',
  };


    voyageCreate : Voyage = {
      voy_id: 0,
      voy_depart: 0,
      voy_destination: 0,
      voy_datedpt: '',
      voy_datearriv: '',
      voy_etat: 0,
      bat_id: 0,
      motif: '',
    };

    voyageCreate2 : Voyage = {
      voy_id: 0,
      voy_depart: 0,
      voy_destination: 0,
      voy_datedpt: '',
      voy_datearriv: '',
      voy_etat: 0,
      bat_id: 0,
      motif: '',
    };

    bateaux: Bateau[] = [];

  constructor(private datePipe: DatePipe, private placeService: PlaceService, private voyageService: VoyageService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
      //this.productService.getProducts().then(data => this.products = data);

      this.voyageService.getVoyages().subscribe((response:any) => 
        {
          this.voyages = response;
          console.log(this.voyages);
        }
      );

      this.voyageService.getVilles().subscribe((response:any) => 
        {
          this.villes = response;
          console.log(this.villes);
        }
      );
      
      this.placeService.getBateaux().subscribe((response:any) => 
        {
        this.bateaux = response;
        console.log(this.bateaux);
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

  isToday(dateString: string): boolean 
  {
  const today = new Date();
  const date = new Date(dateString);
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth() &&
         date.getDate() === today.getDate();
  }

  getBateauNomById(id) {
    const bateau = this.bateaux.find(bateau => bateau.bat_id === id);
    return bateau ? bateau.bat_nom : 'Bateau non trouvé';
  }

  getVilleNomById(id) {
    const ville = this.villes.find(ville => ville.vil_id === id);
    return ville ? ville.vil_nom : 'Ville non trouvée';
  }

  getBateauMarkersAndNames(bateaux: Array<any>): Array<{ bat_nom: string, bat_markeur: string | null }> {
    return bateaux.map(bateau => {
      return {
        bat_nom: bateau.bat_nom,
        bat_markeur: bateau.bat_markeur
      };
    });
  }

  formatDateComplete(dateString: string): string {
    // Créer un objet Date à partir de la chaîne
    const date = new Date(dateString);
    
    // Options pour le formatage de la date en français
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',  // Jour de la semaine (long)
      year: 'numeric',  // Année complète (ex: 2024)
      month: 'long',    // Mois complet (ex: juin)
      day: 'numeric'    // Jour (ex: 26)
    };
    
    // Retourner la date formatée en français
    return date.toLocaleDateString('fr-FR', options);
  }
  

  saveVoyage() 
  {
    const formattedDate1 = this.datePipe.transform(this.voyageCreate.voy_datedpt, 'yyyy-MM-dd');
    const formattedDate2 = this.datePipe.transform(this.voyageCreate.voy_datearriv, 'yyyy-MM-dd');
    console.log(this.voyageCreate.voy_datedpt);
    this.voyage.voy_depart = this.voyageCreate.voy_depart;
    this.voyage.voy_destination = this.voyageCreate.voy_destination;
    this.voyage.voy_datedpt = formattedDate1;
    this.voyage.voy_datearriv = formattedDate2;
    this.voyage.bat_id = this.voyageCreate.bat_id;
    this.voyage.voy_etat = 1; 

    console.log(this.voyage);
    this.submitted = true;
    this.voyageService.createVoyage(this.voyage).subscribe({
        next: () => {
            window.location.reload();
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Voyage créé avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    this.productDialog = false;
    //this.bateauCreate = {};

  }
    selectedDate1(selectedDate1: any, arg1: string) {
        throw new Error('Method not implemented.');
    }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  convertStringToDate(dateString: string): string {
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Mois commence à 0
    const day = parseInt(parts[2], 10);
    
    // Créer l'objet Date
    const date = new Date(year, month, day);
  
    // Format "dd/MM/yyyy"
    const formattedDay = ('0' + date.getDate()).slice(-2);
    const formattedMonth = ('0' + (date.getMonth() + 1)).slice(-2);
    const formattedYear = date.getFullYear();
  
    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  }
  
  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editVoyage(voyage: Voyage) 
  {
  this.voyageEdit = { ...voyage };

  if (this.voyageEdit.voy_datearriv) {
    this.voyageEdit.voy_datearriv = this.convertStringToDate(this.voyageEdit.voy_datearriv);
  }

  if (this.voyageEdit.voy_datedpt) {
    this.voyageEdit.voy_datedpt = this.convertStringToDate(this.voyageEdit.voy_datedpt);
  }

  console.log('Date d\'arrivée formatée:', this.voyageEdit.voy_datearriv);
  console.log('Date de départ formatée:', this.voyageEdit.voy_datedpt);
  this.editVoyageDialog = true;
  }

  saveVoyage2() 
  {
    console.log(this.voyageEdit);
    this.submitted = true;
    const formattedDate1 = this.datePipe.transform(this.voyageEdit.voy_datedpt, 'yyyy-MM-dd');
    const formattedDate2 = this.datePipe.transform(this.voyageEdit.voy_datearriv, 'yyyy-MM-dd');
    this.voyageEdit.voy_datedpt = formattedDate1;
    this.voyageEdit.voy_datearriv = formattedDate2;
    this.voyageService.updateVoyage(this.voyageEdit).subscribe({
      next: () => {
          this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Voyage mis à jour avec succés', life: 3000 });
      },
      error: error => {
          console.error('ERROR', error);
          this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
      }
    });
    this.editVoyageDialog = false;

  }

  openMotifVoyage(voyage : Voyage) 
  {
    this.mt.motif = "";
    this.motifVoyDialog = true;
    this.voyageEdit = {...voyage};
    console.log(this.voyageEdit);
  }

  findVoyById(usrId: number) {
    console.log("Recherche du user avec l'ID:" + usrId);
    console.log(this.voyages);
  
    for (let i = 0; i < this.voyages.length; i++) 
      {
      this.voyageEdit = this.voyages[i];
      console.log(this.voyageEdit);
      if (usrId == this.voyageEdit.voy_id) {
        return this.voyageEdit; // Retourner l'objet bateau trouvé
      }
    }
    return null; // Retourner null si aucun bateau n'est trouvé
  }

  cancelVoyage(id : number)
  {

    // Utilisation de la fonction
    let v = this.voyageEdit;
    v = this.findVoyById(id);

    //console.log(this.selectedFile);
    this.submitted = true;

    if (v) 
    {
      console.log(`Voyage trouvé :`, v);
      console.log(v);
    } 
    else 
    {
      console.log(`Voy avec l'ID ${id} non trouvé.`);
    }
    
    console.log(`modifications :`, this.mt);

    console.log(`Voy à poster :`, v);
    console.log(`Id à poster :`, id);
    
    this.voyageService.cancelVoyage(v, this.mt.motif).subscribe({
      next: () => {
          this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Voyage annulé succés', life: 3000 });
          this.motifVoyDialog = false;
          window.location.reload();
      },
      error: error => {
          console.error('ERROR', error);
          this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
      }
    });

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

