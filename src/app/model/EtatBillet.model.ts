export class EtatBillet {
    public ebId: number;
    public status: string;
    public icon: string;
    public color: string;
    public billetId:number

    constructor(init?: Partial<EtatBillet>) {
        Object.assign(this, init);
    }
    // Ajoutez d'autres champs en fonction de votre modèle backend
}