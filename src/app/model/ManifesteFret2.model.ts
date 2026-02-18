export class ManifesteFret2 {
    constructor(
    public fret_code : string,
    public fret_montant_ht : number,
    public fret_montant : number,
    public fret_tva : number,
    public fret_date : Date,
    public fret_pay_date : Date,
    public usr_login : string,
    public fret_pay_usr : string,
    public firstname_dest : string,
    public lastname_dest : string,
    public telephone_dest : string,
    public fret_acompte : number,
    public raison_social : string,
    public contact : string,
    public firstname : string,
    public lastname : string,
    public telephone : string,
    public details : string,
    public quantity : number,
    public volume : number,
    public weight : number,
    public tbg_nom : string
    
) {}
}