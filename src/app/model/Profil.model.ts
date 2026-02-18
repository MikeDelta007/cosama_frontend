export class Profil {
    public prfl_id: number;
    public prfl_libelle: string;
  
    public actif: boolean;
    public add_billet: boolean;
    public add_check_billet: boolean;
    public add_clt_compte: boolean;
    public add_embarqment: boolean;
    public add_facture: boolean;
    public add_fret: boolean;
    public add_nav_data: boolean;
    public add_passager: boolean;
    public add_reglement: boolean;
    public add_voyage: boolean;
    public bloq_places: boolean;
    public cancel_billet: boolean;
    public cancel_fret: boolean;
    public del_fret_details: boolean;
    public cancel_voyage: boolean;
    public check_fret: boolean;
    public del_clt_compte: boolean;
    public del_facture: boolean;
    public del_passager: boolean;
    public del_reglement: boolean;
    public do_remboursement: boolean;
    public do_rep_surclassment: boolean;
    public edit_billet: boolean;
    public edit_clt_compte: boolean;
    public edit_facture: boolean;
    public edit_fret: boolean;
    public edit_nav_data: boolean;
    public edit_param: boolean;
    public edit_passager: boolean;
    public edit_reglement: boolean;
    public edit_voyage: boolean;
    public edition: boolean;
    public paye_fret: boolean;
    public plan_voyage: boolean;
    public pointer_voyage: boolean;
    public rechercher: boolean;
    public valide: boolean;
    public view_etat: boolean;
    public view_stat: boolean;
    public view_voyage: boolean;
    public reclamation: boolean;
    public campagne: boolean;
  
    public utilisateurs: Utilisateur[];
  }
  
  export class Utilisateur {
    public id: number;
    public nom: string;
    public prenom: string;
    public email: string;
  }
  