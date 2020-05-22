import { ConvertPropertyBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';

export class TranscriptDefinition{
  displayName:string;
  description:string;
  contentUrls:string[];
  contentContainerUrl:string;
  locale:string;
  model:ModelIdentity ;
  properties:TranscriptProperty
  public constructor(){
    //set defaults
    this.properties = new TranscriptProperty();
    this.locale = "en-US"
    this.properties.profanityFilterMode = "Masked"
    this.properties.punctuationMode = "DictatedAndAutomatic"
    this.properties.timeToLiveDays = 30;
  }
}
export class ModelIdentity{
  self:string
}
export class TranscriptProperty{
  private _addDiarization:boolean = false
  private _addWordLevelTimestamps = false;
  timeToLiveDays:number

profanityFilterMode:ProfanityFilterMode;
punctuationMode:PunctuationMode;
get addWordLevelTimestamps():boolean{
  return this._addWordLevelTimestamps;
}
set addWordLevelTimestamps(value:boolean){
  this._addWordLevelTimestamps = value;
  if(!value){
    this.addDiarization = false;
  }
}

get addDiarization():boolean{
 return this._addDiarization;
}
set addDiarization(value:boolean){
  this._addDiarization = value;
  if(value){
    this.addWordLevelTimestamps = true;
  }
}
TranscriptionResultsContainerUrl:string
toJSON() {
  // copy all fields from `this` to an empty object and return in
  return Object.assign({}, this, {
    // convert fields that need converting
    diarizationEnabled: this._addDiarization,
    wordLevelTimestampsEnabled: this._addWordLevelTimestamps,
    timeToLive:`P${this.timeToLiveDays}D`
  });
}
}
export type PunctuationMode = "DictatedAndAutomatic"|"Automatic"|"Dictated"|"None"

export type ProfanityFilterMode = "Masked"|"None"|"Removed"|"Tagged"

export const AllPunctuationMode = ["DictatedAndAutomatic","Automatic","Dictated","None"]
export const AllProfanityFilterMode = ["Masked","None","Removed","Tagged"]
