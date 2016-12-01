import { Component } from '@angular/core';
import { Chart } from 'ng2-chartjs2';
 import { ChartsService } from './chartsService/charts.service';
import { Headers } from '@angular/http';

@Component({
  selector: 'chartComponent',
  templateUrl: './charts.component.html',
  providers: [ChartsService]
})
export class ChartComponent {
	//needs service to be read in from API
	getDataTry:any;
  percentFull: number;
  //doughnutLabels: string[];
  //doughnutData: Chart.Dataset[];
	constructor(private chartService?: ChartsService){
		// this.getDataTry= ChartsService.makeGetRequest();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'LongTokenOfRandomUniqueCharacters');
   // this.loadData("Binkley", headers);
  }
  // loadData(parkingLot? : string, headers ?: Headers ){
  //   this.chartService.load(parkingLot, headers)
  //     .then(data=>{
  //       this.percentFull=data['percentFull'];
  //       console.log(this.percentFull);
  //       this.loadChart();
  //     })
	// 	.catch(data => alert(data.json().error));
  // }

  //loadChart(){
  doughnutLabels = ["Full","Empty"];
  doughnutData = [
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
//}

 barLabels: string[] = ["9AM","10AM","11AM","12PM","1PM","2PM"];
  barData: Chart.Dataset[] = [
    {
      label: 'Busiest hours',
      data: [100,120,150,200,150,120],
      borderWidth: 1,
      backgroundColor:[
        'rgba(00, 114, 214, 1)',
        'rgba(00, 114, 214, 1)',
        'rgba(00, 114, 214, 1)',
        'rgba(00, 114, 214, 1)',
        'rgba(00, 114, 214, 1)',
        'rgba(00, 114, 214, 1)'
      ]
    }
  ];


}
