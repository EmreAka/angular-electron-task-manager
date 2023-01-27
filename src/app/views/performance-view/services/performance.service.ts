import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ElectronService } from '../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private intervalId: any = null;

  isWide: boolean = false;

  private cpuUptime = new BehaviorSubject<any>(null);
  private cpuUptime$ = this.cpuUptime.asObservable()

  private cpuUsage = new BehaviorSubject<number>(0)
  private cpuUsage$ = this.cpuUsage.asObservable()

  private ramUsage = new BehaviorSubject<number>(0)
  private ramUsage$ = this.ramUsage.asObservable()

  private cpuInformation =new BehaviorSubject<string | null | any>(null);
  private cpuInformation$ = this.cpuInformation.asObservable()

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
      this.ramUsage.next(+(data * 100).toFixed(2))
    });

    this.getCpuInfo()

    this.setCpuUptime()
  }

  getCpuUsage() {
    return this.cpuUsage$
  }

  getRamUsage() {
    return this.ramUsage$
  }

  startRequesting() {
    if (this.intervalId === null) {
      this.intervalId = setInterval(() => {
        this.electronService.ipcRenderer.send('ram-request');
        this.electronService.ipcRenderer.send('cpu-request');
        this.electronService.ipcRenderer.send('cpu-uptime-request')
      }, 500)
    }
  }

  stopRequesting() {
    clearInterval(this.intervalId)
    this.intervalId = null;
  }

  private getCpuInfo(): void {
    this.electronService.ipcRenderer.on('cpu-info-response', (event, data) => {
      this.cpuInformation.next(data)
    })
    this.electronService.ipcRenderer.send('cpu-info-request');
  }

  private setCpuUptime():void {
    this.electronService.ipcRenderer.on('cpu-uptime-response', (event, data) => {
      this.cpuUptime.next(data)
    })
  }

  getCpuUptime(){
    return this.cpuUptime$;
  }

  getCpuInformation(){
    return this.cpuInformation$;
  }
}
