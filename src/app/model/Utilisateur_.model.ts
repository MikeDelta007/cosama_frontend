export class UtilisateurBis {
    public usr_id: number;
    public usr_login : string;
    public usr_firstname : string;
    public usr_lastname : string;
    //public usr_password : string;
    public usr_desc : string;
    public usr_etat : boolean;
    public agc_id : number;
    public prfl_id : number;
    public usr_activ : string;

    constructor(init?: Partial<UtilisateurBis>) {
      Object.assign(this, init);
  }
  
}