export interface VoyageCreate {
    voyId?: number;
    voyDepart? : number;
    voyDestination? : number;
    voyDatedpt?: string;
    voyDatearriv?: string;
    voyEtat: number

    // Ajoutez d'autres champs en fonction de votre modèle backend
}