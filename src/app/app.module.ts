import { WhseMapComponent } from './../components/WhseMap/whse-map/whse-map';
import { WhseMapperComponent } from './../components/WhseMap/whse-mapper/whse-mapper';
import { Age2PageModule } from './../pages/age2/age2.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { DhiDataProvider } from '../providers/dhi-data/dhi-data';

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
import { ContextmenuComponent} from '../components/contextmenu/contextmenu';
import { VerticalSectionDirective } from '../components/WhseMap/directives/vertical-section/vertical-section'
import { TopViewDirective } from '../components/WhseMap/directives/top-view/top-view'
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
    ContextmenuComponent,
    TopViewDirective,
    VerticalSectionDirective,
    WhseMapComponent,
    WhseMapperComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    WhseMapperComponent,
    //VerticalSectionDirective

  ],
  providers: [
    StatusBar,
    SplashScreen,
    DhiDataProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
