import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-w-map',
  templateUrl: 'w-map.html',
})
export class WMapPage {
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  lSection;
  rSection;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
 //activates the menu with the coordinates
 onrightClick(event){
  this.contextmenuX=event.clientX
  this.contextmenuY=event.clientY
  this.contextmenu=true;
}
//disables the menu
disableContextMenu(){
 this.contextmenu= false;
}

  lSectionChanged(whseSection) {
    this.lSection = whseSection;
  }
  
  rSectionChanged(whseSection) {
    this.rSection = whseSection;
  }
}
