import { CltDetailsFacture } from "./CltDetailsFacture.model";

export class Facturation {
    public cltfct_id : number;
    public fact_code : string;
    public firstname : string;
    public lastname : string;
    public telephone : string;
    public adresse : string;
    public libelle : string;
    public observation : string;
    public montant_facture : number;
    public tva_facture : number;
    public est_emis : boolean;
    public montant_verse : number;
    public etat_facturation : number;
    public ref_paieFacture : string;
    public reliquat : number;
    
    public clt_tr : number;
    public id_cltcmpt : number;

    public cltDetailsFactures : CltDetailsFacture[];
    
    constructor(init?: Partial<Facturation>) {
        Object.assign(this, init);
    }
    // Ajoutez d'autres champs en fonction de votre modèle backend
}