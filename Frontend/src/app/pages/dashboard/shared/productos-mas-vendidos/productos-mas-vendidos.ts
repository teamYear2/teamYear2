import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos-mas-vendidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-mas-vendidos.html',
  styleUrls: ['./productos-mas-vendidos.css']
})
export class ProductosMasVendidos {
 productos = [
  { id: 1, nombre: 'Teclado Mecánico', unidades: 120, color: 'bg-success', widthClass: 'w-80' },
  { id: 2, nombre: 'Mouse Gamer', unidades: 95, color: 'bg-primary', widthClass: 'w-65' }
];

}
