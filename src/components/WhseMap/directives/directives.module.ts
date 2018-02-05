import { NgModule } from '@angular/core';
import { VerticalSectionDirective } from './vertical-section/vertical-section';
import { TopViewDirective } from './top-view/top-view'
@NgModule({
	declarations: [TopViewDirective],
	imports: [],
	exports: [TopViewDirective]
})
export class DirectivesModule {}
