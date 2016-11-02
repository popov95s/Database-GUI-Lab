import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../location/location-tracker';
import { ChartComponent } from '../charts/charts.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public locationTracker: LocationTracker) {

  }

  openMenu() {
  this.menuCtrl.open();
}

closeMenu() {
  this.menuCtrl.close();
}

toggleMenu() {
  this.menuCtrl.toggle();
}

start(){
  this.locationTracker.startTracking();
}

stop(){
  this.locationTracker.stopTracking();
}

}
