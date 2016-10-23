import { Component } from '@angular/core'
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
@Component({
    templateUrl: '../../pages/signup/signup.html',
    //providers: [AuthenticationApi]
})
export class SignUpPage {
    username: string;
    password: string;
    email: string;

    constructor(public nav: NavController, public platform: Platform){//, public http: Http, public authenticationApi: AuthenticationApi) {
    }

    
    signUp(){
        //should send a POST 
        this.nav.setRoot(TabsPage);
    }
}
