import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../../../service/producto/producto.service';
import { Producto } from '../../../../models/producto.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-list.html',
  styleUrls: ['./producto-list.css']
})
export class ProductoList implements OnInit {

  productos: Producto[] = [];
  selectedProduct: Producto | null = null;

  constructor(
    private router: Router, 
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error cargando productos:', err)
    });
  }

  changeSection(section: string, producto?: Producto): void {
    if (producto) {
      this.router.navigate([`/${section}`, producto.id]);
    } else {
      this.router.navigate([`/${section}`]);
    }
  }

  selectProduct(p: Producto): void {
    this.selectedProduct = p;
  }

  deleteProducto(id: number): void {
    if (!confirm('¿Eliminar este producto?')) return;

    this.productoService.deleteProducto(id).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.id !== id);
        if (this.selectedProduct?.id === id) this.selectedProduct = null;
      },
      error: (err) => console.error('Error eliminando producto:', err)
    });
  }

  incrementStock(producto: Producto): void {
    producto.stock += 1;
    
    // TODO: Implementar llamada al servicio de DetalleOperaciones cuando esté disponible
    console.log('Ingreso de stock:', {
      producto: producto.nombre,
      tipo: 'entrada',
      cantidad: 1,
      nuevoStock: producto.stock
    });

    // Actualizar en el backend (opcional por ahora)
    // this.productoService.updateProducto(producto).subscribe();
  }

  decrementStock(producto: Producto): void {
    if (producto.stock <= 0) {
      alert('No hay stock disponible para egresar');
      return;
    }

    producto.stock -= 1;
    
    // TODO: Implementar llamada al servicio de DetalleOperaciones cuando esté disponible
    console.log('Egreso de stock:', {
      producto: producto.nombre,
      tipo: 'salida',
      cantidad: 1,
      nuevoStock: producto.stock
    });

    // Actualizar en el backend (opcional por ahora)
    // this.productoService.updateProducto(producto).subscribe();
  }

  trackById(_: number, item: Producto): number {
    return item.id;
  }
}
