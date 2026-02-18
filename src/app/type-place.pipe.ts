import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typePlace'
})
export class TypePlacePipe implements PipeTransform {

  
  transform(tplc_id: number, typePlaces : any[]): string {
    if (tplc_id === 0 || !typePlaces || typePlaces.length === 0) 
    {
      return "";
    }

    const tpl = typePlaces.find(tpl => tpl.tplc_id === tplc_id);
    if (!tpl) 
    {
      return "";
    }
    else
    {
      return tpl.tplc_nom;
    }
  }

}
