import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'infobateau',
})
export class InfobateauPipe implements PipeTransform {

  transform(voyId: number, bateaux: any[], voyages_: any[]): string 
  {
    console.log(voyId);

    if (!voyages_ || !bateaux) {
      return "Données indisponibles";
    }

    const voyage = voyages_.find(v => v.voy_id === voyId);
    if (!voyage) {
      return `Voyage ID ${voyId} non trouvé`;
    }

    const bateau = bateaux.find(v => v.bat_id === voyage.bat_id);
    console.log(bateau);
    if (!bateau) {
      return `Bateau pour le voyage ${voyId} non trouvé`;
    }

    return `(${bateau.bat_ref})`;
  }

}

