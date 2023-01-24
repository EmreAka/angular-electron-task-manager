import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerformanceViewComponent } from './performance-view.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TabComponent } from './components/tab/tab.component';

const routes: Routes = [
  {path:"", component: PerformanceViewComponent}
]

@NgModule({
  declarations: [PerformanceViewComponent, TabComponent],
  imports: [
    CommonModule,
    NgxChartsModule,
    RouterModule.forChild(routes)
  ],
})
export class PerformanceViewModule { }
