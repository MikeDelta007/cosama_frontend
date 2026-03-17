import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'niveau'
})
export class NiveauPipe implements PipeTransform {

  transform(niv_id: number, niveaux: any[]): string {
    if (niv_id === 0 || !niveaux || niveaux.length === 0) 
    {
      return "";
    }

    const nv = niveaux.find(tp => tp.niv_id === niv_id);
    if (!nv) 
    {
      return "";
    }
    else
    {
      return nv.niv_nom;
    }
  }

}
