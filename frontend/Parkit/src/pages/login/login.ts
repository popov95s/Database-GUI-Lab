import { Component } from '@angular/core'
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { SignUpPage } from '../../pages/signup/signup';
@Component({
    templateUrl: '../../pages/login/login.html',
    //providers: [AuthenticationApi]
})
export class LoginPage {
    username: string;
    password: string;
    constructor(public nav: NavController, public platform: Platform){//, public http: Http, public authenticationApi: AuthenticationApi) {
    }

    login() {
        //this.authenticationApi.login(this.userName, this.password).subscribe(
             //data => {      
               //Navigate to home page              
                this.nav.setRoot(TabsPage);
             //}
          //)
    }
    signUp(){
        this.nav.push(SignUpPage);
    }
}
