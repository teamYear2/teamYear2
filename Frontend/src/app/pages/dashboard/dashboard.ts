import { Component, HostListener } from '@angular/core';
import { NavbarDashboard } from "./shared/navbar-dashboard/navbar-dashboard";
import { InventarioTarjetasMetricas } from "./shared/inventario-tarjetas-metricas/inventario-tarjetas-metricas";
//import { InventarioMovimiento } from "./shared/inventario-movimiento/inventario-movimiento";
//import { ProductosBajoStock } from "./shared/productos-bajo-stock/productos-bajo-stock";
// import { ProductosMasVendidos } from "./shared/productos-mas-vendidos/productos-mas-vendidos";
import { Router } from '@angular/router';
import { NavbarHamburgesaDashboard } from './shared/navbar-hamburgesa-dashboard/navbar-hamburgesa-dashboard';
import { ProductoForm } from "./shared/producto-form/producto-form";
import { ProductoList } from "./shared/producto-list/producto-list";
import { CategoriaList } from "./shared/categoria-list/categoria-list";
import { CategoriaForm } from "./shared/categoria-form/categoria-form";
import { InventarioOperaciones } from "./shared/inventario-operaciones/inventario-operaciones";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarDashboard,
    InventarioTarjetasMetricas,
    //InventarioMovimiento,
    //ProductosBajoStock,
    //ProductosMasVendidos,
    NavbarHamburgesaDashboard,
    ProductoForm,
    ProductoList,
    CategoriaList,
    CategoriaForm,
    InventarioOperaciones
],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  currentUrl:string = '';
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
