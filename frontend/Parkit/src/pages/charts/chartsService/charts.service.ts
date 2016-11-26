import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class ChartsService {
    static get parameters() {
        return [[Http]];
    }

    constructor(private http:Http) {

    }
    load() {
          return new Promise(resolve => {
        this.http.get('http://private-2697b-parkit1.apiary-mock.com/home')
            .subscribe(data => {
            this.data = data.json();
            resolve(this.data);
            console.log(this.data);
            })});
        }
    data: Promise<any>;
    // makeGetRequest() {
    //     this.http.get("https://httpbin.org/ip")
    //     .subscribe(data => this.returnData, error => {
    //         console.log(JSON.stringify(error.json()));
    //         this.returnData=null;
    //     });
    //     return this.returnData;
    // }
}
