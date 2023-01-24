import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from '../../core/services';

@Component({
  selector: 'app-performance-view',
  templateUrl: './performance-view.component.html',
  styleUrls: ['./performance-view.component.scss']
})
export class PerformanceViewComponent implements OnInit, OnDestroy {

  intervalId: any = null
  cpuUsage: string = ""
  ramUsage: string = ""

  multi: any = [{
    name: "patates",
    series: [
      {
        name: "sanane",
        value: 31
      },
      {
        name: "mal",
        value: 60
      },
      {
        name: "öküz",
        value: 20
      },
      {
        name: "salak",
        value: 100
      },
    ]
  }];
  view: [number, number] = [700, 300];
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };


  constructor(private electronService: ElectronService) { }

  ngOnDestroy(): void {
    clearInterval(this.intervalId)
  }

  ngOnInit(): void {
    this.electronService.ipcRenderer.on('cpu-response', (event, data) => {
      console.log(data.currentLoad);
      const usagePercentage = (data.currentLoad).toFixed(2) + '%';
      this.cpuUsage = usagePercentage
    });

    this.electronService.ipcRenderer.on('ram-response', (event, data) => {
      const usagePercentage = (data * 100).toFixed(2) + '%';
      console.log("RAM usage: " + usagePercentage);
      this.ramUsage = usagePercentage
    });

    this.intervalId = setInterval(() => {
      this.electronService.ipcRenderer.send('ram-request');
      this.electronService.ipcRenderer.send('cpu-request');
    }, 500)
  }

  onSelect(event) {
    console.log(event);
  }

}
