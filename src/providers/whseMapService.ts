import { Injectable } from "@angular/core";
import { DhiDataProvider } from "./dhi-data/dhi-data";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class WhseMapService {
  private _highlightInfo = null;
  public highlightInfo = new BehaviorSubject(null);
  whseID: number = 2;

  constructor(private dhiDataProvider: DhiDataProvider) {}

  refresh() {
    this.highlightInfo.next(this._highlightInfo);
  }

  highlightCustomer(custID) {
    this.dhiDataProvider
      .getLocationsByCustomer(custID, this.whseID)
      .subscribe(resp => {
        this._highlightInfo = resp.json();
        this.refresh();
      });
  }

  highlightItem(itemID) {
    this.dhiDataProvider
      .getItemLocations(itemID, this.whseID)
      .subscribe(resp => {
        this._highlightInfo = resp.json();
        console.log(111, this._highlightInfo);
        this.refresh();
      });
  }

  highlightAll() {
    this.dhiDataProvider.getOccupiedLocations(this.whseID).subscribe(resp => {
      this._highlightInfo = resp.json();
      console.log(this._highlightInfo);
      console.log(222, this._highlightInfo);
      this.refresh();
    });
  }

  highlightNone() {
    this._highlightInfo = null;
    console.log(333, this._highlightInfo);
    this.refresh();
  }

  lookupObject = null;
  hasItem(aisle: number, section: number): boolean {
    console.log(aisle, section);
    if (this._highlightInfo === null) {
      return false;
    }
    if (this.lookupObject == null){
      this.buildLookupObject();
    }
    return this.lookup(aisle, section);
  }

  lookup(aisleNum, sectionNum) : boolean{
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
