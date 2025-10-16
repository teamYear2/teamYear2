import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimientoService } from '../../../../service/movimiento/movimiento.service';

interface ProductoVendido {
  producto_id: number;
  producto__nombre: string;
  total_salidas: number;
}

@Component({
  selector: 'app-productos-mas-vendidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-mas-vendidos.html',
  styleUrls: ['./productos-mas-vendidos.css']
})
export class ProductosMasVendidos implements OnInit {
  productos: ProductoVendido[] = [];
  maxUnidades: number = 0;

  constructor(private movimientoService: MovimientoService) {}

  ngOnInit(): void {
    this.loadProductosMasVendidos();
  }

  loadProductosMasVendidos(): void {
    // Obtenemos todos los movimientos y calculamos los más vendidos en el frontend
    this.movimientoService.getMovimientos().subscribe({
      next: (movimientos: any[]) => {
        // Agrupar salidas por producto
        const productosMap = new Map<number, ProductoVendido>();
        
        movimientos.forEach(mov => {
          if (mov.tipo_operacion === 'salida') {
            const productoId = mov.producto.idProducto;
            const productoNombre = mov.producto.nombre;
            
            if (!productosMap.has(productoId)) {
              productosMap.set(productoId, {
                producto_id: productoId,
                producto__nombre: productoNombre,
                total_salidas: 0
              });
            }
            
            const producto = productosMap.get(productoId)!;
            producto.total_salidas += mov.cantidad;
          }
        });
        
        // Ordenar por total de salidas (más vendidos primero) y tomar los top 10
        this.productos = Array.from(productosMap.values())
          .sort((a, b) => b.total_salidas - a.total_salidas)
          .slice(0, 10);
        
        // Calcular el máximo para las barras de progreso
        this.maxUnidades = this.productos.length 
          ? Math.max(...this.productos.map(p => p.total_salidas)) 
          : 0;
      },
      error: (err) => console.error('Error cargando productos más vendidos:', err)
    });
  }

  getWidth(producto: ProductoVendido): string {
    if (!this.maxUnidades) return '0%';
    return ((producto.total_salidas / this.maxUnidades) * 100).toFixed(0) + '%';
  }

  getColor(producto: ProductoVendido): string {
    if (producto.total_salidas >= this.maxUnidades * 0.75) return 'bg-success';
    if (producto.total_salidas >= this.maxUnidades * 0.50) return 'bg-warning';
    return 'bg-danger';
  }
}
