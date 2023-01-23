import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsViewComponent } from './applications-view.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", component: ApplicationsViewComponent}
]

@NgModule({
  declarations: [ApplicationsViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class ApplicationsViewModule { }
