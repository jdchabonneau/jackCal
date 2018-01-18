import { NgModule } from '@angular/core';
import { RangePickerComponent } from './range-picker/range-picker';
import { DatePickerComponent } from './date-picker/date-picker';
import { CalendarButtonComponent } from './calendar-button/calendar-button';
import { TesterComponent } from './tester/tester';


@NgModule({
	declarations: [RangePickerComponent,
    DatePickerComponent,
    CalendarButtonComponent,
    TesterComponent],
	imports: [],
	exports: [RangePickerComponent,
    DatePickerComponent,
    CalendarButtonComponent,
    TesterComponent]
})
export class ComponentsModule {}
