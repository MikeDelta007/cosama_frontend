import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profil'
})
export class ProfilPipe implements PipeTransform {

  transform(prfl_id: number, profils: any[]): string {
    if (prfl_id === 0 || !profils || profils.length === 0) 
    {
      return "";
    }

    const z = profils.find(y => y.prfl_id === prfl_id);
    if (!z) 
    {
      return "";
    }
    else
    {
      return z.prfl_libelle;
    }
  }

}