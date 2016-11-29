import { Component, Injectable, Input } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../location/location-tracker';
import { ChartComponent } from '../charts/charts.component';
import { SettingsPage } from '../settings/settings';
import { Http, Headers, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ChartComponent]


})

export class HomePage {
  parkingLots = [{ parkingLot: "Binkley" },
  { parkingLot: "Theta Lot" },
  { parkingLot: "Moody" },
  { parkingLot: "Airline" }
  ];
  @Input() currentParkingLot: string;
  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public locationTracker: LocationTracker, public http: Http, public chart: Promise<ChartComponent>) {
    //this.parkingLots.push("Binkley");
    // this.parkingLots.push({parkingLot:"Airline"});
    // this.parkingLots.push({parkingLot:"Theta Lot"});
    // this.parkingLots.push({parkingLot:"Moody"});
    this.currentParkingLot = "Moody";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'LongTokenOfRandomUniqueCharacters');
    this.chart.then(
      data=>data.loadData(this.currentParkingLot, headers))
      .catch(error=>console.log(error));
  }
  changeName(parkingLot: string) {
    this.currentParkingLot = parkingLot;
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

  start() {
    this.locationTracker.startTracking();
    var data = {latitude :this.locationTracker.lat, longtitude : this.locationTracker.lng}
    var headers = new Headers();
    headers.append('Authorization', 'LongTokenOfRandomUniqueCharacters');
    headers.append('Content-Type', 'application/json');
    this.http.post('http://private-2697b-parkit1.apiary-mock.com/checkin',JSON.stringify(data),{headers:headers})
      .subscribe(data=> {
        console.log("success")},
        (err) => console.log("fail"));
    this.stop();
  }

  stop() {
    this.locationTracker.stopTracking();
  }
  openSettings() {
    this.navCtrl.push(SettingsPage);
    //this.navCtrl.present(settingsModal);
  }
}
