export class TypePiece {
    public tpiece_id: number;
    public tpiece_nom: string;
    public dispo: boolean;

    constructor(init?: Partial<TypePiece>) {
        Object.assign(this, init);
    }
    // Ajoutez d'autres champs en fonction de votre modèle backend
}