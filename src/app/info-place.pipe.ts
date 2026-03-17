import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'infoPlace'
})
export class InfoPlacePipe implements PipeTransform {

  transform(plc_id: number, places: any[]): string {
    if (plc_id === 0 || !places || places.length === 0) 
    {
      return "";
    }

    const p = places.find(p => p.plc_id === plc_id);
    if (!p) 
    {
      return "";
    }
    else
    {
      return p.plc_code;
    }
  }

}
