import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-dashboard',
  imports: [CommonModule],
  templateUrl: './navbar-dashboard.html',
  styleUrls: ['./navbar-dashboard.css']
})
export class NavbarDashboard {
  activeSection: string = '/dashboard'; // sección inicial activa

  constructor(private router: Router) {}

  changeSection(section: string) {
    // Garantiza que la sección siempre tenga barra inicial
    this.activeSection = section.startsWith('/') ? section : '/' + section;
    this.router.navigate([this.activeSection]);
  }
}
