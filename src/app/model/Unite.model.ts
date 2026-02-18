export class Unite {
    public unite_id: number;
    public unite_nom : string;
    public unite_code : string;
    public vol_id : number;

    constructor(init?: Partial<Unite>) {
      Object.assign(this, init);
  }
  
}