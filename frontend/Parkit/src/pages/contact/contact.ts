import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Camera} from 'ionic-native';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { GlobalVars } from '../globalVars';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public parkinglot: string;
  public base64Image: string;
  public floor : string;
  private new: boolean;



  constructor(public nav: NavController, public platform: Platform, public http: Http, public authTokenService:GlobalVars) {

    this.getCar();
    console.log(this.parkinglot);
    StatusBar.hide();
  }

  takePicture(){
  Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 700,
      targetHeight: 700
  }).then((imageData) => {
    // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
  }, (err) => {
      console.log(err);
  });
}


// ngOnit(){
//
//   if (this.getCar() != null){
//     this.new = false;
//   } else {
//
//     this.new = true;
//   }
// }
getCar(){


  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', this.authTokenService.getAuthToken());
  this.http.get('http://private-2697b-parkit1.apiary-mock.com/mycar',{headers: headers})
      .subscribe(data=>{
          this.parkinglot=data.json()['parkingLot'];
          this.floor=data.json()['floor'];
          this.base64Image=data.json()['imageURL'];
          console.log("Success");


      },
      (err)=> alert("Error"));

}

saveCar(){

  var data = {parkingLot : this.parkinglot, floor : this.floor, imageURL : this.base64Image}
  var headers = new Headers();
  headers.append('Authorization', this.authTokenService.getAuthToken());
  headers.append('Content-Type', 'application/json');
  this.http.post('http://private-2697b-parkit1.apiary-mock.com/savecar',JSON.stringify(data),{headers:headers})
    .subscribe(data=> {
      console.log("success")},
      (err) => console.log("fail"));

}

deleteCar(){


  var data = {parkingLot : this.parkinglot, floor : this.floor, imageURL : this.base64Image}
  var headers = new Headers();
  headers.append('Authorization', this.authTokenService.getAuthToken());
  headers.append('Content-Type', 'application/json');
  this.http.post('http://private-2697b-parkit1.apiary-mock.com/deletecar',JSON.stringify(data),{headers:headers})
    .subscribe(data=> {
      console.log("success")},
      (err) => console.log("fail"));

      this.floor = "";
      this.base64Image = "";
      this.parkinglot = "";
}

}
