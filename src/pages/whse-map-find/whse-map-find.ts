import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { NgForm, FormControl, FormGroup } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-whse-map-find",
  templateUrl: "whse-map-find.html"
})
export class WhseMapFindPage {
  searchType;
  langForm;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.langForm = new FormGroup({
      langs: new FormControl()
      //      "langs": new FormControl({value: 'rust', disabled: false})
    });
  }

  btnOKClick() {
    if (this.langForm.value.langs == null) {
      this.langForm.value.langs = "customer";
    }

    console.log("jdc", this.langForm.value);
    switch (this.langForm.value.langs) {
      case "customer":
        this.viewCtrl.dismiss({ action: "customer", id: 1635 });
        break;
      case "item":
        this.viewCtrl.dismiss({ action: "item", id: 16111 });
        break;
      case "all":
        this.viewCtrl.dismiss({ action: "all" });
        break;
      case "nothing":
        this.viewCtrl.dismiss({ action: "nothing" });
        break;
    }
  }

  btnCancelClick() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    //    console.log('ionViewDidLoad WhseMapFindPage');
  }

  onFindBy(form: NgForm) {}
}
