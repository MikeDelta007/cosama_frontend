export class Critere {
      public crtId: number;
      public crt_nom : string;

      constructor(init?: Partial<Critere>) {
        Object.assign(this, init);
    }
    
  }