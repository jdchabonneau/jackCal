import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-whse-map-find',
  templateUrl: 'whse-map-find.html',
})
export class WhseMapFindPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  btnOKClick() {
//this.viewCtrl.dismiss({action: 'customer', id: 1635});
//this.viewCtrl.dismiss({action: 'none'});
this.viewCtrl.dismiss({action: 'all'});
//this.viewCtrl.dismiss({action: 'item', id: 16111});
}

  btnCancelClick() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
//    console.log('ionViewDidLoad WhseMapFindPage');
  }

  onFindBy(form: NgForm) {
    console.log(form);
  }

}
