import { DhiDataProvider } from "./../../providers/dhi-data/dhi-data";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";
import { ViewChild} from  "@angular/core";
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewController: ViewController,
    private dhiProvider: DhiDataProvider
  ) {
    navParams.data.getFunction.subscribe(resp => {
      this.entitiesSave = resp.json();
      if(navParams.data.nameField){
        this.entitiesSave.forEach(element => {
          element.name = element[navParams.data.nameField];
        });
      }
    });
    this.msg = navParams.data.msg;
  }
  //@ViewChild('#mainSearchbar') searchBar;

   ionViewDidEnter() {
    let elem = <HTMLInputElement>document.querySelector('.jdc-searchbar input');
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

  getEntities(ev) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (this.entitiesSave && val && val.trim() != "") {
      // Filter the items
      this.entities = this.entitiesSave.filter(entity => {
        return (
          //customer.isActive &&
          entity.name.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
      console.log(this.entities, this.entitiesSave);
    } else {
      // hide the results when the query is empty
      this.entities = null;
    }
  }

  onClick(entity){
      console.log(entity);
      this.selectedItem = entity;
      this.selectedItemName = entity.name;
      this.viewController.dismiss(entity);
    }

}
