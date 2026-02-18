import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppMainComponent } from 'src/app/app.main.component';
import { VoyageService } from 'src/app/services/voyage.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit 
{

  getRecByState_ : any[] = [];

  getRecByState : any;


  constructor(public voyageService: VoyageService, public appMain: AppMainComponent, private messageService: MessageService, private confirmationService: ConfirmationService) { }


  ngOnInit() 
  {
    this.voyageService.getRecParEtat().subscribe((response:any) => 
      {
        this.getRecByState = response;
            this.getRecByState_ = Object.entries(this.getRecByState).map(([etat, recs]) => ({
                etat,
                recs
            }));
            console.log(this.getRecByState_);
      }
    );
  }
 

}
