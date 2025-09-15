import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../../models/producto.model';
import { ProductoService } from '../../../../service/producto/producto.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-productos-mas-vendidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-mas-vendidos.html',
  styleUrls: ['./productos-mas-vendidos.css']
})
export class ProductosMasVendidos implements OnInit {
  productos: Producto[] = [];
  maxUnidades: number = 0;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getMasVendidos().subscribe({
      next: (data) => {
        this.productos = data;
        this.maxUnidades = data.length ? Math.max(...data.map(producto => producto.unidadesVendidas)) : 0;
      },
      error: (err) => console.error('Error cargando productos más vendidos:', err)
    });
  }

  getWidth(producto: Producto): string {
    if (!this.maxUnidades) return '0%';
    return ((producto.unidadesVendidas / this.maxUnidades) * 100).toFixed(0) + '%';
  }

  getColor(producto: Producto): string {
    if (producto.unidadesVendidas >= this.maxUnidades * 0.75) return 'bg-success';
    if (producto.unidadesVendidas >= this.maxUnidades * 0.50) return 'bg-warning';
    return 'bg-danger';
  }
}
