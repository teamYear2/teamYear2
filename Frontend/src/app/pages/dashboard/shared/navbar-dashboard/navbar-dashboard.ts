import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-dashboard',
  imports: [CommonModule, RouterLink],
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

  cerrarSesion(): void {
  localStorage.clear(); // o removeItem si querés ser más específico
  this.router.navigate(['/login']);
}

}
