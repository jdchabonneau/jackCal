import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController,
  ViewController
} from "ionic-angular";
import { NgForm, FormControl, FormGroup } from "@angular/forms";
import { DhiDataProvider } from "../../providers/dhi-data/dhi-data";

@IonicPage()
@Component({
  selector: "page-whse-map-find",
  templateUrl: "whse-map-find.html"
})
export class WhseMapFindPage {
  searchType;
  langForm;
  show = true;
  type = "nothing";
  customers;
  customersSave;
  showCustomers = false;
  currentCust = null;
  currentItem = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popCtrl: PopoverController,
    private dhiDataProvider: DhiDataProvider,
    public viewCtrl: ViewController
  ) {
    dhiDataProvider.getCustomers().subscribe(resp => {
      this.customersSave = resp.json();
    });

    this.langForm = new FormGroup({
      langs: new FormControl()
      //      "langs": new FormControl({value: 'rust', disabled: false})
    });
  }

  radioChecked() {
    if (this.type === "customer") {
      const popover = this.popCtrl.create(
        "PopoverSearchPage",
        {
          msg: "Please Enter Customer Name",
          getFunction: this.dhiDataProvider.getCustomers()
        },
        { cssClass: "testPopover" }
      );
      popover.onDidDismiss(d => {
        //console.log(d, popover);
        if(d){
        this.currentCust = d;
        }else{
          this.type = "nothing";
        }
      });
      popover.present({ ev: event });
    } else if (this.type === "item") {
      const popover = this.popCtrl.create(
        "PopoverSearchPage",
        {
          msg: "Please Enter Item Name",
          getFunction: this.dhiDataProvider.getItemTypes3(),
          nameField: "type"
        },
        { cssClass: "testPopover" }
      );
      popover.onDidDismiss(d => {
        if(d){
          this.currentItem = d;
          }else{
            this.type = "nothing";
          }
        });
      popover.present({ ev: event });
    }
  }

  getItems(event) {}

  getCustomers(ev) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      // Filter the items
      this.customers = this.customersSave.filter(customer => {
        return (
          customer.isActive &&
          customer.name.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
      console.log(this.customers);

      // Show the results
      this.showCustomers = true;
    } else {
      // hide the results when the query is empty
      this.showCustomers = false;
    }
  }

  btnOKClick() {
    if (this.langForm.value.langs == null) {
      this.langForm.value.langs = "customer";
    }

    console.log("jdc", this.langForm.value);
    switch (this.langForm.value.langs) {
      case "customer":
      console.log(this);
        this.viewCtrl.dismiss({ action: "customer", id: this.currentCust.ID });
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
