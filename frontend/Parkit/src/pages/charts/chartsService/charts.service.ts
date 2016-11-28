import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class ChartsService {
    static get parameters() {
        return [[Http]];
    }

    constructor(private http?: Http) {

    }
    load(parkingLot?: string, headers?: Headers) {
        var bodyData= {parkingLot:parkingLot};
        return new Promise(resolve => {
            this.http.get('http://private-2697b-parkit1.apiary-mock.com/home', { body: bodyData, headers: headers })
                .subscribe(data => {
                    this.data = data.json();
                    resolve(this.data);
                    console.log(this.data);
                })
        });
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
