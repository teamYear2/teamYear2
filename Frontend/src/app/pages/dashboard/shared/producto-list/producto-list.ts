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
  esAdmin: boolean = false;


  constructor(
    private router: Router,
    private inventarioService: InventarioService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    const idInventario = localStorage.getItem('idInventario');
    const rol = localStorage.getItem('rol');
    this.esAdmin = rol === 'adm';
    this.loadProductos(Number(idInventario));
  }

  loadProductos(inventarioActual:number): void {
    this.inventarioService.getContenidoInventario(inventarioActual).subscribe({
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

  confirmarEliminacion(id: number): void {
    this.confirmacionId = id;
  }

  cancelarEliminacion(): void {
    this.confirmacionId = null;
  }

  eliminarProductoConfirmado(): void {
    if (!this.confirmacionId) return;

    this.productoService.deleteProducto(this.confirmacionId).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.productoId !== this.confirmacionId);
        if (this.selectedProduct?.productoId === this.confirmacionId) this.selectedProduct = null;
        this.mostrarAlerta('success', 'Producto eliminado correctamente');
        this.confirmacionId = null;
      },
      error: (err) => {
        this.mostrarAlerta('danger', 'Error eliminando producto: ' + err.message);
        this.confirmacionId = null;
      }
    });
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.product-row')) {
      this.selectedProduct = null;
    }
  }

  alerta: { tipo: 'success' | 'danger', mensaje: string } | null = null;
  confirmacionId: number | null = null;

  mostrarAlerta(tipo: 'success' | 'danger', mensaje: string) {
    this.alerta = { tipo, mensaje };
    setTimeout(() => this.alerta = null, 4000);
  }


}
