import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Billet } from 'src/app/model/Billet.model';
import { Bateau } from 'src/app/model/Bateau.model';
import { Place } from 'src/app/model/Place.model';
import { TypePiece } from 'src/app/model/TypePiece.model';
import { TypePlace } from 'src/app/model/TypePlace.model';
import { Ville } from 'src/app/model/Ville.model';
import { BateauService } from 'src/app/services/bateau.service';
import { BilletService } from 'src/app/services/billet.service';
import { PlaceService } from 'src/app/services/place.service';
import { VoyageService } from 'src/app/services/voyage.service';
import { CheckBillet } from 'src/app/model/CheckBillet.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EtatBillet } from 'src/app/model/AchatOnLine.model';
import { FretDTO } from 'src/app/model/FretClt.model';

@Component({
  selector: 'app-check-billet',
  providers: [MessageService, ConfirmationService],
  templateUrl: './check-billet.component.html',
  styleUrls: ['./check-billet.component.scss']
})
export class CheckBilletComponent implements OnInit {

  selectedState: any = null;
  valideBillet: boolean = false;
  public le_billet : string;
  public bilResult : string
  public bateaux : Bateau[] = [];
  public billet : Billet;
  public typePlaces: TypePlace[] = [];
  public typePieces: TypePiece[] = [];
  public places: Place[] = [];
  public villes: Ville[] = [];
  public checkBillet : boolean = false;

  public oneFret : FretDTO = {
    fretId: 0,
    fretCode: '',
    expEqDest: false,
    raisonSocialeDest: '',
    firstnameDest: '',
    lastnameDest: '',
    telephoneDest: '',
    emailDest: '',
    fretAcompte: 0,
    fretMontant: 0,
    fretTva: 0,
    fretRemiseTaux: 0,
    fretRemise: 0,
    fretMontant_ht: 0,
    applyTVA: false,
    applyPayment: false,
    fretDate: '',
    fretDesc: '',
    usrLogin: '',
    fretPayDate: '',
    fretPayUsr: '',
    fretEtat: false,
    billet: '',
    coutMagasinage: 0,
    coutMagasinageRemise: 0,
    usrMagasinage: '',
    dateMagasinage: '',
    usrLoginPayable: '',
    dateEncaissPayable: '',
    cltcmpt_id: 0,
    voy_id: 0,
    fretClt_id: 0,
    carabane: 0,
    ligneFretDTOList: [],
    motif: '',
    paymentMethod : ''
  };

  public etatBillet : EtatBillet = {
    ebId: 0,
    status: '',
    bilTime: '',
    billetId: 0,
    color: '',
    icon: ''
  }

  constructor(private bateauService : BateauService, private placeService : PlaceService, private voyageService : VoyageService, private billetService : BilletService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  currentDate: Date = new Date()

  ngOnInit(): void {
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
    return ville ? ville.vil_nom : 'Aucun';
  }

  getTypePiece(typePieceId: number): string {
    const typePiece = this.typePieces.find(tp => tp.tpiece_id === typePieceId);
    console.log(typePiece);
    return typePiece ? typePiece.tpiece_nom : 'Aucun';
  }

  getBateau(batId: number): string
  {
    const bateau = this.bateaux.find(b => b.bat_id === batId);
    return bateau ? bateau.bat_nom : 'Aucun';
  }

  states: any[] = [
      {name: 'Arizona', code: 'Arizona'},
      {name: 'California', value: 'California'},
      {name: 'Florida', code: 'Florida'},
      {name: 'Ohio', code: 'Ohio'},
      {name: 'Washington', code: 'Washington'}
  ];

  dropdownItems = [
      { name: 'Option 1', code: 'Option 1' },
      { name: 'Option 2', code: 'Option 2' },
      { name: 'Option 3', code: 'Option 3' }
  ];

  cities1: any[] = [];

  cities2: any[] = [];

  city1: any = null;

  city2: any = null;

  saveCheckBillet(id: number) {
      this.billetService.updateCheckInfo(id, true).subscribe({
          next: () => {
              this.messageService.add({ 
                  severity: 'success', 
                  summary: 'SILECS', 
                  detail: 'Check - In effectué avec succès', 
                  life: 3000 
              });
              this.bilResult = "Billet déjà contrôlé";
          },
          error: (error) => {
              console.error('Erreur lors du Check-In', error);
              this.messageService.add({ 
                  severity: 'error', 
                  summary: 'SILECS', 
                  detail: 'Erreur serveur lors du Check-In', 
                  life: 3000 
              });
          }
      });

      this.valideBillet = false;
  }
 

  onDropdownChange() 
  {
    if (this.le_billet.length === 12) 
    {
      this.searchBillet();
    }

  }
  
  searchBillet()
  { 
      console.log(this.le_billet);

      if(!this.le_billet)
      {
          this.bilResult = "Billet inexistant";
      }
      else
      {
          this.billetService.getDetailsBillet(this.le_billet)
          .subscribe((response: any) => {
              // Récupère achatOnLine dans un objet
              this.billet = response; 
              console.log(this.billet);
              
              if (this.billet == null)
              {
                this.bilResult = "Billet inexistant";
              }
              else
              {
                const billetDate = new Date(this.billet.voyageDTO.voy_datedpt);
                const actualDate = new Date(this.currentDate);

                // Normaliser les dates à minuit (00:00:00) pour comparer uniquement l'année, le mois et le jour
                billetDate.setHours(0, 0, 0, 0);
                actualDate.setHours(0, 0, 0, 0);

                if(billetDate.getTime() !== actualDate.getTime())
                  {
                    console.log(billetDate.getTime() + " " + actualDate.getTime());
                    this.bilResult = "Ce billet n'est pas acheté pour ce voyage";
                  }
                  else
                  {
                    this.billetService.getOneFretByBillet(this.le_billet).subscribe((response : any) => {
                      this.oneFret = response;
                      console.log("The Fret", this.oneFret);
                      if (this.oneFret === null)
                      {
                        if(this.billet.bilCheck == true)
                          {
                            this.bilResult = "Billet déjà contrôlé";
                            console.log("Bloc If", this.billet.bilCheck);
                          }
                          else
                          {
                            if(this.billet.bilEtat == false)
                            {
                              this.bilResult = "Billet annulé";
                              console.log("Bloc If", this.billet.bilCheck);
                            }
                              else
                              {
                                this.valideBillet = true;
                                console.log("Bloc Else");
                              }
                          }
                      }
                      else
                      {
                        this.bilResult = "Vous n'avez pas encore payé votre frêt";
                      }
                    });
    

                  }  
              }

          });
      }
      //this.le_billet = "";
  }

}
