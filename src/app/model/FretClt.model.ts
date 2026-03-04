export class FretClt
{
    fretClt_id: number;
    fretId: number;
    pax_id: number;
    raisonSociale: string;
    expEqDest: boolean;
    firstname: string;
    lastname: string;
    numeroPiece: string;
    telephone: string;
    email: string;
    fretDTOS: FretDTO;
    ligneFretDTOList: LigneFret[];
    constructor(init?: Partial<FretClt>) 
    {
        Object.assign(this, init);
    }
}

export class FretDTO {
    fretId: number;
    fretCode: string;
    expEqDest: boolean;
    raisonSocialeDest: string;
    firstnameDest: string;
    lastnameDest: string;
    telephoneDest: string;
    emailDest: string;
    fretAcompte: number;
    fretMontant: number;
    fretTva: number;
    fretRemiseTaux: number;
    fretRemise: number;
    fretMontant_ht: number;
    applyTVA: boolean;
    applyPayment: boolean;
    fretDate: string;  // Utilisation de string pour les dates en format ISO
    fretDesc: string;
    usrLogin: string;
    fretPayDate: string;  // Utilisation de string pour les dates en format ISO
    fretPayUsr: string;
    fretEtat: boolean;
    billet : string;
    coutMagasinage: number;
    coutMagasinageRemise: number;
    usrMagasinage: string;
    dateMagasinage: string;  // Utilisation de string pour les dates en format ISO
    usrLoginPayable: string;
    dateEncaissPayable: string;  // Utilisation de string pour les dates en format ISO
    cltcmpt_id: number;
    voy_id: number;
    fretClt_id: number;
    carabane : number;
    motif : string;
    paymentMethod : string;
    ligneFretDTOList: LigneFret[];

    constructor(init?: Partial<FretDTO>) {
        Object.assign(this, init);
    }
  }

  export class LigneFret {
    ligneFret_id : number;
    quantity : number;
    weight : number;
    volume : number;
    tbg_id: number;
    cat_id: number;
    details : string;
    fret_id : number;
  }