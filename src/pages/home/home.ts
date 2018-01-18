import { Component, Injectable, ViewChild} from '@angular/core';
import { Http} from '@angular/http';
import { NavController, Nav } from 'ionic-angular';
import {AutoCompleteService} from 'ionic2-auto-complete';
import { Age2Page } from '../age2/age2';
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
export class HomePage {
  // @ViewChild(Nav) nav: Nav;

  // rootPage: string = 'HomePage';

  constructor(public navCtrl: NavController, public completeTestService: CompleteTestService) {

  }

  openPage(page) {
    this.navCtrl.push(Age2Page)
  }
}

