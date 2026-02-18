export interface Place 
{
  plcId: number;
  plcCode: string;
  alreadyInVoyage: boolean; // Nouvelle propriété pour indiquer la présence dans VoyagePlace
  vplstate : number

}
  
export interface Section {
  nivNom: string;
  places: Place[];
}