import { DateRange } from './../../interfaces/dateRange';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { leave } from '@angular/core/src/profile/wtf_impl';
import { DateRangePickerService } from '../date-range-picker/date-range-picker-service'
import { dateDataSortValue } from 'ionic-angular/util/datetime-util';
//import { EventEmitter } from '@angular/core/src/event_emitter';

@Component({
  selector: 'range-picker',
  templateUrl: 'range-picker.html'
})
export class RangePickerComponent {                            

  @Output() dateRangeChanged: EventEmitter<DateRange> = new EventEmitter<DateRange>();
  @Input() currentRange = "This Month";

  ranges;
  selectedItem;

  constructor(private dateRangePickerService: DateRangePickerService) {
    dateRangePickerService.subscribe(() => this.datesChanged());
    this.ranges = dateRangePickerService.ranges;
    //this.rangeChanged('This Month');
  }

  datesChanged() {
    this.currentRange = this.dateRangePickerService.rangeType;
    //this.currentRange = 'yy';
  }

  rangeChanged(newRange: string) {
    //    var input : any = document.getElementById("rangeSelect");
    //    var v = input.value;
    //    alert (newRange);
    let dates = this.dateRangePickerService.computeDates(newRange);
    this.dateRangePickerService.setRange(dates);
    this.dateRangeChanged.emit(dates);
  }

}
