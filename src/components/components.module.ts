import { NgModule } from '@angular/core';
import { RangePickerComponent } from './range-picker/range-picker';
import { DatePickerComponent } from './date-picker/date-picker';
import { CalendarButtonComponent } from './calendar-button/calendar-button';


@NgModule({
	declarations: [RangePickerComponent,
    DatePickerComponent,
    CalendarButtonComponent],
	imports: [],
	exports: [RangePickerComponent,
    DatePickerComponent,
    CalendarButtonComponent]
})
export class ComponentsModule {}
