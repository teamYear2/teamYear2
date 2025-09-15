import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UsuarioRegistro } from '../../models/usuariosRegistro.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:3000/usuariosRegistro';
  
  constructor(private http:HttpClient){
  }

  verificarDni(dni: string): Observable<{ existe: boolean }> {
    return this.http.get<UsuarioRegistro[]>(`${this.apiUrl}?dni=${dni}`).pipe(
      map(usuarios => ({ existe: usuarios.length > 0 }))
    );
  }

  registrarUsuario(data: UsuarioRegistro): Observable<UsuarioRegistro> {
    return this.http.post<UsuarioRegistro>(this.apiUrl, data);
  }
}
