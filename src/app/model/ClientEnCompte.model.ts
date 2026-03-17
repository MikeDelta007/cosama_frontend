export class ClientEnCompte {
    constructor(
        public cltcmptId: number,                   // Identifiant du client
        public raisonSocial: string,                // Raison sociale
        public firstnameContact : string | null,    // Prénom du contact (optionnel)
        public lastnameContact : string | null,     // Nom de famille du contact (optionnel)
        public contact : string | null,             // Contact (optionnel)
        public mail : string | null,                // Email (optionnel)
        public cptgen_compta : string | null,       // Compte général comptable (optionnel)
        public cpttiers_compta : string | null,     // Compte tiers comptable (optionnel)
        public soldeCompte : number,                 // Solde du compte
        public plafond: number,                     // Plafond
        public billets : any[],                      // Liste des billets (vous pouvez définir un modèle spécifique si nécessaire)
        public frets : any[],                        // Liste des frets
        public logsSoldes : any[],                   // Liste des logs de soldes
        public cltFactures : any[],                  // Liste des factures
        public modergltId : number,    // Mode de règlement (optionnel)
) {}
}
