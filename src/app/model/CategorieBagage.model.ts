import { Critere } from "./Critere.model";
import { TypePlace } from "./TypePlace";

export class CategorieBagage {
    constructor(
    public cat_id: number, 
    public cat_nom: string,
    public cat_prix: number,
    public cat_prix_ttc: number,
    public code : string,
    public place: boolean,
    public bagage: boolean,
    public cat_remise: number,
    public taux_remise: number,
    public cat_forfait: number,
    public cat_taxe: number,
    public frais_mag: number,
    public cat_commission: number,
    public tbg_id: number,
    public criteres : Critere[]
) {}
}
