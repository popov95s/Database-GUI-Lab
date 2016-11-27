import { Component } from '@angular/core'
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { SignUpPage } from '../../pages/signup/signup';
import {Http} from '@angular/http';
import { Headers } from '@angular/http';
@Component({
    templateUrl: '../../pages/login/login.html',
    //providers: [AuthenticationApi]
})
export class LoginPage {
    username: string;
    password: string;
    constructor(public nav: NavController, public platform: Platform, public http: Http){//, public authenticationApi: AuthenticationApi) {
    }

    login() {
        var data = {username: this.username, password:this.password};
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Allow-Headers", "x-requested-with, Content-Type, origin, authorization, accept, client-security-token");
        headers.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        headers.append("Access-Control-Max-Age", "1000");
        this.http.post('api/login',JSON.stringify(data),{headers:headers})
        .subscribe( data => {
            this.nav.setRoot(TabsPage, data.json()['Authorization']);
            console.log(data.json()['Authorization']);
        },
        (err) => alert("Incorrect Username or Password"));
        //this.authenticationApi.login(this.userName, this.password).subscribe(
             //data => {      
               //Navigate to home page              
                // this.nav.setRoot(TabsPage);
             //}
          //)
    }
    signUp(){
        this.nav.push(SignUpPage);
    }
}
