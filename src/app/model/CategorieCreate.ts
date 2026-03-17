import { Critere } from "./Critere.model";
import { TypeBagage } from "./TypeBagage";
import { TypePlace } from "./TypePlace";

export interface CategorieCreate {
    catId?: number;
    catNom?: string;
    catPrix?: number;
    code : string;
    catPrixTtc?: number;
    place?: boolean;
    bagage?: boolean;
    catRemise?: number;
    tauxRemise?: number;
    catForfait?: number;
    catTaxe?: number;
    fraisMag?: number;
    catCommission?: number;
    tplcId?: number; // Optionnel pour correspondre à la relation @ManyToOne
    typeBagage?: number; // Optionnel pour correspondre à la relation @ManyToOne
    criteres?: Critere[]; // Optionnel pour correspondre à la relation @ManyToMany
}