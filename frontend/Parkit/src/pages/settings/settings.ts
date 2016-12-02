import { Component } from '@angular/core'
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { LoginPage } from '../login/login';
import { Http, Headers } from '@angular/http';
import { GlobalVars } from '../globalVars';
import { StatusBar } from 'ionic-native';

@Component({
    templateUrl: '../../pages/settings/settings.html',

    //providers: [AuthenticationApi]
})
export class SettingsPage {
    password: string;
    location: boolean;
    parkingLot: string;
    firstName: string;
    lastName: string;
    constructor(public nav: NavController, public platform: Platform, public http: Http, public authTokenService:GlobalVars){//, public authenticationApi: AuthenticationApi) {

      StatusBar.hide();

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authTokenService.getAuthToken());
        this.http.get('https://parkitllc.me/settings',{headers: headers})
            .subscribe(data=>{
                this.firstName=data.json()['first_name'];
                this.lastName=data.json()['last_name'];
                this.parkingLot=data.json()['parkingLot'];

            },
            (err)=> alert("Error"));
    }

    save() {
        var data = {
             password: this.password, location: this.location,
             first_name: this.firstName, last_name: this.lastName, parkingLot: this.parkingLot
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
         headers.append('Authorization', this.authTokenService.getAuthToken());
        this.http.put('https://parkitllc.me/settings',JSON.stringify(data),{headers:headers})
        .subscribe( data => {
            this.nav.setRoot(TabsPage);
        },
        (err) => alert("Unable to Save"));
        //this.authenticationApi.login(this.userName, this.password).subscribe(
             //data => {
               //Navigate to home page
             //}
          //)
    }
    signOut(){
        this.authTokenService.setAuthToken("");
        this.nav.parent.parent.setRoot(LoginPage);
    }
}
