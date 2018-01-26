import { NgModule } from '@angular/core';
import { RangePickerComponent } from './range-picker/range-picker';
import { DatePickerComponent } from './date-picker/date-picker';
import { CalendarButtonComponent } from './calendar-button/calendar-button';
import { TesterComponent } from './tester/tester';
import { ItemCounterComponent } from './item-counter/item-counter';
import { VerticalSectionDirective } from '../directives/vertical-section/vertical-section'
import { WhseMapComponent } from '../components/WhseMap/whse-map/whse-map';


@NgModule({
    declarations: [RangePickerComponent,
        DatePickerComponent,
        CalendarButtonComponent,
        TesterComponent,
        ItemCounterComponent,
        VerticalSectionDirective,
        WhseMapComponent],
    imports: [],
    exports: [RangePickerComponent,
        DatePickerComponent,
        CalendarButtonComponent,
        TesterComponent,
        ItemCounterComponent,
        VerticalSectionDirective,
        WhseMapComponent]
})
export class ComponentsModule { }
