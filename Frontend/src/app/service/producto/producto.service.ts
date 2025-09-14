import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Producto } from '../../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  // ---------------- PRODUCTOS ----------------

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/Productos`);
  }

  // Obtener producto por ID
  getProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/Productos/${id}`);
  }

  // Crear un producto
  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/Productos`, producto);
  }

  // Editar un producto
  updateProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/Productos/${producto.id}`, producto);
  }

  // Eliminar un producto
  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Productos/${id}`);
  }

  // Productos más vendidos (ordenados por unidadesVendidas desc)
  getMasVendidos(): Observable<Producto[]> {
    return this.getProductos().pipe(
      map(products => products.sort((a, b) => b.unidadesVendidas - a.unidadesVendidas))
    );
  }

  // Productos con stock bajo (threshold = 10 por defecto)
  getBajoStock(threshold: number = 10): Observable<Producto[]> {
    return this.getProductos().pipe(
      map(products => products.filter(p => p.stock <= threshold))
    );
  }
}  
