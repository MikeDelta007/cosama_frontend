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

  sameDates = false;

  sameCities = false;

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
  

  saveVoyage() {
    this.submitted = true;

    const v = this.voyageCreate;

    // ✅ 1. Vérifier que tous les champs sont remplis
    if (!v?.bat_id || !v?.voy_depart || !v?.voy_destination || !v?.voy_datedpt || !v?.voy_datearriv) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Tous les champs sont obligatoires.'
      });
      return;
    }

    // ✅ 2. Vérifier égalité des dates
    const dateDepart = new Date(v.voy_datedpt).getTime();
    const dateArrivee = new Date(v.voy_datearriv).getTime();

    this.sameDates = dateDepart === dateArrivee;

    // ✅ 3. Vérifier villes identiques
    this.sameCities = v.voy_depart === v.voy_destination;

    if (this.sameDates) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: "La date de départ doit être différente de la date d'arrivée."
      });
      return;
    }

    if (this.sameCities) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'La ville de départ doit être différente de la destination.'
      });
      return;
    }

    // ✅ 4. Formatter les dates
    const formattedDate1 = this.datePipe.transform(v.voy_datedpt, 'yyyy-MM-dd');
    const formattedDate2 = this.datePipe.transform(v.voy_datearriv, 'yyyy-MM-dd');

    if (!formattedDate1 || !formattedDate2) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Format de date invalide.'
      });
      return;
    }

    // ✅ 5. Construire l'objet backend
    const payload = {
      voy_id: null,
      voy_depart: v.voy_depart,
      voy_destination: v.voy_destination,
      voy_datedpt: formattedDate1,
      voy_datearriv: formattedDate2,
      bat_id: v.bat_id,
      voy_etat: 1,
      motif: ''
    };

    // console.log('Voyage prêt à être envoyé', payload);

    // ✅ 6. Appel API
    this.voyageService.createVoyage(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'SILECS',
          detail: 'Voyage créé avec succès',
          life: 3000
        });

        // fermer popup
        this.productDialog = false;
        this.submitted = false;

        // ✅ reset propre
        this.voyageCreate = {
          voy_id: null,
          bat_id: null,
          voy_depart: null,
          voy_destination: null,
          voy_datedpt: null,
          voy_datearriv: null,
          motif: null,
          voy_etat: 1
        };
      },

      error: (error) => {
        console.error('ERROR', error);

        this.messageService.add({
          severity: 'error',
          summary: 'SILECS',
          detail: error?.error?.message || 'Erreur serveur',
          life: 3000
        });
      }
    });
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

  saveVoyage2() {
    this.submitted = true;

    // ✅ 1. Vérifier champs obligatoires
    if (
      !this.voyageEdit?.bat_id ||
      !this.voyageEdit?.voy_depart ||
      !this.voyageEdit?.voy_destination ||
      !this.voyageEdit?.voy_datedpt ||
      !this.voyageEdit?.voy_datearriv
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Tous les champs sont obligatoires'
      });
      return;
    }

    // ✅ 2. Vérifier villes différentes
    if (this.voyageEdit.voy_depart === this.voyageEdit.voy_destination) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Le départ doit être différent de la destination'
      });
      return;
    }

    // ✅ 3. Vérifier dates différentes
    const sameDates =
      new Date(this.voyageEdit.voy_datedpt).getTime() ===
      new Date(this.voyageEdit.voy_datearriv).getTime();

    if (sameDates) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: "La date de départ doit être différente de la date d'arrivée"
      });
      return;
    }

    // ✅ 4. Formatter SANS muter l'objet original
    const payload = {
      ...this.voyageEdit,
      voy_datedpt: this.datePipe.transform(this.voyageEdit.voy_datedpt, 'yyyy-MM-dd'),
      voy_datearriv: this.datePipe.transform(this.voyageEdit.voy_datearriv, 'yyyy-MM-dd')
    };

    console.log('Payload update', payload);

    // ✅ 5. Appel backend
    this.voyageService.updateVoyage(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'SILECS',
          detail: 'Voyage mis à jour avec succès',
          life: 3000
        });

        this.editVoyageDialog = false;
        this.submitted = false;
      },
      error: (error) => {
        console.error('ERROR', error);

        this.messageService.add({
          severity: 'error',
          summary: 'SILECS',
          detail: error?.error?.message || 'Erreur serveur',
          life: 3000
        });
      }
    });
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
    
    if (this.mt.motif.length < 5)
    {
      this.messageService.add({ severity: 'warn', summary: 'SILECS', detail: 'Motif obligatoire et doit faire plus de 5 caractères', life: 3000 });
    }
    else
    {
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

