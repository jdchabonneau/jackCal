import { Component, Input } from '@angular/core';

/**
 * Generated class for the DatePickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'date-picker',
  templateUrl: 'date-picker.html'
})
export class DatePickerComponent {

  @Input()
  selectedDate: string;

  constructor() {
  }

}
