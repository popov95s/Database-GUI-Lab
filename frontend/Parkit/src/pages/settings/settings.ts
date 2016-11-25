import { Component } from '@angular/core'
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { LoginPage } from '../login/login';
@Component({
    templateUrl: '../../pages/settings/settings.html',
    
    //providers: [AuthenticationApi]
})
export class SettingsPage {
    username: string;
    password: string;
    email: string;
    location: boolean;
    parkingLot: string;
    constructor(public nav: NavController, public platform: Platform){//, public http: Http, public authenticationApi: AuthenticationApi) {
    }

    save() {
        //this.authenticationApi.login(this.userName, this.password).subscribe(
             //data => {      
               //Navigate to home page              
                this.nav.setRoot(TabsPage);
             //}
          //)
    }
    backToHome(){
        this.nav.setRoot(LoginPage);
    }
}
