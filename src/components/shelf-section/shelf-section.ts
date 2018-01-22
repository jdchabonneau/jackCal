import { Component } from '@angular/core';

/**
 * Generated class for the ShelfSectionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'shelf-section',
  templateUrl: 'shelf-section.html'
})
export class ShelfSectionComponent {

  text: string;

  constructor() {
    console.log('Hello ShelfSectionComponent Component');
    this.text = 'Hello World';
  }

}
