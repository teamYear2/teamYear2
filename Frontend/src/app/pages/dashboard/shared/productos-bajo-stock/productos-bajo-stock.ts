import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimientoService } from '../../../../service/movimiento/movimiento.service';

interface ProductoBajoStock {
  producto_id: number;
  producto__nombre: string;
  entradas: number;
  salidas: number;
  stock: number;
}

@Component({
  selector: 'app-productos-bajo-stock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-bajo-stock.html',
  styleUrls: ['./productos-bajo-stock.css']
})
export class ProductosBajoStock implements OnInit {

  productos: ProductoBajoStock[] = [];
  threshold: number = 10; // stock mínimo para considerar bajo

  constructor(private movimientoService: MovimientoService) {}

  ngOnInit(): void {
    this.loadProductosBajoStock();
  }

  loadProductosBajoStock(): void {
    // Obtenemos todos los movimientos y calculamos el stock en el frontend
    this.movimientoService.getMovimientos().subscribe({
      next: (movimientos: any[]) => {
        // Agrupar por producto y calcular stock
        const productosMap = new Map<number, ProductoBajoStock>();
        
        movimientos.forEach(mov => {
          const productoId = mov.producto.idProducto;
          const productoNombre = mov.producto.nombre;
          
          if (!productosMap.has(productoId)) {
            productosMap.set(productoId, {
              producto_id: productoId,
              producto__nombre: productoNombre,
              entradas: 0,
              salidas: 0,
              stock: 0
            });
          }
          
          const producto = productosMap.get(productoId)!;
          
          if (mov.tipo_operacion === 'entrada') {
            producto.entradas += mov.cantidad;
          } else if (mov.tipo_operacion === 'salida') {
            producto.salidas += mov.cantidad;
          }
          
          producto.stock = producto.entradas - producto.salidas;
        });
        
        // Filtrar productos con stock bajo el umbral y ordenar por stock
        this.productos = Array.from(productosMap.values())
          .filter(p => p.stock <= this.threshold)
          .sort((a, b) => a.stock - b.stock);
      },
      error: (err) => console.error('Error cargando productos bajo stock:', err)
    });
  }

  // Método para mostrar un color según el stock
  getColor(stock: number): string {
    if (stock === 0 || stock < 0) return 'danger';
    if (stock <= 5) return 'warning';
    return 'success';
  }

  // Método para asignar iconos por defecto
  getIcono(): string {
    return 'fas fa-box';
  }
}
