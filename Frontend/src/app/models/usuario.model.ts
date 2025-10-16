export interface Usuario {
  dni: number;           
  idInventario: number;  
  nombre: string;        
  apellido: string;      
  email: string;         
  telefono?: number;    
  contrasena: string;    
  referido?: string;     
}

export interface LoginRequest {
  email: string;    
  password: string; 
}

export interface RegistroRequest {
  dni: number;
  idInventario: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: number;
  contrasena: string;
  confirmar_contrasena: string;
  referido?: string;
}

export interface LoginResponse {
  success: boolean;   // Indica si el acceso fue exitoso o falló
  usuario?: Usuario;  
  token?: string;     // Token de autenticación generado si success=true - por ahora es simulado
  message?: string;   
}
