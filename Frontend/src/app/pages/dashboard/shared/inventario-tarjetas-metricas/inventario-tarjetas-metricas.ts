import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../../models/producto.model';
import { ProductoService } from '../../../../service/producto/producto.service';
import { InventarioService } from '../../../../service/inventario/inventario.service';
import { EstadisticasInventario, OperacionDetalle, ProductoStock } from '../../../../models/inventario.model';

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
  totalEntradas: number = 0;
  totalSalidas: number = 0;
  stockGeneral: number = 0;
  totalOperaciones: number = 0;
  ultimasOperaciones: OperacionDetalle[] = [];

  constructor(
    private productoService: ProductoService,
    private inventarioService: InventarioService
  ) {}

  ngOnInit(): void {
    // Cargar productos
    this.productoService.getProductos().subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
        this.total = data.length;
      },
      error: (error: Error) => console.error('Error cargando productos:', error)
    });

    // Cargar estadísticas de inventario
    this.inventarioService.getEstadisticas().subscribe({
      next: (data: EstadisticasInventario) => {
        this.totalEntradas = data.total_entradas;
        this.totalSalidas = data.total_salidas;
        this.stockGeneral = data.stock_general;
        this.totalOperaciones = data.total_operaciones;
        this.ultimasOperaciones = data.ultimas_operaciones;
      },
      error: (error: Error) => console.error('Error cargando estadísticas:', error)
    });

    // Cargar productos bajo stock
    this.inventarioService.getProductosBajoStock(5).subscribe({
      next: (data: ProductoStock[]) => {
        this.bajoStock = data.length;
        this.agotados = data.filter(producto => producto.stock <= 0).length;
        this.disponibles = this.total - this.agotados;
      },
      error: (error: Error) => console.error('Error cargando productos bajo stock:', error)
    });
  }
}
