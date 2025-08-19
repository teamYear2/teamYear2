import { Component } from '@angular/core';
import { NavbarDashboard } from "./shared/navbar-dashboard/navbar-dashboard";
import { InventarioTarjetasMetricas } from "./shared/inventario-tarjetas-metricas/inventario-tarjetas-metricas";
import { InventarioMovimiento } from "./shared/inventario-movimiento/inventario-movimiento";
import { ProductosBajoStock } from "./shared/productos-bajo-stock/productos-bajo-stock";
import { ProductosMasVendidos } from "./shared/productos-mas-vendidos/productos-mas-vendidos";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarDashboard, InventarioTarjetasMetricas, InventarioMovimiento, ProductosBajoStock, ProductosMasVendidos, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
