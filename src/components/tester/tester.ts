import { Component } from '@angular/core';


@Component({
  selector: 'tester',
  templateUrl: 'tester.html'
})
export class TesterComponent {

  isVisibile: boolean = false;

  constructor() {
  }

  onClick() {
    this.isVisibile = !this.isVisibile;
  }

}
