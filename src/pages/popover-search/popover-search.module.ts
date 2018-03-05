import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverSearchPage } from './popover-search';

@NgModule({
  declarations: [
    PopoverSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverSearchPage),
  ],
  exports: [
    PopoverSearchPage,
  ],
})
export class PopoverSearchPageModule {}
