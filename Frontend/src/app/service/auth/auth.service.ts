import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';
import { Usuario, LoginRequest, LoginResponse } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';
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
    return this.http.get<Usuario[]>(`${this.apiUrl}/Usuarios?correo=${loginData.email}&contrasena=${loginData.password}`)
      .pipe(
        map(usuarios => {
          if (usuarios.length > 0) {
            const usuario = usuarios[0];
            // Generar token simulado
            const token = this.generateFakeToken(usuario);
            
            // Guardar en localStorage
            localStorage.setItem('currentUser', JSON.stringify(usuario));
            localStorage.setItem('authToken', token);
            
            // Actualizar BehaviorSubject
            this.currentUserSubject.next(usuario);
            
            return {
              success: true,
              usuario: usuario,
              token: token,
              message: 'Inicio de sesión exitoso'
            };
          } else {
            return {
              success: false,
              message: 'Credenciales incorrectas'
            };
          }
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
      id: usuario.id, 
      correo: usuario.correo,
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
