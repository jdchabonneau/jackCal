import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CompleteTestService } from '../../services/auto-complete-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arrayOfNumbers: number[] = [100, 200, 300, 400, 500];
  constructor(public navCtrl: NavController) {

  }

}
