import { Component, Injectable, Input } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../location/location-tracker';
import { ChartComponent } from '../charts/charts.component';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'


})

export class HomePage {
  parkingLots=[ {parkingLot: "Binkley"}, 
                {parkingLot:"Theta Lot"},
                {parkingLot:"Moody"},
                {parkingLot: "Airline"}
  ];
  @Input() currentParkingLot:String;
  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public locationTracker: LocationTracker) {
      //this.parkingLots.push("Binkley");
      // this.parkingLots.push({parkingLot:"Airline"});
      // this.parkingLots.push({parkingLot:"Theta Lot"});
      // this.parkingLots.push({parkingLot:"Moody"});
      this.currentParkingLot="Moody";
  } 
changeName(parkingLot:String){
  this.currentParkingLot=parkingLot;
  console.log(this.currentParkingLot);
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
