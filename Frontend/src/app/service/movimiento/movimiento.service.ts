import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Movimiento } from '../../models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  // ---------------- MOVIMIENTOS ----------------

  // Obtener todos los movimientos (detalle operaciones)
  getMovimientos(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(`${this.apiUrl}/api/detalle-operaciones/`);
  }

  // Obtener movimiento por ID
  getMovimientoPorId(id: number): Observable<Movimiento> {
    return this.http.get<Movimiento>(`${this.apiUrl}/api/detalle-operaciones/${id}/`);
  }

  // Crear un movimiento
  createMovimiento(movimiento: any): Observable<Movimiento> {
    return this.http.post<Movimiento>(`${this.apiUrl}/api/detalle-operaciones/`, movimiento);
  }

}
