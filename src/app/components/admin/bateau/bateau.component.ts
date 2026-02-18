import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/domain/product';
import { ProductService } from 'src/app/demo/service/productservice';
import { AgenceCreate } from 'src/app/model/Agence';
import { Bateau } from 'src/app/model/Bateau.model';
import { BateauCreate } from 'src/app/model/BateauCreate';
import { AgenceService } from 'src/app/services/agence.service';
import { BateauService } from 'src/app/services/bateau.service';
import { config } from 'src/app/config/api.config';
import { ba } from '@fullcalendar/core/internal-common';
import { Agence } from 'src/app/model/Agence.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bateau',
  templateUrl: './bateau.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./bateau.component.scss']
})
export class BateauComponent implements OnInit {
  public selectedFile: File | null = null;
  uploadedFiles: { name: string, size: number, data: Uint8Array }[] = [];

  selectedFile2: { [key: number]: File } = {}; // Garde trace des fichiers sélectionnés pour chaque bateau
  uploadedFiles2: { [key: number]: File[] } = {}; // Garde trace des fichiers téléversés pour chaque bateau

  productDialog: boolean = false;
  productDialog2: boolean = false;

  deleteProductDialog: boolean = false;
  stateBateauDialog: boolean = false;

  products: Product[] = [];
  bateaux : Bateau[] = [];

  agences : Agence[] = [];
  bateauWithImages : Bateau[] = [];

  places : any[] = [];
  countByTypePerBateau: { [key: number]: any } = {};

  bateau : Bateau = {
    //bat_photo_name: '',
    bat_id: 0,
    bat_ref: '',
    bat_nom: '',
    bat_desc: '',
    bat_nbplace: 0,
    imageUrl: '',
    agc_id: 0,
    Agence: undefined,
    bat_etat: false,
    bat_markeur: ''
  };

  bateauEdit : Bateau = {
    //bat_photo_name: '',
    bat_id: 0,
    bat_ref: '',
    bat_nom: '',
    bat_desc: '',
    bat_nbplace: 0,
    imageUrl: '',
    agc_id: 0,
    Agence: undefined,
    bat_etat: false,
    bat_markeur: ''
  };

  bateauCreate: Bateau = {
    bat_id: 0,
    bat_ref: '',
    bat_nom: '',
    bat_desc: '',
    bat_nbplace: 0,
    bat_etat: false,
    imageUrl: '',
    agc_id: 0,
    Agence: undefined,
    bat_markeur: ''
  };
  //bateauEdit: BateauCreate = {};
  bateauCreate2: Bateau = {
    //bat_photo_name: '',
    bat_id: 0,
    bat_ref: '',
    bat_nom: '',
    bat_desc: '',
    bat_nbplace: 0,
    agc_id: 0,
    imageUrl: '',
    Agence: undefined,
    bat_etat: false,
    bat_markeur: ''
  };

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 15];
  
  imageUrl: string | ArrayBuffer;

  constructor(private router : Router, private http: HttpClient, private bateauService: BateauService, private agenceService: AgenceService, private messageService: MessageService, private confirmationService: ConfirmationService) 
  { 

  }

  ngOnInit() {
    //this.loadImagesForBateaux();
    this.agenceService.getAgences().subscribe((response:any) => 
      {
        this.agences = response;
        console.log(this.agences);
      }
    );

    this.bateauService.getBateaux().subscribe((response: any) =>
      {
        this.bateaux = response;
        console.log(this.bateaux);
        this.bateaux.forEach(bateau => {
          //console.log(bateau);
          this.decompterPlacesParType(bateau); // Appeler la méthode pour chaque bateau
        });
      }
    );

   // this.decompterPlacesParType(this.bateau); // Appeler la méthode ici

    
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name_bateau', header: 'Nom Bateau' },
      { field: 'owner', header: 'Gestionnaire' },
      { field: 'places', header: 'Nombre de places' }
      ];

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];
  }

  decompterPlacesParType(bateau: Bateau) 
  {
    this.bateauService.getPlacesBateau(bateau.bat_id).subscribe((response: any) => 
      {
      this.places = response;
      const countByType = {
        type1: 0,
        type2: 0,
        type3: 0,
        type4: 0
      };
      // Parcourir le tableau des places et incrémenter les compteurs
      for (let i = 0; i < this.places.length; i++) {
        const place = this.places[i];
        if (place.tplc_id == 1) {
          countByType.type1++;
        } else if (place.tplc_id == 2) {
          countByType.type2++;
        } else if (place.tplc_id == 3) {
          countByType.type3++;
        } else if (place.tplc_id == 4) {
          countByType.type4++;
        }
      }
      
      // Afficher les résultats
      
      // Retourner les résultats (si nécessaire, vous pouvez les utiliser ici ou ailleurs)
      this.countByTypePerBateau[bateau.bat_id] = countByType;
    });
  }  
  

  loadImagesForBateaux() {
    this.bateauService.getBateaux().subscribe(async (response: any) => {
        //console.log(typeof(this.bateaux));
        // Obtenir un tableau des valeurs de l'objet this.bateaux
        Object.values(response).forEach(async (bateau: any) => {
          console.log(bateau);
          if (bateau && bateau.bat_id) {  // Vérifier si bateau et bateau.bat_id sont définis
              try {
                  console.log(bateau);
                  //const imageUrl = await this.loadImage(bateau.bat_id);
                  this.bateauWithImages.push({ ...bateau });
                  //console.log(`Image for bateau ${bateau.batId}: ${imageUrl}`);
              } catch (error) {
                  //console.error(`Failed to load image for bateau ${bateau.batId}`, error);
              }
          } else {
              //console.warn("Bateau or bateau.bat_id is undefined");
          }
        });

      
        // Maintenant, bateauWithImages contient chaque bateau avec son image
        console.log(this.bateauWithImages);
    });
  }

  openNew() {
      //this.bateauCreate = {};
      this.submitted = false;
      this.productDialog = true;
  }

  /**
  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }**/

  editProduct(bateau: Bateau) {
      this.bateauEdit = { ...bateau };
      this.productDialog2 = true;
  }

  deleteProduct(product: Product) {
      this.deleteProductDialog = true;
      this.product = { ...product };
  }

  stateBateau(bateau: Bateau) {
    this.bateau = { ...bateau };
    this.stateBateauDialog = true;
  }
  confirmDisablesSelected() {
    this.stateBateauDialog = false;
    let state: boolean;
  
    if (this.bateau.bat_etat) {
      state = false;
    } else {
      state = true;
    }
  
    this.bateauService.updateEtatBateau(this.bateau.bat_id, state).subscribe({
      next: () => {
        // Rafraîchir la page
        this.messageService.add({
          severity: 'success',
          summary: 'SILECS',
          detail: state ? 'Bateau réactivé avec succès' : 'Bateau désactivé avec succès',
          life: 3000
        });
      },
      error: error => {
        console.error('ERROR', error);
        this.messageService.add({
          severity: 'danger',
          summary: 'SILECS',
          detail: 'Erreur serveur',
          life: 3000
        });
      }
    });
  
    console.log("Test");
  }
  

  /**
  confirmDeleteSelected() {
      this.deleteProductsDialog = false;
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      this.selectedProducts = [];
  }**/

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

  saveProduct() 
  {
    console.log(this.bateauCreate.bat_ref);
    this.bateau.bat_ref = this.bateauCreate.bat_ref;
    this.bateau.bat_nom = this.bateauCreate.bat_nom;
    this.bateau.bat_desc = this.bateauCreate.bat_desc;
    this.bateau.bat_nbplace = this.bateauCreate.bat_nbplace;
    this.bateau.agc_id = this.bateauCreate.agc_id;
    this.bateau.bat_markeur = this.bateauCreate.bat_markeur; 

    //console.log(this.selectedFile);
    this.submitted = true;
    this.bateauService.submitBateau(this.bateau).subscribe({
        next: () => {
            window.location.reload();
            this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Bateau créé avec succés', life: 3000 });
        },
        error: error => {
            console.error('ERROR', error);
            this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
        }
    });
    this.productDialog = false;
    //this.bateauCreate = {};

  } 

  findBateauById(bateauId: number) {
    console.log("Recherche du bateau avec l'ID:" + bateauId);
    console.log(this.bateaux);
  
    for (let i = 0; i < this.bateaux.length; i++) 
      {
      this.bateauCreate2 = this.bateaux[i];

      if (bateauId == this.bateauCreate2.bat_id) {
        //console.log("Bateau trouvé: ", JSON.stringify(this.bateauCreate2, null, 2));
        return this.bateauCreate2; // Retourner l'objet bateau trouvé
      }
    }
  
    //console.warn("Aucun bateau trouvé avec l'ID:", bateauId);
    return null; // Retourner null si aucun bateau n'est trouvé
  }
  

  saveProduct2(id:number)
  {

    // Utilisation de la fonction
    const bateau = this.findBateauById(id);

    //console.log(this.selectedFile);
    this.submitted = true;

    if (bateau) {
      console.log(`Bateau trouvé :`, bateau);
    } else {
      console.log(`Bateau avec l'ID ${id} non trouvé.`);
    }

    console.log(`modifications :`, this.bateauEdit);

    bateau.bat_ref = this.bateauEdit.bat_ref;
    bateau.bat_nom = this.bateauEdit.bat_nom;
    bateau.bat_desc = this.bateauEdit.bat_desc;
    bateau.bat_nbplace = this.bateauEdit.bat_nbplace;
    bateau.bat_markeur = this.bateauEdit.bat_markeur;
    bateau.agc_id = this.bateauEdit.agc_id;

    console.log(`Bateau à poster :`, bateau);
    
    
    
    this.bateauService.updateBateau(bateau).subscribe({
      next: () => {
          //console.log(bateau);
          this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Bateau mis à jour avec succés', life: 3000 });
      },
      error: error => {
          console.error('ERROR', error);
          this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur lors de la création', life: 3000 });
      }
    });
    
    this.productDialog2 = false;
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  chooseFile() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async uploadFile() {
    if (this.selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const data = new Uint8Array(fileReader.result as ArrayBuffer);
        this.uploadedFiles.push({ 
          name: this.selectedFile!.name, 
          size: this.selectedFile!.size, 
          data 
        });
        //this.selectedFile = null; // Clear the selected file after upload
      };
      fileReader.readAsArrayBuffer(this.selectedFile);
    }
    //console.log(this.uploadedFiles);
  }

  cancelUpload() {
    this.selectedFile = null;
  }


  chooseFile2(batId: number) {
    const fileInput = document.getElementById(`fileInput-${batId}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected2(event: any, batId: number) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile2[batId] = event.target.files[0];
    }
  }

  uploadFile2(batId: number) {
    if (this.selectedFile2[batId]) {
      // Logique de téléversement ici
      if (!this.uploadedFiles[batId]) {
        this.uploadedFiles2[batId] = [];
      }
      this.uploadedFiles2[batId].push(this.selectedFile2[batId]);
      // Réinitialiser le fichier sélectionné après le téléversement
      this.selectedFile2[batId] = undefined;
    }
  }

  cancelUpload2(batId: number) {
    this.selectedFile2[batId] = undefined;
  }
}
