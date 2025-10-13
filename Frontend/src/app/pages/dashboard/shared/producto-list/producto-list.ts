import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventarioService } from '../../../../service/inventario/inventario.service';
import { ProductoInventario } from '../../../../models/producto-inventario.models';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../../service/producto/producto.service';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-list.html',
  styleUrls: ['./producto-list.css']
})
export class ProductoList implements OnInit {

  productos: ProductoInventario[] = [];
  selectedProduct: ProductoInventario | null = null;

  constructor(
    private router: Router,
    private inventarioService: InventarioService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    const inventarioId = 1; // O el ID dinámico que recibas
    this.inventarioService.getContenidoInventario(inventarioId).subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error cargando contenido del inventario:', err)
    });
  }


  changeSection(section: string, producto?: ProductoInventario): void {
    if (producto) {
      this.router.navigate([`/${section}`, producto.productoId]);
    } else {
      this.router.navigate([`/${section}`]);
    }
  }

  selectProduct(p: ProductoInventario): void {
    this.selectedProduct = p;
  }

  deleteProducto(id: number): void {
    if (!confirm('¿Eliminar este producto?')) return;

    this.productoService.deleteProducto(id).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.productoId !== id);
        if (this.selectedProduct?.productoId === id) this.selectedProduct = null;
      },
      error: (err) => console.error('Error eliminando producto:', err)
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.product-row')) {
      this.selectedProduct = null;
    }
  }

}
