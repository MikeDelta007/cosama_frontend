import { Critere } from "./Critere.model";

export class GroupeCritere {
    constructor(
    public grpcrt_id : number, 
    public grpcrt_nom : string,
    public on_line : number,
    public criteres : Critere[],
) {}
}
