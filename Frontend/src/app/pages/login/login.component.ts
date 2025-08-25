import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login {
  loginForm: FormGroup;
  mostrarToast: boolean = false;
  mensajeToast: string = '';
  tipoToast: 'success' | 'danger' = 'success';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario válido:', this.loginForm.value);
      this.mensajeToast = '¡Bienvenido!';
      this.tipoToast = 'success';
    } else {
      console.log('Formulario inválido');
      this.mensajeToast = 'Por favor revisa los campos.';
      this.tipoToast = 'danger';
      this.markFormGroupTouched();
    }

    this.mostrarToast = true;

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
}
