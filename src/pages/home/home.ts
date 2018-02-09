import { DhiDataProvider } from './../../providers/dhi-data/dhi-data';
import { Component, Injectable, ViewChild} from '@angular/core';
import { Http} from '@angular/http';
import { NavController, Nav } from 'ionic-angular';
import {AutoCompleteService} from 'ionic2-auto-complete';
import { WMapPage } from '../w-map/w-map';
import { Age2Page } from '../age2/age2';
import { fabric } from 'fabric'
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
//import { CompleteTestService } from '../../../services/a';

@Injectable()
export class CompleteTestService implements AutoCompleteService {
  labelAttribute = "name";

  constructor() {
  }
  getResults(keyword:string) {
    let a = ['apple', 'articoke', 'apricot', 'banana', 'cookie', 'coke', 'corn', 'cocoa', 'cream' ];

          return a
            .filter(item => item.toLowerCase().startsWith(keyword.toLowerCase()) );
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
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CompleteTestService, Http]
})
export class HomePage {// implements AfterViewInit {
  // @ViewChild(Nav) nav: Nav;

  // rootPage: string = 'HomePage';
warehouses;
  constructor(public navCtrl: NavController,
    public completeTestService: CompleteTestService,
    private dhiDataPrvider: DhiDataProvider
  ) {
        //this.dhiDataPrvider.getCustomers();
        this.dhiDataPrvider.getAllShelvesInSection().subscribe(
          resp=> {
              let w = resp.json();
             // w.map(w=>w.selected= w.ID == 2? true : false);
             // this.warehouses = w;
              console.log(w);
          })



      //console.log(fabric.version);
    console.log(11, fabric.version);
  }
  openWMapPage(page){
    this.navCtrl.push(WMapPage);
  }

  openPage(page) {
    this.navCtrl.push(Age2Page)
  }
}

