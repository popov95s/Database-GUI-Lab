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


   addMarkers(){
     // create new marker
      let marker = new GoogleMapsMarker({
     position: location,
     draggable: true,
     map: this.map,
     })

     marker.setVisible(true);

     this.map.addMarker(marker).then((marker1: GoogleMapsMarker) => {
       marker1.showInfoWindow();
     });

   }

   loadMap(){

       let location1 = new GoogleMapsLatLng(-34.9290,138.6010);

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
           // create new marker
           // create LatLng object
           let location: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904,-89.3809802);

          //  let marker = new GoogleMapsMarker({
          // position: location,
          // draggable: true,
          // map: this.map,
          // })
          //
          // marker.setVisible(true);
          //
          // this.map.addMarker(marker).then((marker1: GoogleMapsMarker) => {
          //   marker1.showInfoWindow();
          // });


       });

   }

 }
