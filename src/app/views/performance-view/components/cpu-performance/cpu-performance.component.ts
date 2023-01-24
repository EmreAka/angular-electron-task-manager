import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';

@Component({
  selector: 'app-cpu-performance',
  templateUrl: './cpu-performance.component.html',
  styleUrls: ['./cpu-performance.component.scss']
})
export class CpuPerformanceComponent implements OnInit {
  cpuUsage: number = 0

  cpuResources: any = [{
    name: "CPU",
    series: [

    ]
  }];


  view: [number, number] = [700, 300];
  // options
  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = false;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Usage';
  timeline: boolean = false;
  colorScheme: any = {
    domain: ['#0081B4', '#FFFBF5', '#FFFBF5', '#FFFBF5', '#FFFBF5', '#FFFBF5'],
    label: ['#0081B4']
  };



  constructor(private performanceService: PerformanceService) { }

  ngOnInit(): void {
    this.performanceService.getCpuUsage().subscribe({
      next: (value) => {
        this.cpuUsage = value
        if (this.cpuResources[0].series.length > 20) {
          this.cpuResources[0].series.shift()
        }
        this.cpuResources[0].series.push({ name: Date().toString(), value: value })
        this.cpuResources = [...this.cpuResources]
      }
    })
  }

}
