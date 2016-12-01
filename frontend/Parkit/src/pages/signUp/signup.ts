import { Component } from '@angular/core'
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { LoginPage } from '../login/login';
import { Http } from '@angular/http';

import { Headers } from '@angular/http';
import { GlobalVars } from '../globalVars';
@Component({
    templateUrl: '../../pages/signup/signup.html',
    // styleUrls: [ '../../pages/signup/signup.scss' ]

    //providers: [AuthenticationApi]
})
export class SignUpPage {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    parkingLot: string;

    constructor(public nav: NavController, public platform: Platform, public http: Http, public authTokenService:GlobalVars) {//, public authenticationApi: AuthenticationApi) {
    }


    signUp() {
        var data = {
            username: this.username, password: this.password,
            email: this.email, first_name: this.firstName, last_name: this.lastName, fav_lot: this.parkingLot
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('https://parkitllc.me/signup',JSON.stringify(data),{headers:headers})
        .subscribe( data => {
            this.nav.setRoot(TabsPage, data.json()['Authorization']);
            this.authTokenService.setAuthToken("Bearer " + data.json()['Authorization']);
           
        },
        (err) => alert("Unable to Register"));
    }

    backToLogin() {
        this.nav.setRoot(LoginPage);
    }
}
