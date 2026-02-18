export class Voyage {
    public voy_id: number;
    public voy_depart: number;
    public voy_destination: number;
    public voy_datedpt: string;
    public voy_datearriv: string;
    public voy_etat: number;
    public bat_id:number;
    public motif : string

    constructor(init?: Partial<Voyage>) {
        Object.assign(this, init);
    }
    // Ajoutez d'autres champs en fonction de votre modèle backend
}