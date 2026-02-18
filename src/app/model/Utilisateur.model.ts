export class Utilisateur {
    public usr_id: number;
    public usr_login : string;
    public usr_firstname : string;
    public usr_lastname : string;
    public usr_password : string;
    public usr_desc : string;
    public usr_etat : boolean;
    public agc_id : number;
    public prfl_id : number
    
    constructor(init?: Partial<Utilisateur>) {
      Object.assign(this, init);
  }
  
}