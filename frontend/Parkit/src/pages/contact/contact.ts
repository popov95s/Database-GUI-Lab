import { Component } from '@angular/core';
import {Http} from '@angular/http';
import {Camera} from 'ionic-native';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [Http]
})
export class ContactPage {

  public username: string;
  public base64Image: string;
  private new: boolean;

  static get parameters() {
      return [[Http]];
  }

  constructor(public navCtrl: NavController, private http:Http) {}

  takePicture(){
  Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
  }).then((imageData) => {
    // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
  }, (err) => {
      console.log(err);
  });
}

delete(){

  this.base64Image = "";
}


ngOnit(){

  if (this.getCar() != null){
    this.new = false; 
  } else {

    this.new = true;
  }
}
getCar():any{

  let url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI(this.username) + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
  let response = this.http.get(url).map(res => res.json());
  return response;

}

}
