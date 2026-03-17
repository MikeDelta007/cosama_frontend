import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'infovoyage2'
})
export class Infovoyage2Pipe implements PipeTransform {
  public depart: string;
  public arrive: string;

  transform(voyId: number, voyages_: any[]): string {
    if (voyId === 0 || !voyages_ || voyages_.length === 0) 
    {
      return "";
    }

    const voyage = voyages_.find(v => v.voy_id === voyId);
    if (!voyage) 
    {
      return "";
    }

    this.depart = voyage.voy_depart === 1 ? "DK" : "ZG";
    this.arrive = voyage.voy_destination === 1 ? "DK" : "ZG";

    const dateFormatted = voyage.voy_datedpt ? formatDate(voyage.voy_datedpt, 'dd/MM/yyyy', 'fr') : "";

    return `${voyage.code_voyage} / ${this.depart}-${this.arrive} (${dateFormatted})`;
  }
}
