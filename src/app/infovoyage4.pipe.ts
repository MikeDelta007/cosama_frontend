import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'infovoyage4'
})
export class Infovoyage4Pipe implements PipeTransform {

  public depart: string;
  public arrive: string;

  transform(voyId: number, voyages_: any[], villes: any[]): string {
    if (voyId === 0 || !voyages_ || voyages_.length === 0) 
    {
      return "";
    }

    const voyage = voyages_.find(v => v.voy_id === voyId);
    const ville1 = villes.find(vi => vi.vil_id === voyage.voy_depart);
    const ville2 = villes.find(vi => vi.vil_id === voyage.voy_destination);

    if (!voyage) 
    {
      return "";
    }

    this.depart = voyage.voy_depart === 1 ? ville1.vil_code : ville2.vil_code;
    this.arrive = voyage.voy_destination === 1 ? ville1.vil_code : ville2.vil_code;

    return `${voyage.code_voyage} / ${this.depart}-${this.arrive}`;
  }
}
