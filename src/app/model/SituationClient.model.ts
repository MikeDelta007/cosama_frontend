export class SituationClient {
    constructor(
    public cltcmpt_id : number,
    public raison_social : string,
    public annee : number,
    public mois : string,
    public num_mois : number,
    public total_ht : number,
    public total_tva : number,
    public total_ttc : number,
    public total_verse : number,
    public total_reliquat : number
) {}
}
