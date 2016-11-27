import { Component } from '@angular/core'
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { LoginPage } from '../login/login';
import { Http, Headers } from '@angular/http';

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
    constructor(public nav: NavController, public platform: Platform, public http: Http){//, public authenticationApi: AuthenticationApi) {
    }

    save() {
        var data = {
             password: this.password, location: this.location,
             first_name: this.firstName, last_name: this.lastName, parkingLot: this.parkingLot
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.put('http://private-2697b-parkit1.apiary-mock.com/settings',JSON.stringify(data),{headers:headers})
        .subscribe( data => {
            this.nav.setRoot(TabsPage);
        },
        (err) => alert("Incorrect Username or Password"));
        //this.authenticationApi.login(this.userName, this.password).subscribe(
             //data => {      
               //Navigate to home page          
             //}
          //)
    }
    signOut(){
        this.nav.setRoot(LoginPage);
    }
}
