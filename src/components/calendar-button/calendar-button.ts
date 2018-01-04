import { Component, HostListener, Input } from '@angular/core';
import { DateRangePickerService } from '../date-range-picker/date-range-picker-service';

@Component({
  selector: 'calendar-button',
  templateUrl: 'calendar-button.html'
})
export class CalendarButtonComponent {
  @HostListener('mouseenter', ['$event'])
  onEnter(e) {
    this.month = '^';
  }
  @HostListener('mouseleave', ['$event'])
  onLeave(e) {
    this.monthName(this.today.getMonth());
  }
  @Input()
  isEndDate = false;

  month: string;
  day: string;

  today: Date;

  constructor(private dateRangePickerService: DateRangePickerService) {
    this.today = new Date();
    dateRangePickerService.subscribe(() => this.dateChanged());
    //this.today = this.dateRangePickerService.getStartDate();
    this.day = this.today.getDate().toString();
  }

  dateChanged() {
    this.today = this.isEndDate ? this.dateRangePickerService.getEndDate() : this.dateRangePickerService.getStartDate();
    this.day = this.today.getDate().toString();
    this.monthName(this.today.getMonth());

  }

  monthName(monthIndex) {
    this.month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][monthIndex];
  }
}
