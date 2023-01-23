import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isWide: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  getSidebarClass(){
    if (this.isWide) {
      return 'w-80 px-1'
    }
    return 'w-14 items-center'
  }

  setSidebarWide(){
    this.isWide = !this.isWide
  }

}
