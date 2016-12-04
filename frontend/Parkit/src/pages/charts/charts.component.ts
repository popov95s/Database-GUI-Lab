import { Component } from '@angular/core';
import { Chart, ChartModule } from 'ng2-chartjs2';
 import { ChartsService } from './chartsService/charts.service';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'chartComponent',
  templateUrl: './charts.component.html',
  providers: [ChartsService,ChartModule]
})
export class ChartComponent {
	//needs service to be read in from API
	getDataTry:any;
  percentFull: number;
	constructor(private http?: Http,private chartService?: ChartsService){
		// this.getDataTry= ChartsService.makeGetRequest();
    this.loadChart();
  }
  // loadData(parkingLot? : string, headers ?: Headers ){
  //   this.chartService.load(parkingLot, headers)
  //     .then(data=>{
  //       this.percentFull=data['percentFull'];
  //       console.log(this.percentFull);
  //     })
	// 	.catch(data => alert(data.json().error));
  // }
  doughnutLabels:string[];
  public doughnutData: Array<any>;
  
  reloadData(){
    var bodyData= {parkingLot:'Binkley'};
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'LongTokenOfRandomUniqueCharacters');
   this.http.get('http://private-2697b-parkit1.apiary-mock.com/home', { body: bodyData, headers: headers })
                .subscribe(
      data=>{
        var tempDoughnutData= [
       {
          label: '# of Cars',
          data: [data.json()['percentFull'],100-data.json()['percentFull']],
          backgroundColor: [
            'red',
            'rgba(0,255,0,100)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
       }];
       console.log(tempDoughnutData[0]);
       this.doughnutData=tempDoughnutData;
    this.changeDoughnutData(tempDoughnutData);
      }
      );
    
    // this.chartService.load("Binkley",headers)
    //   .then(data=>{
    //     this.percentFull=data['percentFull'];
    //     console.log(this.percentFull);
    //   })
		// .catch(data => alert(data.json().error));
  }
  changeDoughnutData(data:any){
    this.doughnutData=data;
    
    console.log(this.doughnutData[0]);
  }
  loadChart(){
  this.doughnutLabels = ["Full","Empty"];
  this.doughnutData = [
    {
      label: '# of Cars',
      data: [60,100-60],
      backgroundColor: [
        'red',
        'rgba(0,255,0,100)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
    }
  ];
  // barLabels: string[] = ["9AM","10AM","11AM","12PM","1PM","2PM"];
  // barData: Chart.Dataset[] = [
  //   {
  //     label: 'Busiest hours',
  //     data: [100,120,150,200,150,120],
  //     borderWidth: 1
  //   }
  // ];
  }
}
