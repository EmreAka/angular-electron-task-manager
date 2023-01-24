import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ElectronService } from '../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  private intervalId: any = null;

  private cpuUsage = new BehaviorSubject<number>(0)
  private cpuUsage$ = this.cpuUsage.asObservable()

  constructor(private electronService: ElectronService) {
    this.subscribe()
  }

  private subscribe() {
    this.electronService.ipcRenderer.on('cpu-response', (event, data) => {
      const usagePercentage = (data.currentLoad).toFixed(2) + '%';
      this.cpuUsage.next(+(data.currentLoad).toFixed(2))
    });

    this.electronService.ipcRenderer.on('ram-response', (event, data) => {
      const usagePercentage = (data * 100).toFixed(2) + '%';
    });
  }

  getCpuUsage() {
    return this.cpuUsage$
  }

  startRequesting() {
    if (this.intervalId === null) {
      this.intervalId = setInterval(() => {
        this.electronService.ipcRenderer.send('ram-request');
        this.electronService.ipcRenderer.send('cpu-request');
      }, 500)
    }
  }

  stopRequesting() {
    clearInterval(this.intervalId)
    this.intervalId = null;
  }
}
