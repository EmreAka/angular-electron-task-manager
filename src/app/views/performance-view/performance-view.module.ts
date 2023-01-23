import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerformanceViewComponent } from './performance-view.component';

const routes: Routes = [
  {path:"", component: PerformanceViewComponent}
]

@NgModule({
  declarations: [PerformanceViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class PerformanceViewModule { }
