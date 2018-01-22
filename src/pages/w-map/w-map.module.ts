import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WMapPage } from './w-map';

@NgModule({
  declarations: [
    WMapPage,
  ],
  imports: [
    IonicPageModule.forChild(WMapPage),
  ],
})
export class WMapPageModule {}
