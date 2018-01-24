import { Injectable } from '@angular/core';
import { DateRange } from '../../interfaces/dateRange';

@Injectable()
export class DateRangePickerService {
    private startDate: Date = new Date();
    private endDate: Date = new Date();
    dateRange: DateRange = null;
    rangeType: string;
    getStartDate() {
        return this.startDate;
    }
    getEndDate() {
        return this.endDate;
    }
    setStartDate(d: Date, shouldPublish = true) {
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        if(d.getTime() > this.endDate.getTime()){
            this.endDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
        }
        this.startDate = d;
        this.dateRange = { startDate: this.startDate, endDate: this.endDate }
        this.rangeType = this.checkForRange(this.dateRange);
        if(shouldPublish){
            this.publish();
        }
    }
    setEndDate(d: Date, shouldPublish = true) {
        d.setHours(23);
        d.setMinutes(59);
        d.setSeconds(59);
        d.setMilliseconds(999);
        if(d.getTime() < this.startDate.getTime()){
            this.startDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        }
        this.endDate = d;
        this.dateRange = { endDate: this.endDate, startDate: this.startDate }
        this.rangeType = this.checkForRange(this.dateRange);
        if(shouldPublish){
            this.publish();
        }
    }
    setRange(newRange: DateRange){
        if(newRange.startDate.getTime() <= this.endDate.getTime()){
            this.setStartDate(newRange.startDate, false);
            this.setEndDate(newRange.endDate);
        }else{
            this.setEndDate(newRange.endDate, false);
            this.setStartDate(newRange.startDate);
        }
    }
    range: string = null;

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

    subscribers = [];
    subscribe(callback) {
        this.subscribers.push(callback);
    }

    publish() {
        for (let i = 0; i < this.subscribers.length; i++) {
            this.subscribers[i]();
        }
    }

    checkForRange(dateRange: DateRange): string {
        if (!dateRange || !dateRange.startDate || !dateRange.endDate) {
            return this.ranges[this.ranges.length - 1];
        }
        for (let i = 0; i < this.ranges.length - 1; i++) {
            let dr = this.computeDates(this.ranges[i])
            //       if(dr.endDate === dateRange.endDate && dr.startDate === dateRange.startDate){
            if (dr.endDate.getTime() === dateRange.endDate.getTime() && dr.startDate.getTime() === dateRange.startDate.getTime()) {
                return this.ranges[i];
            }
        }
        return this.ranges[this.ranges.length - 1];
    }

    computeDates(range: string): DateRange {
        let dates: DateRange = { startDate: null, endDate: null };
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
                let xxx = today.getDay();
                today.setDate(today.getDate() - xxx - 7);
                ed.setMonth(today.getMonth());
                ed.setFullYear(today.getFullYear());
                ed.setDate(today.getDate() + 6);
                break;

            case 'This Week':
                xxx = today.getDay();
                today.setDate(today.getDate() - xxx);
                ed.setMonth(today.getMonth());
                ed.setFullYear(today.getFullYear());
                ed.setDate(today.getDate() + 6);
                break;

            case 'Next Week':
                xxx = today.getDay();
                today.setDate(today.getDate() - xxx);
                today.setDate(today.getDate() + 7);
                ed.setMonth(today.getMonth());
                ed.setFullYear(today.getFullYear());
                ed.setDate(today.getDate() + 6);
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
                this.thisQuarter(today, ed);
                today.setMonth(today.getMonth()-3);
                ed.setMonth(ed.getMonth()-3);
                break;
            case 'Next Quarter':
                today.setMonth(today.getMonth()+3);
                ed.setMonth(ed.getMonth()+3);
                this.thisQuarter(today, ed);
                break;
            case 'This Quarter':
                this.thisQuarter(today, ed);
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
                break;

        }
        dates["startDate"] = today;
        dates["endDate"] = ed;
        return dates;
    }

    thisQuarter(today: Date, ed: Date) {
        if (today.getMonth() < 3) {
            today.setMonth(0);
            ed.setFullYear(today.getFullYear());
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

    }
}