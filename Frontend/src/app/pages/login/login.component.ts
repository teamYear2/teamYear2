import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { LoginRequest } from '../../models/usuario.model';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login implements AfterViewInit {
  loginForm: FormGroup;
  mostrarToast: boolean = false;
  mensajeToast: string = '';
  tipoToast: 'success' | 'danger' = 'success';
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.cargando = true;
      const loginData: LoginRequest = this.loginForm.value;
      
      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.cargando = false;
          if (response.success) {
            this.mensajeToast = `¡Bienvenido ${response.usuario?.nombreCompleto || 'Usuario'}!`;
            this.tipoToast = 'success';
            this.mostrarToast = true;
            
            // Redirigir al dashboard después de 1 segundo
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 1000);
          } else {
            this.mensajeToast = response.message || 'Error en el inicio de sesión';
            this.tipoToast = 'danger';
            this.mostrarToast = true;
          }
        },
        error: (error) => {
          this.cargando = false;
          console.error('Error en login:', error);
          this.mensajeToast = 'Error del servidor. Intenta nuevamente.';
          this.tipoToast = 'danger';
          this.mostrarToast = true;
        }
      });
    } else {
      console.log('Formulario inválido');
      this.mensajeToast = 'Por favor revisa los campos.';
      this.tipoToast = 'danger';
      this.markFormGroupTouched();
      this.mostrarToast = true;
    }

    // Auto-ocultar toast después de 3 segundos
    setTimeout(() => this.mostrarToast = false, 3000);
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Métodos para obtener errores específicos del formulario reactivo
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngAfterViewInit(): void {
    const myCarousel = document.querySelector('#carouselLogin');
    if (myCarousel) {
      new bootstrap.Carousel(myCarousel, {
        interval: 3000,
        ride: 'carousel'
      });
    }
  }
}
