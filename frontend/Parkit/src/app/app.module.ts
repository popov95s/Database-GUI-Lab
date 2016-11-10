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
// import { ChartsService } from '../pages/charts/chartsService/charts.service';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignUpPage,
    ChartComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ChartModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignUpPage
  ],
  providers: [LocationTracker]
})
export class AppModule {}
