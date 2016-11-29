import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Camera} from 'ionic-native';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public parkinglot: string;
  public base64Image: string;
  public floor : string;
  private new: boolean;

  static get parameters() {
      return [[Http]];
  }

  constructor(public navCtrl: NavController, private http:Http) {

    //this.getCar();

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


ngOnit(){

  if (this.getCar() != null){
    this.new = false;
  } else {

    this.new = true;
  }
}
getCar(){


  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', 'LongTokenOfRandomUniqueCharacters');
  this.http.get('http://private-2697b-parkit1.apiary-mock.com/mycar',{headers: headers})
      .subscribe(data=>{
          this.parkinglot=data.json()['parkingLot'];
          this.floor=data.json()['floor'];
          this.base64Image=data.json()['imageURL'];

      },
      (err)=> alert("Error"));

}

saveCar(){

  var data = {parkingLot : this.parkinglot, floor : this.floor, imageURL : this.base64Image}
  var headers = new Headers();
  headers.append('Authorization', 'LongTokenOfRandomUniqueCharacters');
  headers.append('Content-Type', 'application/json');
  this.http.post('http://private-2697b-parkit1.apiary-mock.com/savecar',JSON.stringify(data),{headers:headers})
    .subscribe(data=> {
      console.log("success")},
      (err) => console.log("fail"));

}

deleteCar(){

  var data = {parkingLot : this.parkinglot, floor : this.floor, imageURL : this.base64Image}
  var headers = new Headers();
  headers.append('Authorization', 'LongTokenOfRandomUniqueCharacters');
  headers.append('Content-Type', 'application/json');
  this.http.post('http://private-2697b-parkit1.apiary-mock.com/deletecar',JSON.stringify(data),{headers:headers})
    .subscribe(data=> {
      console.log("success")},
      (err) => console.log("fail"));

}

}
