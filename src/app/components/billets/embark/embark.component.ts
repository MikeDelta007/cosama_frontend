import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Billet, EtatBillet } from 'src/app/model/AchatOnLine.model';
import { Bateau } from 'src/app/model/Bateau.model';
import { CheckBillet } from 'src/app/model/CheckBillet.model';
import { Place } from 'src/app/model/Place.model';
import { TypePiece } from 'src/app/model/TypePiece.model';
import { TypePlace } from 'src/app/model/TypePlace.model';
import { Ville } from 'src/app/model/Ville.model';
import { VoyagePlace } from 'src/app/model/VoyagePlace.model';
import { BateauService } from 'src/app/services/bateau.service';
import { BilletService } from 'src/app/services/billet.service';
import { PlaceService } from 'src/app/services/place.service';
import { VoyageService } from 'src/app/services/voyage.service';

@Component({
  selector: 'app-embark',
  templateUrl: './embark.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./embark.component.scss']
})
export class EmbarkComponent implements OnInit 
{
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
    public checkBillet: CheckBillet = {
      bilId: 0,
      bilCheck: false
    };
  
    public etatBillet : EtatBillet = {
      ebId: 0,
      status: '',
      bilTime: '',
      billetId: 0,
      color: '',
      icon: ''
    }

    public state : VoyagePlace = {
      voy_plc_id: 0,
      voy_id: 0,
      code_billet: '',
      plc_id: '',
      bat_id: '',
      vplc_etat: 0,
      in_board: 0
    };

    constructor(private readonly bateauService : BateauService, private readonly placeService : PlaceService, private readonly voyageService : VoyageService, private readonly billetService : BilletService, private readonly messageService: MessageService, private readonly confirmationService: ConfirmationService) { }

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
  
    saveCheckBillet(id:number) 
    {
      console.log(id);
      //this.checkBillet.bilCheck = true;
      this.billetService.updateInBoard(id).subscribe({
          next: () => {
              //window.location.reload();
              this.messageService.add({ severity: 'success', summary: 'SILECS', detail: 'Embarquement effectué avec succés', life: 3000 });
              this.bilResult = "Passager est à bord";
          },
          error: error => {
              //console.error('ERROR', error);
              this.messageService.add({ severity: 'error', summary: 'SILECS', detail: 'Erreur serveur', life: 3000 });
          }
      });
      this.valideBillet = false;
      //this.bateauCreate = {};
  
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
            console.log(this.bilResult);
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
                  console.log(this.bilResult);
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
                      this.bilResult = "Ce passager n'est pas prévu pour ce voyage";
                      console.log(this.bilResult);
                    }
                    else
                    {
                      console.log(this.billet.voyageDTO.voy_id)
                      this.voyageService.getStateVP_(this.billet.voyageDTO.voy_id, this.billet.plcId)
                      .subscribe((response: any) => {
                        console.log(response);
                       if (response == null)
                       {
                        this.bilResult = "Billet annulé";
                        console.log(this.bilResult);
                       }
                       else
                       {
                        this.state.vplc_etat = response.vpl_etat;
                        if (this.billet.bilCheck == true && this.billet.bilEtat == true && this.state.vplc_etat == 3)
                          {
                            this.valideBillet = true;
                            console.log("Bloc Else");
                          }
                          else
                          {
                            if (this.state.vplc_etat == 4)
                            {
                              this.bilResult = "Passager est à bord";
                              console.log(this.bilResult);
                            }
                            else
                            {
                              this.bilResult = "Billet pas encore contrôlé";
                              console.log(this.bilResult);
                            }
                          }
                       }
                      });
                    }  
                }
  
            });
            
        }
        //this.le_billet = "";
    }

}
