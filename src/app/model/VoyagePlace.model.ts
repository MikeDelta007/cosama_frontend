export class VoyagePlace {
    public voy_plc_id: number;
    public voy_id: number;
    public code_billet: string;
    public plc_id: string;
    public bat_id: string;
    public vplc_etat: number;
    public in_board:number

    constructor(init?: Partial<VoyagePlace>) {
        Object.assign(this, init);
    }
    // Ajoutez d'autres champs en fonction de votre modèle backend
}