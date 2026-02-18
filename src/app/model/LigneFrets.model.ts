export class LigneFrets {
    ligneFretId: number;
    quantity: number;
    weight: number;
    volume: number;
    details: string;
  
    fretId: number;
    fretCode: string;
    raisonSocialeDest: string;
    firstnameDest: string;
    lastnameDest: string;
    telephoneDest: string;
    emailDest: string;
    expEqDest: boolean;
    fretAcompte: number;
    fretMontant: number;
    fretTva: number;
    fretRemiseTaux: number;
    fretRemise: number;
    fretMontantHt: number;
    applyTVA: boolean;
    applyPayment: boolean;
    billet: string;
    fretDate: string;  
    fretDesc: string;
    usrLogin: string;
    fretPayDate: string | null; 
    fretPayUsr: string;
    fretEtat: boolean;
    coutMagasinage: number;
    coutMagasinageRemise: number;
    usrMagasinage: string;
    dateMagasinage: string | null;
    usrLoginPayable: string;
    dateEncaissPayable: string | null;
    voyId: number;

  
    fretCltId: number;
    raisonSociale: string;
    clientExpEqDest: boolean;
    clientFirstname: string;
    clientLastname: string;
    numeroPiece: string;
    clientTelephone: string;
    clientEmail: string;
  
    constructor(data?: Partial<LigneFrets>) {
      this.ligneFretId = data?.ligneFretId || 0;
      this.quantity = data?.quantity || 0;
      this.weight = data?.weight || 0;
      this.volume = data?.volume || 0;
      this.details = data?.details || '';
  
      this.fretId = data?.fretId || 0;
      this.fretCode = data?.fretCode || '';
      this.raisonSocialeDest = data?.raisonSocialeDest || '';
      this.firstnameDest = data?.firstnameDest || '';
      this.lastnameDest = data?.lastnameDest || '';
      this.telephoneDest = data?.telephoneDest || '';
      this.emailDest = data?.emailDest || '';
      this.expEqDest = data?.expEqDest || false;
      this.fretAcompte = data?.fretAcompte || 0;
      this.fretMontant = data?.fretMontant || 0;
      this.fretTva = data?.fretTva || 0;
      this.fretRemiseTaux = data?.fretRemiseTaux || 0;
      this.fretRemise = data?.fretRemise || 0;
      this.fretMontantHt = data?.fretMontantHt || 0;
      this.applyTVA = data?.applyTVA || false;
      this.applyPayment = data?.applyPayment || false;
      this.billet = data?.billet || '';
      this.fretDate = data?.fretDate || '';
      this.fretDesc = data?.fretDesc || '';
      this.usrLogin = data?.usrLogin || '';
      this.fretPayDate = data?.fretPayDate || null;
      this.fretPayUsr = data?.fretPayUsr || '';
      this.fretEtat = data?.fretEtat || false;
      this.coutMagasinage = data?.coutMagasinage || 0;
      this.coutMagasinageRemise = data?.coutMagasinageRemise || 0;
      this.usrMagasinage = data?.usrMagasinage || '';
      this.dateMagasinage = data?.dateMagasinage || null;
      this.usrLoginPayable = data?.usrLoginPayable || '';
      this.dateEncaissPayable = data?.dateEncaissPayable || null;
  
      this.fretCltId = data?.fretCltId || 0;
      this.raisonSociale = data?.raisonSociale || '';
      this.clientExpEqDest = data?.clientExpEqDest || false;
      this.clientFirstname = data?.clientFirstname || '';
      this.clientLastname = data?.clientLastname || '';
      this.numeroPiece = data?.numeroPiece || '';
      this.clientTelephone = data?.clientTelephone || '';
      this.clientEmail = data?.clientEmail || '';
    }
  }
  