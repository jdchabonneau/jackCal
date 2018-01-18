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

  isCalendarVisible: boolean = false;

  constructor(private dateRangePickerService: DateRangePickerService) {
    dateRangePickerService.subscribe(()=>this.dateChanged());
  }

  dateChanged(){
    let d = this.isEndDate ? this.dateRangePickerService.getEndDate() : this.dateRangePickerService.getStartDate();
    if(d){
      this.selectedMonth = d.getMonth()+1;
      this.selectedDay = d.getDate();
      this.selectedYear = d.getFullYear();
        }
  }

  d: Date;
  updateMonth(val) {
    //    console.log('val:'+val, 'sm:'+this.selectedMonth)
    //
    // console.log('val:'+val, ' sm:'+this.selectedMonth+' sd:'+this.selectedDay+' sy:'+this.selectedYear)
    // this.selectedDay = Math.floor(Math.random() * 10);
    // this.selectedMonth = Math.floor(Math.random() * 10);
    // this.selectedYear = Math.floor(Math.random() * 10);
    // console.log('val:'+val, ' sm:'+this.selectedMonth+' sd:'+this.selectedDay+' sy:'+this.selectedYear)
    this.d = this.buildDate();
  }
  updateDay(val) {
    // console.log('val:'+val, ' sm:'+this.selectedMonth+' sd:'+this.selectedDay+' sy:'+this.selectedYear)
    // this.selectedDay = Math.floor(Math.random() * 10);
    // this.selectedMonth = Math.floor(Math.random() * 10);
    // this.selectedYear = Math.floor(Math.random() * 10);
    // console.log('val:'+val, ' sm:'+this.selectedMonth+' sd:'+this.selectedDay+' sy:'+this.selectedYear)
    this.d = this.buildDate();
  }
  updateYear(val) {
    // console.log('val:'+val, ' sm:'+this.selectedMonth+' sd:'+this.selectedDay+' sy:'+this.selectedYear)
    // this.selectedDay = Math.floor(Math.random() * 10);
    // this.selectedMonth = Math.floor(Math.random() * 10);
    // this.selectedYear = Math.floor(Math.random() * 10);
    // console.log('val:'+val, ' sm:'+this.selectedMonth+' sd:'+this.selectedDay+' sy:'+this.selectedYear)
    this.d = this.buildDate();
    //console.log(d)
  }

  buildDate(): Date {
    let m = parseInt(this.selectedMonth.toString());
    if (!m || m < 1 || m > 12) {
      m = 1;
      this.selectedMonth = m;
    }
    let md = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let d = parseInt(this.selectedDay.toString());
    if (!d || d < 1 || m > md[d]) {
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

  onClick() {
    // let container = document.getElementById('dateContainer');
    // let testBox = document.getElementById('testBox');
    this.isCalendarVisible = !this.isCalendarVisible;
    // if (this.isCalendarVisible) {
    //   // container.style.right = '218px';
    //   testBox.style.display = 'block';
    //   if(this.isEndDate){
    //     testBox.style.backgroundColor = 'blue';
    //   }
    //   else{
    //     testBox.style.backgroundColor = 'green';
    //   }
    // }
    // else{
    //   // container.style.right = '';
    //   testBox.style.display = 'none';
    // }
  }
}
