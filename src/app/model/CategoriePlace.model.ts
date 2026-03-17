import { Critere } from "./Critere.model";
import { TypePlace } from "./TypePlace";

export class CategoriePlace {
    constructor(
    public cat_id: number, 
    public cat_nom: string,
    public cat_prix: number,
    public cat_prix_ttc: number,
    public place: boolean,
    public code : string,
    public bagage: boolean,
    public cat_remise: number,
    public taux_remise: number,
    public cat_forfait: number,
    public cat_taxe: number,
    public frais_mag: number,
    public cat_commission: number,
    public tplc_id: number,
    public criteres : Critere[]
) {}
}

export class Tarif {
    constructor(
      public catPrix: number,
      public catRemise: number,
      public catTaxe: number,
      public prixCatAvecRemise: number,
      public pttc: number
    ) {}
  }
