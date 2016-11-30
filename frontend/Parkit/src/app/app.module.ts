import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LocationTracker } from '../location/location-tracker';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { ChartModule } from 'ng2-chartjs2';
import { ChartComponent } from '../pages/charts/charts.component';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';
import { SettingsPage } from '../pages/settings/settings';
import { ChartsService } from '../pages/charts/chartsService/charts.service';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { GlobalVars } from '../pages/globalVars';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignUpPage,
    ChartComponent,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ChartModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignUpPage,
    SettingsPage
  ],
  providers: [LocationTracker, ChartsService, GlobalVars]
})
export class AppModule {}
