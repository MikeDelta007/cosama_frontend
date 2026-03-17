import { Voyage } from "./Voyage.model";

// DTO pour AchatOnLine
export class AchatOnLine {
    aolId: number;
    allerSimple: boolean;
    allerRetour: boolean;
    codeAchat: string;
    coutAller: number;
    coutRetour: number;
    ifDataDepEqDataRet: boolean;
    numberPassagers: number;
    voyDateDpt: string;  // Format: 'YYYY-MM-DD'
    voyDateRet: string | null;
    voyDepart: number;
    voyDestination1: number;
    voyDestination2: number;
    voyRetour: number;
  
    constructor(init?: Partial<AchatOnLine>) {
      Object.assign(this, init);
    }
  }
  
  // DTO pour Billet
  export class Billet {
    batId: number;
    bilId: number;
    bilCode: string;
    bilDateEmission: string;  // Format: 'YYYY-MM-DD HH:mm:ss'
    bilDateValidite: string;  // Format: 'YYYY-MM-DD HH:mm:ss'
    bilEtat: boolean;
    bilPenalite: number;
    bilPht: number;  // Prix Hors Taxes
    bilPtt: number;  // Prix Total
    bilRemise: number;
    bilReporter: string | null;
    bilTaxe: number;
    civilite: string;
    code_achat: string;
    criteres: Criteres[];
    dateAnnule: string | null;
    dateDebarque: string | null;
    dateEmbarq: string | null;
    dateModif: string | null;
    dateNoShow: string | null;
    dateRembours: string | null;
    enfants: {};
    etatBillets: EtatBillet[];
    firstname: string;
    lastname: string;
    ipVente: string | null;
    motifRembours: string | null;
    mtnRembours: number;
    nationalite: number;
    noShow: number;
    numeropiece: string;
    plcId: number;
    userAnnule: string | null;
    userDebarque: string | null;
    userEmbarq: string | null;
    userModif: string | null;
    userRembours: string | null;
    edit: boolean;
    remb: boolean;
    cancel: boolean;
    rep_sur: boolean;
    voyageDTO: Voyage;
    typePlaceId: number
    typePieceId: number
    natId: number
    bilCheck: boolean;
    
  
    constructor(init?: Partial<Billet>) {
      Object.assign(this, init);
    }
  }
  
  // DTO pour Critères
  export class Criteres {
    crtId: number;
    crt_nom: string;
  
    constructor(init?: Partial<Criteres>) {
      Object.assign(this, init);
    }
  }
  
  // DTO pour Enfants
  export class Enfant {
    enfId: number;
    enfNomComplet: string | null;
    enfAge: number;
    uniteTemps: string | null;
  
    constructor(init?: Partial<Enfant>) {
      Object.assign(this, init);
    }
  }
  
  // DTO pour EtatBillet
  export class EtatBillet {
    ebId: number;
    status: string;
    bilTime: string;  // Format: 'YYYY-MM-DD HH:mm:ss'
    billetId: number;  // Référence à bilId
    color: string;
    icon: string;
  
    constructor(init?: Partial<EtatBillet>) {
      Object.assign(this, init);
    }
  }
  
  // Interface AchatOnLineWithBillets
  export interface AchatOnLineWithBillets {
    achatOnLine: AchatOnLine;
    billets: Billet[];
  }
  