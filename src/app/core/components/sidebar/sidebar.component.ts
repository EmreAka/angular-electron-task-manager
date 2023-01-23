import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, delay, filter, map, pipe, switchMap, timer } from 'rxjs';
import { ElectronService } from '../../services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isWide: boolean = false;

  className: string = 'w-14 items-center'
  widthValue: string = 'w-14'
  show: boolean = false;

  selectedTab: 'APPS' | 'PERFORMANCE' | 'STARTUP' | 'PROCESSES' | 'SETTINGS' = 'APPS'

  private sidebarStyle = new BehaviorSubject<string>('items-center')
  private sidebarStyle$ = this.sidebarStyle.asObservable()

  private showTitle = new BehaviorSubject<boolean>(false);
  private showTitle$ = this.showTitle.asObservable();

  constructor(private electronService: ElectronService) { }

  ngOnInit(): void {
    this.electronService.ipcRenderer.on('cpu-response', (event, data) => {
      // const usagePercentage = (data * 100).toFixed(2) + '%';
      console.log(data.currentLoad); 
    });

    this.electronService.ipcRenderer.on('ram-response', (event, data) => {
      const usagePercentage = (data * 100).toFixed(2) + '%';
      console.log("RAM usage: " + usagePercentage); 
    });

    // setInterval(() => {
    //   this.electronService.ipcRenderer.send('ram-request');
    //   this.electronService.ipcRenderer.send('cpu-request');
    // }, 500)

    this.sidebarStyle$.pipe(
      filter(x => this.isWide),
      delay(300)
    ).subscribe({
      next: (value) => {
        this.className = value
      }
    })

    this.showTitle$.pipe(
      switchMap(val => timer(this.isWide ? 300 : 0).pipe(map(() => val))
      )).subscribe({
        next: (value) => {
          this.show = value;
        }
      })
  }

  getTabClass(tab: 'APPS' | 'PERFORMANCE' | 'STARTUP' | 'PROCESSES' | 'SETTINGS') {
    if (tab === this.selectedTab) {
      return 'bg-gray-700'
    }
    return ''
  }

  setSelectedTab(tab: 'APPS' | 'PERFORMANCE' | 'STARTUP' | 'PROCESSES' | 'SETTINGS') {
    this.selectedTab = tab;
  }

  getSidebarClass() {
    return this.sidebarStyle$
  }

  setSidebarWide() {
    this.isWide = !this.isWide
    if (this.isWide) {
      this.sidebarStyle.next('px-1')
      this.showTitle.next(true)
      this.widthValue = 'w-80'
    } else {
      this.sidebarStyle.next('items-center')
      this.showTitle.next(false)
      this.widthValue = 'w-14'
    }
  }

}
