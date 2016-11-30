import { Component, Injectable, Input } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../location/location-tracker';
import { ChartComponent } from '../charts/charts.component';
import { SettingsPage } from '../settings/settings';
import { Http, Headers } from '@angular/http';
import { GlobalVars } from '../globalVars';
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
  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public locationTracker: LocationTracker, public http: Http, public chart: ChartComponent, public authTokenService:GlobalVars) {
    //this.parkingLots.push("Binkley");
    // this.parkingLots.push({parkingLot:"Airline"});
    // this.parkingLots.push({parkingLot:"Theta Lot"});
    // this.parkingLots.push({parkingLot:"Moody"});
    this.currentParkingLot = "Moody";
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'LongTokenOfRandomUniqueCharacters');
    // this.chart.loadData(this.currentParkingLot, headers);
    console.log(authTokenService.getAuthToken());
    this.checkedIn=0;
  }
  checkedIn:any;
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
    this.checkedIn=1;
    headers.append('Authorization', this.authTokenService.getAuthToken());
    headers.append('Content-Type', 'application/json');
    this.http.post('http://private-2697b-parkit1.apiary-mock.com/checkin',JSON.stringify(data),{headers:headers})
      .subscribe(data=> {
        console.log("success")},
        (err) => console.log("fail"));
    this.stop();
}

  checkout(){
    var headers = new Headers();
    headers.append('Authorization', this.authTokenService.getAuthToken());
    headers.append('Content-Type', 'application/json');
    this.http.post("http://private-2697b-parkit1.apiary-mock.com/checkout",{headers:headers}) 
        .subscribe(data=> {
        console.log("success")},
        (err) => console.log("fail"));;

    this.checkedIn=0;
  }
  stop() {
    this.locationTracker.stopTracking();
  }
  openSettings() {
    this.navCtrl.push(SettingsPage);
    //this.navCtrl.present(settingsModal);
  }
}
