import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-hamburgesa-dashboard',
  imports: [],
  templateUrl: './navbar-hamburgesa-dashboard.html',
  styleUrl: './navbar-hamburgesa-dashboard.css'
})
export class NavbarHamburgesaDashboard {
  activeSection: string = '/'; // sección inicial activa
  isSidebarOpen: boolean = false;
  constructor(private router: Router) {}

  changeSection(section: string) {
    this.activeSection = section;           // marcar la sección como activa
    this.router.navigate([`/${section}`]); // navegar
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
