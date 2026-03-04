export class Payment {
    fretId: number;
    fretAcompte: number;
    fretMontant: number;
    fretTva: number;
    fretRemiseTaux: number;
    fretRemise: number;
    fretMontant_ht: number;
    applyTVA: boolean;
    applyPayment: boolean;
    fretPayUsr: string;
    cltcmpt_id: number;
    paymentMethod: string;

    constructor(init?: Partial<Payment>) {
        Object.assign(this, init);
    }
  }
