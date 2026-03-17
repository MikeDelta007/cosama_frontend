import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nationality'
})
export class NationalityPipe implements PipeTransform {
  transform(natId: number, nationalities: any[]): string {
    if (natId === 0 || !nationalities || nationalities.length === 0) 
    {
      return "";
    }

    const nat = nationalities.find(n => n.natId === natId);
    if (!nat) 
    {
      return "";
    }
    else
    {
      return nat.name;
    }
  }
}
