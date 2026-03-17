import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'infovoyage3'
})
export class Infovoyage3Pipe implements PipeTransform {
  public depart: string;
  public arrive: string;

  transform(voyId: number, voyages_: any[], bateaux: any[]): string {
    if (voyId === 0 || !voyages_ || voyages_.length === 0) {
      return "";
    }
  
    const voyage = voyages_.find(v => v.voy_id === voyId);
    if (!voyage) {
      return "";
    }
  
    const bateau = bateaux.find(b => b.bat_id === voyage.bat_id);
    const dateFormatted = voyage.voy_datedpt ? formatDate(voyage.voy_datedpt, 'dd/MM/yyyy', 'fr') : "";
  
    return `du ${dateFormatted} du navire <<${bateau?.bat_nom || 'Inconnu'}>>`;
  }
  
}