import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

export class ChartsService {
    static get parameters() {
        return [[Http]];
    }

    constructor(private http:Http) {

    }
    returnData: JSON;
    // makeGetRequest() {
    //     this.http.get("https://httpbin.org/ip")
    //     .subscribe(data => this.returnData, error => {
    //         console.log(JSON.stringify(error.json()));
    //         this.returnData=null;
    //     });
    //     return this.returnData;
    // }
}
