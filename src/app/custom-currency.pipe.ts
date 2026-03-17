import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) {
      return '0 FCFA';
    }

    // Formate le nombre avec des points pour les milliers et des virgules pour les décimales
    const formattedNumber = value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Ajoute 'FCFA' après le nombre formaté
    return `${formattedNumber} FCFA`;
  }

}
