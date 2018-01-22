import { NgModule } from '@angular/core';
import { RangePickerComponent } from './range-picker/range-picker';
import { DatePickerComponent } from './date-picker/date-picker';
import { CalendarButtonComponent } from './calendar-button/calendar-button';
import { TesterComponent } from './tester/tester';
import { ItemCounterComponent } from './item-counter/item-counter';
import { ShelfSectionComponent } from './shelf-section/shelf-section';


@NgModule({
	declarations: [RangePickerComponent,
    DatePickerComponent,
    CalendarButtonComponent,
    TesterComponent,
    ItemCounterComponent,
    ShelfSectionComponent],
	imports: [],
	exports: [RangePickerComponent,
    DatePickerComponent,
    CalendarButtonComponent,
    TesterComponent,
    ItemCounterComponent,
    ShelfSectionComponent]
})
export class ComponentsModule {}
