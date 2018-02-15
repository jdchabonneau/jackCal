import { Injectable } from '@angular/core';

import {DhiDataProvider} from './dhi-data/dhi-data'

@Injectable()
export class WhseMapService {

  highlightInfo = null;
  whseID: number = 2;

  constructor(private dhiDataProvider: DhiDataProvider){}

  refresh(){}

  highlightCustomer(custID){
    this.dhiDataProvider.getLocationsByCustomer(custID, this.whseID).subscribe(resp=>{
      this.highlightInfo = resp.json();
      this.refresh();
    })
  }

  highlightItem(itemID){
    this.dhiDataProvider.getItemLocations(itemID, this.whseID).subscribe(resp=>{
      this.highlightInfo = resp.json();
      this.refresh();
    })
  }

  highlightAll(){
    this.dhiDataProvider.getOccupiedLocations(this.whseID).subscribe(resp=>{
      this.highlightInfo = resp.json();
      this.refresh();
    })
  }

  highlightNone(){
    this.highlightInfo = null;
  }
}
