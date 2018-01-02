import { NgModule } from '@angular/core';
import { RangePickerComponent } from './range-picker/range-picker';
import { DatePickerComponent } from './date-picker/date-picker';
@NgModule({
	declarations: [RangePickerComponent,
    DatePickerComponent],
	imports: [],
	exports: [RangePickerComponent,
    DatePickerComponent]
})
export class ComponentsModule {}
