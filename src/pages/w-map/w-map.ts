import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-w-map',
  templateUrl: 'w-map.html',
})
export class WMapPage {

  lSection;
  rSection;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  lSectionChanged(whseSection) {
    this.lSection = whseSection;
  }
  
  rSectionChanged(whseSection) {
    this.rSection = whseSection;
  }
}
