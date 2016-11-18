import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsMarker, CameraPosition } from 'ionic-native';

// ios API KEY: AIzaSyAPJVrypTj0ZaAd-xO8egPEyiUpmnt2QZs
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

 map: GoogleMap;

   constructor(public navCtrl: NavController, public platform: Platform) {
       platform.ready().then(() => {
           this.loadMap();
       });
   }


   addMarkers(lat: any, lon: any, name: string, color: any){
     // create LatLng object
     let loc: GoogleMapsLatLng = new GoogleMapsLatLng(lat,lon);

     // create CameraPosition
     let position: CameraPosition = {
       target: loc,
       zoom: 18,
       tilt: 30
     };

     let image;
     if (color == 1){

       image = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

     } else if (color == 2){

       image = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';

     } else if(color == 3){

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
           this.addMarkers(32.8407707, -96.7826080, "Binkley 20% Full", 1);
           this.addMarkers(32.8463058, -96.7834326, "Airline 50% Full", 2);
           this.addMarkers(32.8469162, -96.7862244, "Law 85% Full", 3);
           this.addMarkers(32.8414574, -96.7812195, "Moody 10% Full", 1);
           this.addMarkers(32.8397369, -96.7798080, "Mustang 45% Full", 2);
           this.addMarkers(32.8459015, -96.7803574, "Theta Lot 90% Full", 3);
           this.addMarkers(32.8447151, -96.7811737, "Commuter Lot 55% Full", 2);
       });

   }

 }
