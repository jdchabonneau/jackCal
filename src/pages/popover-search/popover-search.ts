import { DhiDataProvider } from "./../../providers/dhi-data/dhi-data";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { ViewChild } from "@angular/core";
@IonicPage()
@Component({
  selector: "page-popover-search",
  templateUrl: "popover-search.html"
})
export class PopoverSearchPage {
  searchType;
  langForm;
  show = true;
  entities;
  entitiesSave;
  msg = "";
  public selectedItem;
  selectedItemName = "";
  acceptUnknownItem = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewController: ViewController,
    private dhiProvider: DhiDataProvider
  ) {
    navParams.data.getFunction.subscribe(resp => {
      this.entitiesSave = resp.json();
      if (navParams.data.nameField) {
        this.entitiesSave.forEach(element => {
          element.name = element[navParams.data.nameField];
        });
      }
    });
    this.msg = navParams.data.msg;
  }
  //@ViewChild('#mainSearchbar') searchBar;

  ionViewDidEnter() {
    let elem = <HTMLInputElement>document.querySelector(".jdc-searchbar input");
    console.log(elem);
    if (elem) {
      // elem.focus();
      //}
      setTimeout(() => {
        elem.focus();
      }, 150);
    }
  }

  ionViewDidLoad() {}

  esc(q: string){
    //The 'Escape' key was pressed
    this.onClick(null);
  }
  search(q: string) {
    console.log(62, q);
    //The 'Enter' key was pressed
    if (q === "") {
      //nothing is enterred
      this.onClick({name: '', id: -1});
      console.log(67, q);
      return;
    } else if (this.selectedItem) {
      //user chose existing item
      this.onClick(this.selectedItem);
      console.log(72, q);
      return;
    }
    if (this.acceptUnknownItem) {
      //user entered unknown item, and that's allowed
      this.selectedItemName = q;
      this.selectedItem = {name: q, id: -1};
      this.viewController.dismiss(this.selectedItem);
      console.log(77, q);
      return;
    } else {
      //user enterred unknown item, and that's not allowed
      //indicate an error
      console.log(82, q);
    }
  }

  getEntities(ev) {
    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(ev, val);

    // if the value is an empty string don't filter the items
    if (this.entitiesSave && val && val.trim() != "") {
      // Filter the items
      this.entities = this.entitiesSave.filter(entity => {
        return (
          //customer.isActive &&
          entity.name.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    } else {
      // hide the results when the query is empty
      this.entities = null;
    }
  }

  onClick(entity) {
    console.log(entity);
    this.selectedItem = entity;
    this.selectedItemName = entity ? entity.name : "";
    this.viewController.dismiss(entity);
  }
}
