import { DateRange } from './../../interfaces/dateRange';
import { Component, Output, EventEmitter } from '@angular/core';
import { leave } from '@angular/core/src/profile/wtf_impl';
import { DateRangePickerService } from '../date-range-picker/date-range-picker-service'
//import { EventEmitter } from '@angular/core/src/event_emitter';

@Component({
  selector: 'range-picker',
  templateUrl: 'range-picker.html'
})
export class RangePickerComponent {

  @Output()
  dateRangeChanged : EventEmitter<DateRange> = new EventEmitter<DateRange>();
  ranges;

  constructor(private dateRangePickerService : DateRangePickerService) {
    this.ranges = dateRangePickerService.ranges;
  }

  rangeChanged(v: string) {
    //    var input : any = document.getElementById("rangeSelect");
    //    var v = input.value;
    //    alert (v);
    let dates = this.dateRangePickerService.computeDates(v);
    this.dateRangeChanged.emit(dates); 
  }

}
