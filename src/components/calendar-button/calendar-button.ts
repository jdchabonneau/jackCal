import { Component, HostListener } from '@angular/core';
//import { DateRangePickerService } from '../date-range-picker/date-range-picker-service';

@Component({
  selector: 'calendar-button',
  templateUrl: 'calendar-button.html'
})
export class CalendarButtonComponent {
  @HostListener('mouseenter', ['$event'])
  onEnter(e){
    this.month = '^';
  }
  @HostListener('mouseleave', ['$event'])
  onLeave(e){
    this.monthName(this.today.getMonth());
  }

  month: string;
  day: string;

  today: Date;

//  constructor(private dateRangePickerService : DateRangePickerService) {
    constructor() {
      this.today = new Date();
      //this.today = this.dateRangePickerService.getStartDate();
    this.day = this.today.getDate().toString();
  }

  monthName(monthIndex){
    this.month = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][monthIndex];
  }
}
