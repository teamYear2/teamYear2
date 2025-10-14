import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductoInventario } from '../../models/producto-inventario.models';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://127.0.0.1:8000/api/inventarios';

  constructor(private http: HttpClient) {}

  getContenidoInventario(id: number): Observable<ProductoInventario[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/contenido/`).pipe(
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
}