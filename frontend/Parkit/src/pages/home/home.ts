import { Component, Injectable, Input } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../location/location-tracker';
import { ChartComponent } from '../charts/charts.component';
import { SettingsPage } from '../settings/settings';
import { Http, Headers } from '@angular/http';
import { GlobalVars } from '../globalVars';
import { StatusBar } from 'ionic-native';
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

  currentParkingLot: string;
  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public locationTracker: LocationTracker, public http: Http, public chart: ChartComponent, public authTokenService:GlobalVars) {
    StatusBar.hide();


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authTokenService.getAuthToken());
    this.http.get('https://parkitllc.me/settings',{headers: headers})
        .subscribe(data=>{

            this.currentParkingLot=data.json()['parkingLot'];

        });

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
    console.log("Open");
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
    this.http.post('https://parkitllc.me/checkin',JSON.stringify(data),{headers:headers})
      .subscribe(data=> {
        console.log("success")},
        (err) => console.log("fail"));
    this.stop();
}

  checkout(){
    var headers = new Headers();
    headers.append('Authorization', this.authTokenService.getAuthToken());
    headers.append('Content-Type', 'application/json');
    this.http.post("https://parkitllc.me/checkout",{headers:headers})
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
