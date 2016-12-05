import { Component, Injectable, Input } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../location/location-tracker';
import { ChartComponent } from '../charts/charts.component';
import { SettingsPage } from '../settings/settings';
import { Http, Headers, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { ChartModule,Chart } from 'ng2-chartjs2';

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
  loadedChart: boolean;
  @Input() currentParkingLot: string;
  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public locationTracker: LocationTracker, public http: Http, public chart: ChartComponent){//, public chart: Promise<ChartComponent>) {
    //this.parkingLots.push("Binkley");
    // this.parkingLots.push({parkingLot:"Airline"});
    // this.parkingLots.push({parkingLot:"Theta Lot"});
    // this.parkingLots.push({parkingLot:"Moody"});
    this.currentParkingLot = "Moody";
    this.loadedChart=false;
    
  }
  ngOnInit(){
    
    var bodyData= {parkingLot:'Binkley'};
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'LongTokenOfRandomUniqueCharacters');
     this.http.get('http://private-2697b-parkit1.apiary-mock.com/home', { body: bodyData, headers: headers })
                .subscribe(
      data=>{
        var tempDoughnutData= [
       {
          label: '# of Cars',
          data: [data.json()['percentFull'],100-data.json()['percentFull']],
          backgroundColor: [
            'red',
            'rgba(0,255,0,100)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
       }];
       console.log(tempDoughnutData[0]);
       
       this.chart.loadData(tempDoughnutData);
       this.showDelay();
       this.loadedChart=true;
      }
      );
    
  }
  showDelay() { }
    bar() {
        setTimeout(() => this.showDelay(), 250);
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
