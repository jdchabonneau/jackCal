
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Age2Page } from './age2';

import { TesterComponentModule } from '../../components/tester/tester.module';

@NgModule({
  declarations: [
    Age2Page
  ],
  imports: [
    IonicPageModule.forChild(Age2Page),
    TesterComponentModule
  ],
})
export class Age2PageModule {}
