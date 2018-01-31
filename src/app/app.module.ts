import { WhseMapComponent } from './../components/WhseMap/whse-map/whse-map';
import { Age2PageModule } from './../pages/age2/age2.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Age2Page } from '../pages/age2/age2';
import { WMapPage } from '../pages/w-map/w-map';
import { DateRangePickerComponent } from '../components/date-range-picker/date-range-picker';
import { RangePickerComponent } from '../components/range-picker/range-picker';
import { DatePickerComponent } from '../components/date-picker/date-picker';
import { CalendarButtonComponent } from '../components/calendar-button/calendar-button';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { ItemCounterComponent } from '../components/item-counter/item-counter';
import { VerticalSectionDirective } from '../components/WhseMap/directives/vertical-section/vertical-section'
import { TesterComponent } from '../components/tester/tester';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Age2Page,
    WMapPage,
    DateRangePickerComponent,
    RangePickerComponent,
    DatePickerComponent,
    CalendarButtonComponent,
    TesterComponent,
    ItemCounterComponent,
    VerticalSectionDirective,
    WhseMapComponent,
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Age2Page,
    WMapPage,
    DateRangePickerComponent,
    RangePickerComponent,
    DatePickerComponent,
    CalendarButtonComponent,
    TesterComponent,
    ItemCounterComponent,
    WhseMapComponent,
    //VerticalSectionDirective

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
