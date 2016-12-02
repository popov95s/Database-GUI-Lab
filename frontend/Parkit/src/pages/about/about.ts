import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Http, Headers } from '@angular/http';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsMarker, CameraPosition } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import { StatusBar } from 'ionic-native';

import { GlobalVars } from '../globalVars';


// ios API KEY: AIzaSyAPJVrypTj0ZaAd-xO8egPEyiUpmnt2QZs
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

 map: GoogleMap;
 markers:any[];

 //parking lots
 binkley: any;
 theta :any;
 law : any;
 airline : any;
 moody :any;
 mustang: any;
 commuter: any;


   constructor(public navCtrl: NavController, public platform: Platform, public http : Http, public authTokenService:GlobalVars) {

     this.getStats();
     this.platform.ready().then(() => {

         this.loadMap();

     });

     StatusBar.hide();

   }


   addMarkers(lat: any, lon: any, name: string, c: any){
     // create LatLng object
     let loc: GoogleMapsLatLng = new GoogleMapsLatLng(lat,lon);
     var color : number = +c;

     // create CameraPosition
     let position: CameraPosition = {
       target: loc,
       zoom: 18,
       tilt: 30
     };

     let image;
     if (color >= 0 && color <= 33){

       image = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

     } else if (color >= 34 && color <= 66){

       image = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';

     } else if(color >= 67 && color <= 100){

       image = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
     }


     let markerOptions: GoogleMapsMarkerOptions = {
       position: loc,
       title: name,
       icon: image
     };

     this.map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
         marker.showInfoWindow();
       });

   }

   loadMap(){

       let location1 = new GoogleMapsLatLng(32.8412,-96.7845);

       this.map = new GoogleMap('map', {
         'backgroundColor': 'nil',
         'controls': {
           'compass': true,
           'myLocationButton': true,
           'indoorPicker': true,
           'zoom': true
         },
         'gestures': {
           'scroll': true,
           'tilt': true,
           'rotate': true,
           'zoom': true
         },
         'camera': {
           'latLng': location1,
           'tilt': 30,
           'zoom': 15,
           'bearing': 50
         }

       });

       this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {

           console.log('Map is ready!');

       });


   }

    pins(){

      this.addMarkers(32.8407707, -96.7826080, "Binkley " + this.binkley + " % Full", this.binkley);
      this.addMarkers(32.8463058, -96.7834326, "Airline " + this.airline + " % Full", this.airline);
      this.addMarkers(32.8469162, -96.7862244, "Law Garage " + this.law + " % Full", this.law);
      this.addMarkers(32.8414574, -96.7812195, "Moody " + this.moody + " % Full", this.moody);
      this.addMarkers(32.8397369, -96.7798080, "Mustang " + this.mustang + " % Full", this.mustang);
      this.addMarkers(32.8459015, -96.7803574, "Theta Lot " + this.theta + " % Full", this.theta);
      this.addMarkers(32.8447151, -96.7811737, "Commuter Lot " + this.commuter + " % Full", this.commuter);

    }

   reload(){

     this.getStats();

    //  this.markers.push(this.addMarkers(32.8407707, -96.7826080, "Binkley " + this.binkley + " % Full", this.binkley));
    //  this.markers.push(this.addMarkers(32.8463058, -96.7834326, "Airline " + this.airline + " % Full", this.airline));
    //  this.markers.push(this.addMarkers(32.8469162, -96.7862244, "Law Garage " + this.law + " % Full", this.law));
    //  this.markers.push(this.addMarkers(32.8414574, -96.7812195, "Moody " + this.moody + " % Full", this.moody));
    //  this.markers.push(this.addMarkers(32.8397369, -96.7798080, "Mustang " + this.mustang + " % Full", this.mustang));
    //  this.markers.push(this.addMarkers(32.8459015, -96.7803574, "Theta Lot " + this.theta + " % Full", this.theta));
    //  this.markers.push(this.addMarkers(32.8447151, -96.7811737, "Commuter Lot " + this.commuter + " % Full", this.commuter));

   }

   getStats(){

     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', this.authTokenService.getAuthToken());
     this.http.get('https://parkitllc.me/map',{headers: headers}).subscribe(data=>{

           this.binkley=data.json()['Binkley'];
           this.moody=data.json()['Moody'];
           this.law=data.json()['Law'];
           this.airline=data.json()['Airline'];
           this.mustang=data.json()['Mustang'];
           this.commuter=data.json()['Commuter Lot'];
           this.theta=data.json()['Theta Lot'];

           console.log("Success");
           this.pins();


         },
         (err)=> alert("Error"));

   }


 }
