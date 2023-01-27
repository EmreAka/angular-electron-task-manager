import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, delay, filter, map, pipe, switchMap, timer } from 'rxjs';
import { PerformanceService } from '../../../views/performance-view/services/performance.service';

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

  constructor(private performanceService: PerformanceService) { }

  ngOnInit(): void {

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
    this.performanceService.isWide = this.isWide;
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
