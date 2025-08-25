import { Component } from '@angular/core';

interface Producto {
  id:number,
  nombre: string;
  codigo: string;
  stock: number;
  icono: string; // para el icono de FontAwesome
  color: string; // para bg-success, bg-warning, etc.
}

@Component({
  selector: 'app-productos-bajo-stock',
  templateUrl: './productos-bajo-stock.html',
  styleUrls: ['./productos-bajo-stock.css']
})
export class ProductosBajoStock {
  productos: Producto[] = [
    { id:1, nombre: 'Monitor 24"', codigo: 'MON-012', stock: 5, icono: 'fas fa-headphones', color: 'success' },
    { id:2, nombre: 'Teclado Mecánico', codigo: 'TEC-034', stock: 3, icono: 'fas fa-keyboard', color: 'danger' },
    { id:3, nombre: 'Mouse Gamer', codigo: 'MOU-056', stock: 2, icono: 'fas fa-mouse', color: 'warning' }
  ];
}
