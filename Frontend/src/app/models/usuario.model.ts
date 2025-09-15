export interface Usuario {
  id?: number;           // ID único del usuario en la BD 
  nombreCompleto: string; 
  correo: string;       
  contrasena: string;   
}

export interface LoginRequest {
  email: string;    // Email ingresado en el formulario de acceso
  password: string; // Contraseña ingresada en el formulario 
}

export interface LoginResponse {
  success: boolean;   // Indica si el acceso fue exitoso o falló
  usuario?: Usuario;  // Datos del usuario que accede (si success=true)
  token?: string;     // Token de autenticación generado si success=true (por ahora simulado)
  message?: string;   // Mensaje de resultado (error o éxito)
}
