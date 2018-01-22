import { NgModule } from '@angular/core';
import { RangePickerComponent } from './range-picker/range-picker';
import { DatePickerComponent } from './date-picker/date-picker';
import { CalendarButtonComponent } from './calendar-button/calendar-button';
import { TesterComponent } from './tester/tester';
import { ItemCounterComponent } from './item-counter/item-counter';


@NgModule({
	declarations: [RangePickerComponent,
    DatePickerComponent,
    CalendarButtonComponent,
    TesterComponent,
    ItemCounterComponent],
	imports: [],
	exports: [RangePickerComponent,
    DatePickerComponent,
    CalendarButtonComponent,
    TesterComponent,
    ItemCounterComponent]
})
export class ComponentsModule {}
