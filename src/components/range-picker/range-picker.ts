import { Component, Output, EventEmitter } from '@angular/core';
import { leave } from '@angular/core/src/profile/wtf_impl';
import { DateRange } from '../../interfaces/dateRange'
//import { EventEmitter } from '@angular/core/src/event_emitter';

/**
 * Generated class for the RangePickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'range-picker',
  templateUrl: 'range-picker.html'
})
export class RangePickerComponent {

  @Output()
  dateRangeChanged : EventEmitter<DateRange> = new EventEmitter<DateRange>();

  ranges = [
    "Yesterday",
    "Today",
    "Tomorrow",
    "Last Week",
    "This Week",
    "Next Week",
    "Last Month",
    "This Month",
    "Next Month",
    "Last Quarter",
    "This Quarter",
    "Next Quarter",
    "Last Year",
    "This Year",
    "Next Year",
    "Custom Dates"
  ];

  constructor() {
  }

  rangeChanged(v: string) {
    //    var input : any = document.getElementById("rangeSelect");
    //    var v = input.value;
    //    alert (v);
    let dates = this.computeDates(v);
    this.dateRangeChanged.emit(dates); 
  }

  computeDates(range: string) : DateRange {
    let dates : DateRange = {startDate : null, endDate : null};
    let today = new Date();
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    today.setHours(0);
    let ed = new Date();
    ed.setMinutes(59);
    ed.setSeconds(59);
    ed.setMilliseconds(999);
    ed.setHours(23);
    switch (range) {
      case 'Yesterday':
        ed.setDate(today.getDate() - 1);
        today.setDate(ed.getDate());
        dates["startDate"] = today;
        dates["endDate"] = ed;
        break;

      case 'Today':
        ed.setDate(today.getDate());
        break;

      case 'Tomorrow':
        ed.setDate(today.getDate() + 1);
        today.setDate(ed.getDate());
        break;

      case 'Last Week':
        let xxx = 6 - today.getDay();
        ed.setDate(today.getDate() + xxx - 7);
        today.setDate(today.getDate() - today.getDay() - 7);
        break;

      case 'This Week':
        xxx = 6 - today.getDay();
        ed.setDate(today.getDate() + xxx);
        today.setDate(today.getDate() - today.getDay());
        break;

      case 'Next Week':
        xxx = 6 - today.getDay();
        ed.setDate(today.getDate() + xxx + 7);
        today.setDate(today.getDate() - today.getDay() + 7);
        break;

      case 'Last Month':
        ed.setDate(1);
        ed.setMonth(today.getMonth())
        ed.setDate(0)
        today.setMonth(today.getMonth() - 1)
        today.setDate(1);
        break;

      case 'This Month':
        ed.setDate(1);
        ed.setMonth(today.getMonth() + 1)
        ed.setDate(0)
        today.setDate(1);
        break;

      case 'Next Month':
        ed.setDate(1);
        ed.setMonth(today.getMonth() + 2)
        ed.setDate(0)
        today.setMonth(today.getMonth() + 1)
        today.setDate(1);
        break;

      case 'Last Quarter':
        today.setDate(5);
        //subtract 6 months here, because 3 months will be added back when we pass through "case 'Next Quarter':"
        today.setMonth(today.getMonth() - 6);
      //'break' purposely left out here 
      case 'Next Quarter':
        today.setMonth(today.getMonth() + 3);
      //'break' purposely left out here 
      case 'This Quarter':
        if (today.getMonth() < 3) {
          today.setMonth(0);
          ed.setMonth(3);
        }
        else if (today.getMonth() < 6) {
          today.setMonth(3);
          ed.setMonth(6);
        }
        else if (today.getMonth() < 9) {
          today.setMonth(6);
          ed.setMonth(9);
        }
        else {
          today.setMonth(9);
          ed.setMonth(12);
        }
        ed.setDate(0);
        today.setDate(1);
        break;

      case 'Last Year':
        ed.setMonth(0);
        ed.setDate(0)
        today.setFullYear(today.getFullYear() - 1);
        today.setMonth(0)
        today.setDate(1);
        break;

      case 'This Year':
        ed.setFullYear(today.getFullYear() + 1);
        ed.setMonth(0);
        ed.setDate(0)
        today.setMonth(0)
        today.setDate(1);
        break;

      case 'Next Year':
        ed.setFullYear(today.getFullYear() + 2);
        ed.setMonth(0);
        ed.setDate(0)
        today.setFullYear(today.getFullYear() + 1);
        today.setMonth(0)
        today.setDate(1);
        dates["startDate"] = today;
        dates["endDate"] = ed;
        break;

    }
    dates["startDate"] = today;
    dates["endDate"] = ed;
    return dates;
  }
}
