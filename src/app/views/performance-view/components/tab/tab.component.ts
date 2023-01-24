import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() title: string = "Title"

  multi: any = [{
    name: "CPU",
    series: [
      {
        name: "CPU1",
        value: 31
      },
      {
        name: "CPU2",
        value: 60
      },
      {
        name: "CPU3",
        value: 20
      },
      {
        name: "CPU4",
        value: 100
      },
      {
        name: "CPU5",
        value: 10
      },
    ]
  }];
  view: [number, number] = [150, 100];
  // options
  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = false;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = false;
  colorScheme: any = {
    domain: ['#0081B4', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event);
  }

}
