import { Component } from '@angular/core';
import { DateRangePickerService } from './date-range-picker-service'

/**
 * Generated class for the DateRangePickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'date-range-picker', 
  templateUrl: 'date-range-picker.html',
  providers: [DateRangePickerService],
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
