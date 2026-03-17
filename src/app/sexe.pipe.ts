import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexe'
})
export class SexePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'M.':
        return 'Masculin';
      case 'Mme':
      case 'Mlle':
        return 'Feminin';
      default:
        return 'Aucune Valeur';
    }
  }
}
