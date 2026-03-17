export class VoyageO {
    voy_id: number;
    voy_depart: number;
    voy_destination: number;
    code_voyage: string;
    voy_datedpt: string;
    voy_datearriv: string | null;
    voy_etat: number;
    faits_depats: string | null;
    faits_arrives: string | null;
    observation: string | null;
    commentaire: string | null;
    debut_embarq: string | null;
    fin_embarq: string | null;
    debut_debarq: string | null;
    fin_debarq: string | null;
    bat_markeur: string | null;
    bat_id: number;

    constructor(init?: Partial<VoyageO>) {
        Object.assign(this, init);
    }
    // Ajoutez d'autres champs en fonction de votre modèle backend
  }
  