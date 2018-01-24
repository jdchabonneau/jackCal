import { Component, AfterViewChecked, Input } from '@angular/core';
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
export class DateRangePickerComponent implements AfterViewChecked{

  startDate: string = "";
  endDate: string = "";
  @Input() dateRange = "This Quarter";
  @Input() x = 'Their Truck';

rangeChanged(event){
}

  constructor(private dateRangePickerService: DateRangePickerService) {
  }

  ngAfterViewChecked(){
//    console.log(`xx: dateRange = ${this.dateRange}, x = ${this.x}`);
    this.dateRangePickerService.setRange(
      this.dateRangePickerService.computeDates(this.dateRange));
  }
}
