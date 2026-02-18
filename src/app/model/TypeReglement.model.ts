export class TypeReglement {
    public typerglt_id: number;
    public libelle_typeReglm : string;

    constructor(init?: Partial<TypeReglement>) {
      Object.assign(this, init);
  }
  
}