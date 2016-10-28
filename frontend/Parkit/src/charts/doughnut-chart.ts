import { Component } from '@angular/core';

// webpack html imports


@Component({
  selector: 'doughnut-chart',
  templateUrl: 'doughnut-chart'
})

export class DoughnutChartComponent {
  // Doughnut
  public doughnutChartLabels:string[] = ['Taken', 'In-Empty Sales'];
  public doughnutChartData:number[] = [55, 45];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
