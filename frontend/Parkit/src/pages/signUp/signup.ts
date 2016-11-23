import { Component } from '@angular/core'
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { LoginPage } from '../login/login';
@Component({
    templateUrl: '../../pages/signup/signup.html',
    //providers: [AuthenticationApi]
})
export class SignUpPage {
    username: string;
    password: string;
    email: string;
    name: string;
    parkingLot: string;

    constructor(public nav: NavController, public platform: Platform){//, public http: Http, public authenticationApi: AuthenticationApi) {
    }

    
    signUp(){
        //should send a POST 
        this.nav.setRoot(TabsPage);
    }

    backToLogin(){
        this.nav.setRoot(LoginPage);
    }
}
