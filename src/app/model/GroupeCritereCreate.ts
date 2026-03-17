import { Critere } from "./Critere.model";

export interface GroupeCritereCreate
{
    grpcrtId? : number, 
    grpcrtNom? : string,
    criteres? : Critere[],
}
