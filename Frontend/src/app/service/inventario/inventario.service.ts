import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductoInventario } from '../../models/producto-inventario.models';
import { EstadisticasInventario, ProductoStock } from '../../models/inventario.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getContenidoInventario(id: number): Observable<ProductoInventario[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inventarios/${id}/contenido/`).pipe(
      map(data => data.map(item => ({
        productoId: item['producto__idProducto'],
        nombre: item['producto__nombre'],
        codigo: item['producto__codigo'],
        entradas: item['entradas'],
        salidas: item['salidas'],
        stock: item['stock'],
        categoria: item['producto__categoria'] ?? "n/d",
        estado: item['stock'] > 0 ? 'Disponible' : 'Agotado'
      })))
    );
  }

  getEstadisticas(): Observable<EstadisticasInventario> {
    return this.http.get<EstadisticasInventario>(`${this.apiUrl}/detalle-operaciones/estadisticas/`);
  }

  getProductosBajoStock(umbral: number = 5): Observable<ProductoStock[]> {
    return this.http.get<ProductoStock[]>(`${this.apiUrl}/detalle-operaciones/productos_bajo_stock/?umbral=${umbral}`);
  }

  getProductosMasSalida(top: number = 10): Observable<ProductoStock[]> {
    return this.http.get<ProductoStock[]>(`${this.apiUrl}/detalle-operaciones/productos_mas_salida/?top=${top}`);
  }

  getFrecuenciaPedido(top: number = 10): Observable<ProductoStock[]> {
    return this.http.get<ProductoStock[]>(`${this.apiUrl}/detalle-operaciones/frecuencia_pedido/?top=${top}`);
  }
}