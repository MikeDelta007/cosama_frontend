export class CltDetailsFacture {
    constructor(
      public lignefct_id : number,
      public description_ligne : string,
      public fret_id: number,
      public etat_ligne: boolean,
      public cltfct_id: number,
      public montant_ligne: number,
      public montant_ligne_tva: number
    ) {}
  }