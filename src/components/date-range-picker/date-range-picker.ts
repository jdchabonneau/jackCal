import { Component } from '@angular/core';

/**
 * Generated class for the DateRangePickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'date-range-picker', 
  templateUrl: 'date-range-picker.html'
})
export class DateRangePickerComponent {

  startDate: string = "";
  endDate: string = "";

rangeChanged(event){
   console.log(event);
}

  constructor() {
  }

}
