import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerformanceViewComponent } from './performance-view.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TabComponent } from './components/tab/tab.component';
import { CpuPerformanceComponent } from './components/cpu-performance/cpu-performance.component';
import { SecondsToTimePipe } from './pipes/seconds-to-time-pipe.pipe';

const routes: Routes = [
  {path:"", component: PerformanceViewComponent, children: [{path:"", component: CpuPerformanceComponent}]},
]

@NgModule({
  declarations: [PerformanceViewComponent, TabComponent, CpuPerformanceComponent, SecondsToTimePipe],
  imports: [
    CommonModule,
    NgxChartsModule,
    RouterModule.forChild(routes)
  ],
})
export class PerformanceViewModule { }
