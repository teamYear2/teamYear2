import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:3000/usuarios';
  
  constructor(private http:HttpClient){
  }

  verificarDni(dni: string): Observable<{ existe: boolean }> {
    return this.http.get<any[]>(`${this.apiUrl}?dni=${dni}`).pipe(
      map(usuarios => ({ existe: usuarios.length > 0 }))
    );
  }

  registrarUsuario(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
