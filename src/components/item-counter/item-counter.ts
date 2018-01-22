import { Component, Input } from '@angular/core';

@Component({
  selector: 'item-counter',
  templateUrl: 'item-counter.html'
})
export class ItemCounterComponent {

  numItems = 0;
  numMUs = 0;
  numSUs = 0;

  @Input() itemsPerMU = 5;
  @Input() itemsPerSU = 0;

  constructor() {
  }
  
  selectAllContent($event) {
    $event.target.select();
  }

  MUsOrSUsChanged($event, isSUs :boolean){
    if(isSUs){
      this.numSUs += $event.key;
    }else{
      this.numMUs += $event.key;
    }
    event.preventDefault();
    $event.cancelBubble = true;
    console.log(this, $event);
    this.numMUs = Math.floor(this.numMUs);
    this.numSUs = Math.floor(this.numSUs);
    if (this.numMUs < 0 || this.numSUs < 0){
      this.numItems = this.numMUs = this.numSUs = 0;
      return;
    }
    let j = Math.floor((this.numSUs * this.itemsPerSU)/this.itemsPerMU);
    this.numSUs -= j * this.itemsPerMU;
    this.numMUs += j;
    this.numItems = this.numMUs * this.itemsPerMU + this.numSUs * this.itemsPerSU
  }

  numItemsBlur(){
    this.numItems = Math.floor(this.numItems);
    if (this.numItems < 1){
      this.numItems = this.numMUs = this.numSUs = 0;
      return;
    }
    this.numMUs = Math.floor(this.numItems/this.itemsPerMU);
    let remainder = this.numItems - (this.numMUs * this.itemsPerMU);
    if (remainder !== 0){
      if((remainder % this.itemsPerSU) === 0){
        this.numSUs = remainder / this.itemsPerSU;
      }
    }else{
      this.numSUs = 0;
    }    
  }
}
