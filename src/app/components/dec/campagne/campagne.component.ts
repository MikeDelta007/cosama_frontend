import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campagne',
  templateUrl: './campagne.component.html',
  styleUrls: ['./campagne.component.scss']
})
export class CampagneComponent implements OnInit 
{
  cardId: string | null = null;

  constructor() {}

  ngOnInit() 
  {
    // this.rfidService.cardId$.subscribe((id) => {
    //   this.cardId = id;
    //   console.log("Badge reçu dans le component :", id);
    // });
  }

}
