import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../models/producto.model';
import { ProductoService } from '../../../../service/producto/producto.service';

@Component({
  selector: 'app-productos-bajo-stock',
  templateUrl: './productos-bajo-stock.html',
  styleUrls: ['./productos-bajo-stock.css']
})
export class ProductosBajoStock implements OnInit {

  productos: Producto[] = [];
  threshold: number = 10; // stock mínimo para considerar bajo

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.loadProductosBajoStock();
  }

  loadProductosBajoStock(): void {
    this.productoService.getBajoStock(this.threshold).subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error cargando productos bajo stock:', err)
    });
  }

  // Método opcional para mostrar un color según el stock
  getColor(producto: Producto): string {
    if (producto.stock === 0) return 'danger';
    if (producto.stock <= 5) return 'warning';
    return 'success';
  }

  // Método opcional para asignar iconos según categoría
  getIcono(producto: Producto): string {
    switch (producto.categoria.toLowerCase()) {
      case 'periféricos': return 'fas fa-keyboard';
      case 'almacenamiento': return 'fas fa-hdd';
      case 'monitores': return 'fas fa-desktop';
      case 'audio': return 'fas fa-headphones';
      default: return 'fas fa-box';
    }
  }
}
