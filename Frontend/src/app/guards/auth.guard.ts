import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios/usuarios.service';

export const authGuard = () => {
  const usuariosService = inject(UsuariosService);
  const router = inject(Router);

  if (usuariosService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
