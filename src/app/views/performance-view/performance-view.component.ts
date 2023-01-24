import { Component, OnDestroy, OnInit } from '@angular/core';
import { PerformanceService } from './services/performance.service';

@Component({
  selector: 'app-performance-view',
  templateUrl: './performance-view.component.html',
  styleUrls: ['./performance-view.component.scss']
})
export class PerformanceViewComponent implements OnInit, OnDestroy {
  cpuUsage: number = 0
  ramUsage: number = 0

  cpuResources: any = [{
    name: "CPU",
    series: [
      
    ]
  }];

  ramResources: any = [{
    name: "RAM",
    series: [
      
    ]
  }];

  constructor(private performanceService: PerformanceService) { }

  ngOnDestroy(): void {
    this.performanceService.stopRequesting();
  }

  ngOnInit(): void {
    this.performanceService.startRequesting();
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

    this.performanceService.getRamUsage().subscribe({
      next: (value) => {
        this.ramUsage = value
        if (this.ramResources[0].series.length > 20) {
          this.ramResources[0].series.shift()
        }
        this.ramResources[0].series.push({ name: Date().toString(), value: value })
        this.ramResources = [...this.ramResources]
      }
    })
  }
}
