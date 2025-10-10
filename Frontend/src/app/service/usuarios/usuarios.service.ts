import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';
import { Usuario, LoginRequest, LoginResponse } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:8000/api';
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Cargar usuario desde localStorage al inicializar
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // ---------------- AUTENTICACIÓN ----------------

  // Iniciar sesión
  login(loginData: LoginRequest): Observable<LoginResponse> {
    // Datos para enviar a Django
    const loginPayload = {
      email: loginData.email,
      contrasena: loginData.password
    };

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login/`, loginPayload)
      .pipe(
        map(response => {
          if (response.success && response.usuario) {
            // Guardar en localStorage
            localStorage.setItem('currentUser', JSON.stringify(response.usuario));
            localStorage.setItem('authToken', response.token || '');
            
            // Actualizar BehaviorSubject
            this.currentUserSubject.next(response.usuario);
          }
          return response;
        }),
        catchError(error => {
          console.error('Error en login:', error);
          return of({
            success: false,
            message: 'Error del servidor'
          });
        })
      );
  }

  // Registrar usuario
  registro(usuario: Usuario): Observable<LoginResponse> {
    // Datos para enviar a Django - necesitamos confirmar_contrasena
    const registroPayload = {
      dni: usuario.dni,
      idInventario: usuario.idInventario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      telefono: usuario.telefono,
      contrasena: usuario.contrasena,
      confirmar_contrasena: usuario.contrasena, // Mismo valor que contrasena
      referido: usuario.referido
    };

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/registro/`, registroPayload)
      .pipe(
        map(response => {
          // Solo retornar la respuesta, NO hacer auto-login
          // El usuario tendrá que hacer login manualmente después del registro
          return response;
        }),
        catchError(error => {
          console.error('Error en registro:', error);
          return of({
            success: false,
            message: 'Error del servidor'
          });
        })
      );
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // Obtener usuario actual
  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  // ---------------- UTILIDADES ----------------

  // Generar token falso para simulación
  private generateFakeToken(usuario: Usuario): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      dni: usuario.dni, 
      email: usuario.email,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
    }));
    const signature = btoa('fake-signature');
    
    return `${header}.${payload}.${signature}`;
  }

  // Verificar si el token es válido (simulado)
  isTokenValid(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now();
    } catch {
      return false;
    }
  }
}
