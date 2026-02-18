import { Agence } from "./Agence.model";

export class Bateau {
      //public bat_photo_name: string;
      public bat_id: number;
      public bat_ref : string;
      public bat_nom : string;
      public bat_desc : string;
      public bat_nbplace : number;
      public bat_etat : boolean;
      public imageUrl : string;
      public bat_markeur : string;
      public agc_id: number;
      public Agence : Agence

      constructor(init?: Partial<Bateau>) {
        Object.assign(this, init);
    }
    
  }