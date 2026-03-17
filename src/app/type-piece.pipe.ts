import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typePiece'
})
export class TypePiecePipe implements PipeTransform {

  transform(tpiece_id: number, typePieces: any[]): string {
    if (tpiece_id === 0 || !typePieces || typePieces.length === 0) 
    {
      return "";
    }

    const tp = typePieces.find(tp => tp.tpiece_id === tpiece_id);
    if (!tp) 
    {
      return "";
    }
    else
    {
      return tp.tpiece_nom;
    }
  }

}
