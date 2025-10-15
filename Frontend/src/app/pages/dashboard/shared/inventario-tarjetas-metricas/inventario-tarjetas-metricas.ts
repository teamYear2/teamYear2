import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../../models/producto.model';
import { ProductoService } from '../../../../service/producto/producto.service';

@Component({
  selector: 'app-inventario-tarjetas-metricas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventario-tarjetas-metricas.html',
  styleUrls: ['./inventario-tarjetas-metricas.css']
})
export class InventarioTarjetasMetricas implements OnInit {
  
  productos: Producto[] = [];
  total: number = 0;
  disponibles: number = 0;
  bajoStock: number = 0;
  agotados: number = 0;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.total = data.length;
        // this.disponibles = data.filter(producto => producto.estado === 'Disponible').length;
        // this.bajoStock = data.filter(producto => producto.stock <= 10 && producto.stock > 0).length;
        // this.agotados = data.filter(producto => producto.estado === 'Agotado' || producto.stock === 0).length;
      },
      error: (err) => console.error('Error cargando productos:', err)
    });
  }
}
