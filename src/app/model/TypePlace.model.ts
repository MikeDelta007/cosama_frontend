export class TypePlace {
    public tplc_id: number;
    public tplc_nom: string;

    constructor(init?: Partial<TypePlace>) {
        Object.assign(this, init);
    }
    // Ajoutez d'autres champs en fonction de votre modèle backend
}