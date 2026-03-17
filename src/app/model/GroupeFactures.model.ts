import { Facturation } from "./Facturation.model";

export class GroupeFacture {
    constructor(
    public id_cltcmpt : number,
    public raison_social : string,
    public factures : Facturation[],
) {}
}
