export class Ville {
    public vil_id: number;
    public vil_code : string;
    public vil_nom : string;

    constructor(init?: Partial<Ville>) {
      Object.assign(this, init);
  }
  
}