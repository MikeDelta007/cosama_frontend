import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agence'
})
export class AgencePipe implements PipeTransform {

  transform(agc_id: number, agences: any[]): string {
    if (agc_id === 0 || !agences || agences.length === 0) 
    {
      return "";
    }

    const a = agences.find(x => x.agc_id === agc_id);
    if (!a) 
    {
      return "";
    }
    else
    {
      return a.sigle;
    }
  }

}
