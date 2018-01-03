import { Component, Input } from '@angular/core';
import { DateRangePickerService } from '../date-range-picker/date-range-picker-service'

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

  @Input()
  isEndDate = false;

  selectedMonth = 12;
  selectedDay = 31;
  selectedYear = 2018;

  constructor(private dateRangePickerService: DateRangePickerService) {
  }

  updateMonth(val) {
    //    console.log('val:'+val, 'sm:'+this.selectedMonth)
    //
    // console.log('val:'+val, ' sm:'+this.selectedMonth+' sd:'+this.selectedDay+' sy:'+this.selectedYear)
    // this.selectedDay = Math.floor(Math.random() * 10);
    // this.selectedMonth = Math.floor(Math.random() * 10);
    // this.selectedYear = Math.floor(Math.random() * 10);
    // console.log('val:'+val, ' sm:'+this.selectedMonth+' sd:'+this.selectedDay+' sy:'+this.selectedYear)
    this.buildDate();
  }
  updateDay(val) {
    // console.log('val:'+val, ' sm:'+this.selectedMonth+' sd:'+this.selectedDay+' sy:'+this.selectedYear)
    // this.selectedDay = Math.floor(Math.random() * 10);
    // this.selectedMonth = Math.floor(Math.random() * 10);
    // this.selectedYear = Math.floor(Math.random() * 10);
    // console.log('val:'+val, ' sm:'+this.selectedMonth+' sd:'+this.selectedDay+' sy:'+this.selectedYear)
    this.buildDate();
  }
  updateYear(val) {
    // console.log('val:'+val, ' sm:'+this.selectedMonth+' sd:'+this.selectedDay+' sy:'+this.selectedYear)
    // this.selectedDay = Math.floor(Math.random() * 10);
    // this.selectedMonth = Math.floor(Math.random() * 10);
    // this.selectedYear = Math.floor(Math.random() * 10);
    // console.log('val:'+val, ' sm:'+this.selectedMonth+' sd:'+this.selectedDay+' sy:'+this.selectedYear)
    let d = this.buildDate();
    console.log(d)
  }

  buildDate(): Date {
    let m = parseInt(this.selectedMonth.toString());
    if (!m || m < 1 || m > 12) {
      m = 1;
      this.selectedMonth = m;
    }
    let md = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let d = parseInt(this.selectedDay.toString());
    if (!d || d < 1 || m > md[m]) {
      d = 1;
      this.selectedDay = d;
    }
    let y = parseInt(this.selectedYear.toString());
    if (!y || y < 1970 || y > 2100) {
      y = 1990;
      this.selectedYear = y;
    }
    let newDate = null;
    if (this.isEndDate) {
      newDate = new Date(y, m - 1, d, 23, 59, 59, 999)
      this.dateRangePickerService.setEndDate(newDate);
    } else {
      newDate = new Date(y, m - 1, d)
      this.dateRangePickerService.setStartDate(newDate);
    }
    return newDate;
  }
}
