import { DhiDataProvider } from "./../../providers/dhi-data/dhi-data";
import { Component, Injectable, ViewChild } from "@angular/core";
import { Http } from "@angular/http";
import { NavController, Nav, PopoverController } from "ionic-angular";
import { AutoCompleteService } from "ionic2-auto-complete";
import { WMapPage } from "../w-map/w-map";
import { Age2Page } from "../age2/age2";
import { fabric } from "fabric";
import { AfterViewInit } from "@angular/core/src/metadata/lifecycle_hooks";
//import { CompleteTestService } from '../../../services/a';

@Injectable()
export class CompleteTestService implements AutoCompleteService {
  labelAttribute = "name";

  constructor() {}
  getResults(keyword: string) {
    let a = [
      "apple",
      "articoke",
      "apricot",
      "banana",
      "cookie",
      "coke",
      "corn",
      "cocoa",
      "cream"
    ];

    return a.filter(item =>
      item.toLowerCase().startsWith(keyword.toLowerCase())
    );
  }
}
// constructor(private http:Http) {

// }
// getResults(keyword:string) {
//   return this.http.get("https://restcountries.eu/rest/v1/name/"+keyword)
//     .map(
//       result =>
//       {
//         return result.json()
//           .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) )
//       });
// }
// }

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [CompleteTestService, Http]
})
export class HomePage {
  // implements AfterViewInit {
  // @ViewChild(Nav) nav: Nav;

  // rootPage: string = 'HomePage';
  warehouses;
  currentCustName = "";
  currentItemName = "";

  constructor(
    public navCtrl: NavController,
    private popCtrl: PopoverController,
    public completeTestService: CompleteTestService,
    private dhiDataProvider: DhiDataProvider
  ) {}
  openWMapPage(page) {
    console.log(page);
    this.navCtrl.push(WMapPage);
  }

  openPage(page) {
    this.navCtrl.push(Age2Page);
  }

  getCustomer(event: MouseEvent) {
    const popover = this.popCtrl.create(
      "PopoverSearchPage",
      {
        msg: "Please Enter Customer Name",
        getFunction: this.dhiDataProvider.getCustomers()
      },
      { cssClass: "testPopover" }
    );
    popover.onDidDismiss(d => {
      if (d) {
        if (d.ID === -1) {
          if (d.name != "") {
            // create new user
            this.currentCustName = d.name;
            console.log(d, this.currentCustName);
          } else {
            //clear out user
            this.currentCustName = "-";
            console.log(d, this.currentCustName);
          }
        } else {
          //use an existing user object
          this.currentCustName = d.name;
        }
        console.log(d, this.currentCustName);
      } else {
        //a null return means user hot cancel - do nothing
        console.log(d, 'ESC');
      }
    });
    popover.present({ ev: event });
  }

  getItem(event: MouseEvent) {
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
      //console.log(d, popover);
      this.currentItemName = d ? d.name : "-";
    });
    popover.present({ ev: event });
  }
}
