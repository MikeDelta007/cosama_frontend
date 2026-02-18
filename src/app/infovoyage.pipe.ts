import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voyage'
})

export class VoyagePipe implements PipeTransform {
  public depart : string;
  public arrive : string;
  transform(voyId: number, voyages_: any[]): string {
    console.log(voyId);
    if (voyId === 0) {
      return "";
    }

    if (!voyages_ || voyages_.length === 0) {
      return "";
    }

    const voyage = voyages_.find(v => v.voy_id === voyId);

    if(voyage.voy_depart === 1)
    {
      this.depart = "DK"
    }
    else
    {
      this.depart = "ZG"
    }

    if(voyage.voy_destination === 1)
    {
      this.arrive = "DK"
    }
    else
      {
      this.arrive = "ZG"
    }
      
    if (!voyage) 
    {
      return "";
    }

    //const dateFormatted = voyage.voy_datedpt ? formatDate(voyage.voy_datedpt) : "date inconnue";

    return `${voyage.code_voyage}/${this.depart}-${this.arrive}`;
  }
  
}
