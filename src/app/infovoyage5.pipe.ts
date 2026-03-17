import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'infovoyage5'
})
export class Infovoyage5Pipe implements PipeTransform {

  public depart: string;
  public arrive: string;

  transform(voyId: number, voyages_: any[], villes: any[]): string {

    const voyage = voyages_.find(v => v.voy_id === voyId);
    const ville1 = villes.find(vi => vi.vil_id === voyage.voy_depart);
    const ville2 = villes.find(vi => vi.vil_id === voyage.voy_destination);

    return `${ville1.vil_nom} - ${ville2.vil_nom}`;
  }
}
