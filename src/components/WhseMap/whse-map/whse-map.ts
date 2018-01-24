import { Component } from '@angular/core';

/**
 * Generated class for the WhseMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'whse-map',
  templateUrl: 'whse-map.html'
})
export class WhseMapComponent {

  text: string;

  constructor() {
    console.log('Hello WhseMapComponent Component');
    this.text = 'Hello World';
  }

}
