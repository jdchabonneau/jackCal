import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-whse-map-find',
  templateUrl: 'whse-map-find.html',
})
export class WhseMapFindPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  btnOKClick() {
    console.log(this);
    this.viewCtrl.dismiss();
  }

  btnCancelClick() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
//    console.log('ionViewDidLoad WhseMapFindPage');
  }

}
