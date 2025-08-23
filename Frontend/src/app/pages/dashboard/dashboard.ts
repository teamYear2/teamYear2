import { Component, HostListener } from '@angular/core';
import { NavbarDashboard } from "./shared/navbar-dashboard/navbar-dashboard";
import { InventarioTarjetasMetricas } from "./shared/inventario-tarjetas-metricas/inventario-tarjetas-metricas";
import { InventarioMovimiento } from "./shared/inventario-movimiento/inventario-movimiento";
import { ProductosBajoStock } from "./shared/productos-bajo-stock/productos-bajo-stock";
import { ProductosMasVendidos } from "./shared/productos-mas-vendidos/productos-mas-vendidos";
import { Router, RouterOutlet } from '@angular/router';
import { NavbarHamburgesaDashboard } from './shared/navbar-hamburgesa-dashboard/navbar-hamburgesa-dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarDashboard,
    InventarioTarjetasMetricas,
    InventarioMovimiento,
    ProductosBajoStock,
    ProductosMasVendidos,
    RouterOutlet,
    NavbarHamburgesaDashboard
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  currentUrl = '';
  isMobile: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

  ngOnInit() {
    this.checkScreen();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreen();
  }

  private checkScreen() {
    this.isMobile = window.innerWidth < 1200;
  }
}
