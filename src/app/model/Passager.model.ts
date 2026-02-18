import { Billet } from "./Billet.model";

export class Passager {
    public numBillet: string;
    public numeropiece: string;
    public civilite: string;
    public lastName: string;
    public firstName: string;
    public tPiece: number;
    //dateNaiss: string;
    public phone: string;
    public mail: string;
    //adresse: string;
    //natId: number;

    constructor(init?: Partial<Passager>) {
        Object.assign(this, init);
    }
}

export class PassagerSimple {
    paxId: number;
    numeropiece: string;
    civilite: string;
    lastName: string;
    firstName: string;
    //dateNaiss: string;
    phone: string;
    //mail: string;
    //adresse: string;
    natId: number;
    typePiece : number;

    constructor(init?: Partial<PassagerSimple>) {
        Object.assign(this, init);
    }
}

export class PassagerWithBillet {
    paxId: number;
    numeropiece: string;
    civilite: string;
    lastName: string;
    firstName: string;
    dateNaiss: string;
    phone: string;
    mail: string;
    adresse: string;
    natId: number;
    billetsDTOS: Billet

    constructor(init?: Partial<PassagerWithBillet>) {
        Object.assign(this, init);
    }
}


// passager-with-billet.dto.ts
export class PassagerWithBilletDTO {
    paxId: number;
    numeropiece: string;
    civilite: string;
    lastName: string;
    firstName: string;
    //dateNaiss: string;
    phone: string;
    //mail: string;
    //adresse: string;
    natId: number;
    typePiece : number;
    typePlace : number;
    idPlace : number;
    nomPlace : string;
    valCheck : number;
    valCheck1 : number;
    valCheck2 : number;
    valCheck3 : number;
    valCheck4 : number;
    prixVoiture: number;
    billetsDTOS: BilletDTO

    constructor(init?: Partial<PassagerWithBilletDTO>) {
        Object.assign(this, init);
    }
}

// billet.dto.ts
export class BilletDTO {
    bilCode: number;
    ipVente: string;
    firstname: string;
    lastname: string;
    numeropiece: string;
    civilite: string;
    bilPht: number;
    bilPtt: number;
    bilTaxe: number;
    bilRemise: number;
    bilDateEmission: string;
    bilDateValidite: string;
    bilEtat: string;
    bilPenalite: number;
    bilReporter: string;
    noShow: number;
    dateNoShow: string;
    userModif: string;
    dateModif: string;
    userAnnule: string;
    dateAnnule: string;
    userEmbarq: string;
    dateEmbarq: string;
    userDebarque: string;
    dateDebarque: string;
    userRembours: string;
    dateRembours: string;
    mtnRembours: number;
    motifRembours: string;
    typePieceId: number;
    typePlaceId: number;
    clientEnCompteId: number;
    passagerId: number;
    voyageId: number;
    batId: number;
    plcId: number;
    natId: number;
    critereIds: CritereDTO[];
    enfantDTOS: EnfantDTO;
    
    constructor(init?: Partial<BilletDTO>) {
        Object.assign(this, init);
    }
}

// critere.dto.ts
export class CritereDTO {
    crtId: number;
    crt_nom: string;
}

// enfant.dto.ts
export class EnfantDTO {
    enfNomComplet: string;
    enfAge: number;
    uniteTemps: string;
    bil_id: number;
}