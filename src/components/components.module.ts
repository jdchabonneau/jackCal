import { NgModule } from '@angular/core';
import { RangePickerComponent } from './range-picker/range-picker';
import { DatePickerComponent } from './date-picker/date-picker';
import { CalendarButtonComponent } from './calendar-button/calendar-button';
import { TesterComponent } from './tester/tester';
import { ContextmenuComponent} from './contextmenu/contextmenu'
import { ItemCounterComponent } from './item-counter/item-counter';
import { VerticalSectionDirective } from '../components/WhseMap/directives/vertical-section/vertical-section'
import { WhseMapComponent } from '../components/WhseMap/whse-map/whse-map';
import { WhseMapperComponent } from '../components/WhseMap/whse-mapper/whse-mapper';


@NgModule({
    declarations: [RangePickerComponent,
        DatePickerComponent,
        CalendarButtonComponent,
        TesterComponent,
        ItemCounterComponent,
        ContextmenuComponent,
        VerticalSectionDirective,
        WhseMapComponent,
        WhseMapperComponent,
    ],
    imports: [],
    exports: [RangePickerComponent,
        DatePickerComponent,
        CalendarButtonComponent,
        TesterComponent,
        ItemCounterComponent,
        ContextmenuComponent,
        VerticalSectionDirective,
        WhseMapComponent,
        WhseMapperComponent,
    ]
})
export class ComponentsModule { }
