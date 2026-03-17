export class Annulation {
    fretId: number;
    motif : string;

    constructor(init?: Partial<Annulation>) 
    {
        Object.assign(this, init);
    }
  }