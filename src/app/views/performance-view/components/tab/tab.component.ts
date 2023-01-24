import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, OnDestroy{
  @Input() title: string = "Title"
  cpuUsage: number = 0



  multi: any = [{
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
  ngOnDestroy(): void {
    this.performanceService.stopRequesting();
  }

  ngOnInit(): void {
    this.performanceService.startRequesting();
    this.performanceService.getCpuUsage().subscribe({
      next: (value) => {
        console.log(value)
        this.cpuUsage = value
        if (this.multi[0].series.length > 20) {
          this.multi[0].series.shift()
        }
        this.multi[0].series.push({name: Date().toString(), value: value})
        this.multi = [...this.multi]
        console.log(this.multi)
      }
    })
  }

  onSelect(event) {
    console.log(event);
  }

}
