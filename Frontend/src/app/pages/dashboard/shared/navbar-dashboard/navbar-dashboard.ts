import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar-dashboard.html',
  styleUrls: ['./navbar-dashboard.css']
})
export class NavbarDashboard implements OnInit {
  activeSection: string = '/dashboard'; // sección inicial activa
  esAdmin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
  const rol = localStorage.getItem('rol');
  this.esAdmin = rol === 'adm';
}


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
