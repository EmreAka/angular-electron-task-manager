import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent{
  @Input() title: string = "Title"
  @Input() cpuUsage: number = 0
  @Input() cpuResources: any = [{
    name: "CPU",
    series: [
      
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
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Usage';
  timeline: boolean = false;
  colorScheme: any = {
    domain: ['#0081B4', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private performanceService: PerformanceService) { }

  onSelect(event) {
    console.log(event);
  }

}
