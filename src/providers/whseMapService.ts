import { Injectable } from "@angular/core";
import { DhiDataProvider } from "./dhi-data/dhi-data";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class WhseMapService {
  private _highlightInfo = null;
  public highlightInfo = new BehaviorSubject(null);
  whseID: number = 2;

  constructor(private dhiDataProvider: DhiDataProvider) {}

  notifySuscribersThatSearchResultsHaveChanged() {
    this.lookupObject = null;
    //notify suscribers that search results have changed
    this.highlightInfo.next(this._highlightInfo);
  }

  highlightCustomer(custID) {
    console.log(custID);
    this.dhiDataProvider
      .getLocationsByCustomer(custID, this.whseID)
      .subscribe(resp => {
        this._highlightInfo = resp.json();
        this.notifySuscribersThatSearchResultsHaveChanged();
      });
  }

  highlightItem(itemID) {
    this.dhiDataProvider
      .getItemLocations(this.whseID, itemID)
      .subscribe(resp => {
        this._highlightInfo = resp.json();
        console.log(111, this._highlightInfo);
        this.notifySuscribersThatSearchResultsHaveChanged();
      });
  }

  highlightAll() {
    this.dhiDataProvider.getOccupiedLocations(this.whseID).subscribe(resp => {
      this._highlightInfo = resp.json();
      console.log(this._highlightInfo);
      console.log(222, this._highlightInfo);
      this.notifySuscribersThatSearchResultsHaveChanged();
    });
  }

  highlightNone() {
    this._highlightInfo = null;
    console.log(333, this._highlightInfo);
    this.notifySuscribersThatSearchResultsHaveChanged();
  }

  lookupObject = null;
  hasItem(aisle: number, section: number): boolean {
    //console.log(aisle, section);
    if (this._highlightInfo === null) {
      return false;
    }
    if (this.lookupObject == null){
      this.buildLookupObject();
    }
    return this.lookup(aisle, section);
  }

  getLocationsToHighlight(aisleNum : number, sectionNum: number){
    if(!this._highlightInfo){return [];}
    const retArray: string[] = [];
    this._highlightInfo.forEach(loc => {
      let aisleNumB: number = +loc.locationScan.substring(3, 6);
      let sectionNumB = +loc.locationScan.substring(7, 10);
      if(aisleNum === aisleNumB && sectionNum === sectionNumB){
        retArray.push(loc.locationScan.substring(11, 16));
      }
    });
    return retArray;
  }

  lookup(aisleNum : number, sectionNum: number) : boolean{
    if (!(aisleNum in this.lookupObject)) {
      return false;
    }
    return this.lookupObject[aisleNum].indexOf(sectionNum) > -1;
  }

  buildLookupObject() {
    this.lookupObject = {};
    this._highlightInfo.forEach(loc => {
      let aisleNum: number = +loc.locationScan.substring(3, 6);
      let sectionNum = +loc.locationScan.substring(7, 10);
      if (!(aisleNum in this.lookupObject)) {
        this.lookupObject[aisleNum] = [];
      }
      this.lookupObject[aisleNum].push(sectionNum);
    });
  }
}
