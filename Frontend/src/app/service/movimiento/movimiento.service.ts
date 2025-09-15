import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Movimiento } from '../../models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // ---------------- MOVIMIENTOS ----------------

  // Obtener todos los movimientos
  getMovimientos(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(`${this.apiUrl}/Movimientos`);
  }

  // Obtener movimientos de un producto específico
  getMovimientosPorProducto(productoId: number): Observable<Movimiento[]> {
  return this.http.get<Movimiento[]>(`${this.apiUrl}/Movimientos?productoId=${productoId}`);
}


  // Obtener movimiento por ID
  getMovimientoPorId(id: number): Observable<Movimiento> {
    return this.http.get<Movimiento>(`${this.apiUrl}/Movimientos/${id}`);
  }

  // Crear un movimiento
  createMovimiento(movimiento: Movimiento): Observable<Movimiento> {
    return this.http.post<Movimiento>(`${this.apiUrl}/Movimientos`, movimiento);
  }

  // Editar un movimiento
  updateMovimientoParcial(id: number, cambios: Partial<Movimiento>): Observable<Movimiento> {
  return this.http.patch<Movimiento>(`${this.apiUrl}/Movimientos/${id}`, cambios);
}


  // Eliminar un movimiento
  deleteMovimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Movimientos/${id}`);
  }
}
