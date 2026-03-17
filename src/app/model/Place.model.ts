import { Bateau } from "./Bateau.model";
import { Niveau } from "./Niveau.model";
import { TypePlace } from "./TypePlace.model";

export class Place 
{
    constructor(
      public plc_id : number,
      public plc_code : string,
      public plc_etat : boolean,
      public sexe : string,
      public niv_id : number,
      public tplc_id : number,
      public bat_id : number,
      public situation : string,
      public is_carabane : boolean,
      public typePlace : TypePlace,
      public niveau : Niveau,
      public bateau : Bateau

    ) {}
}