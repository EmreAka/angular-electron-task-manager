import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from '../../core/services';

@Component({
  selector: 'app-performance-view',
  templateUrl: './performance-view.component.html',
  styleUrls: ['./performance-view.component.scss']
})
export class PerformanceViewComponent implements OnInit, OnDestroy{

  intervalId: any = null
  cpuUsage: string = ""
  ramUsage: string = ""

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

}
