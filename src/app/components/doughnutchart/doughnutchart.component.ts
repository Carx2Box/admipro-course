import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-doughnutchart',
  templateUrl: './doughnutchart.component.html'
})
export class DoughnutchartComponent implements OnInit {
  @Input('labels') doughnutChartLabels: string[] = [];
  @Input('data')  doughnutChartData: number[] = [];
  @Input('type')  doughnutChartType: string = '';
  @Input('legend') doughnutChartLegend: string = '';

  constructor() { }

  ngOnInit() {
  }

}
