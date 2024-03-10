import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isShowing = true;
  allMatchesToggle: boolean = true;

// This method is used to toggle sideNav
toggleSidenav() {
    this.isShowing = !this.isShowing;
}

// This method is used to toggle view between all venues and saved venues based on user selection
toggleView(bool: boolean) {
  this.allMatchesToggle = bool;
}
 
}
