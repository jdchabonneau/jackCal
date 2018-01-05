import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DateRangePickerComponent } from '../components/date-range-picker/date-range-picker';
import { RangePickerComponent } from '../components/range-picker/range-picker';
import { DatePickerComponent } from '../components/date-picker/date-picker';
import { CalendarButtonComponent } from '../components/calendar-button/calendar-button';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DateRangePickerComponent,
    RangePickerComponent,
    DatePickerComponent,
    CalendarButtonComponent
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
    DateRangePickerComponent,
    RangePickerComponent,
    DatePickerComponent,
    CalendarButtonComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
