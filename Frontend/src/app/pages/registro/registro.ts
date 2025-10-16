import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UsuariosService } from '../../service/usuarios/usuarios.service';
import { Usuario } from '../../models/usuario.model';

declare var bootstrap: any;

@Component({
  selector: 'app-registro',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro implements AfterViewInit {

  formRegistro!: FormGroup;
  mostrarToast: boolean = false;
  mensajeToast: string = '';
  tipoToast: 'success' | 'danger' = 'success';

  constructor(private formbuilder: FormBuilder, private usuariosService: UsuariosService, private router: Router) {

    this.formRegistro = this.formbuilder.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        apellido: ['', [Validators.required, Validators.minLength(3)]],
        dni: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]+$')]],
        telefono: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
        correo: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        confirmarContrasena: ['', [Validators.required]],
        referido: [{ value: '', disabled: true }, [Validators.required, Validators.email]]
      },
      {
        validators: this.passwordsIgualesValidator
      }
    )
  }

  passwordsIgualesValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('contrasena')?.value;
    const confirm = group.get('confirmarContrasena')?.value;
    return pass === confirm ? null : { contrasenasNoCoinciden: true };
  }

    registrar() {
    if (this.formRegistro.invalid) {
      this.mostrarMensaje('Formulario inválido. Por favor revisa los campos.', 'danger');
      return;
    }

    // Crear objeto usuario con la estructura correcta para Django
    const usuario: Usuario = {
      dni: Number(this.formRegistro.get('dni')?.value),
      idInventario: 1, // Por ahora hardcodeado, después se puede hacer dinámico
      nombre: this.formRegistro.get('nombre')?.value,
      apellido: this.formRegistro.get('apellido')?.value,
      email: this.formRegistro.get('correo')?.value,
      telefono: Number(this.formRegistro.get('telefono')?.value),
      contrasena: this.formRegistro.get('contrasena')?.value,
      referido: this.formRegistro.get('referido')?.value
    };

    // Usar UsuariosService unificado para registro
    this.usuariosService.registro(usuario).subscribe({
      next: (response) => {
        if (response.success) {
          this.mostrarMensaje('¡Registro exitoso! Redirigiendo al login...', 'success');
          this.formRegistro.reset();
          
          // Redireccionar al login después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.mostrarMensaje(response.message || 'Error al registrar usuario.', 'danger');
        }
      },
      error: (error) => {
        // Manejar errores específicos del servidor
        if (error.error && error.error.message) {
          const errorMessage = error.error.message;
          
          // Verificar si es error de referido inexistente
          if (errorMessage.includes('referido no existe')) {
            this.mostrarMensaje('Referido inexistente - verifique email', 'danger');
          } else {
            this.mostrarMensaje(errorMessage, 'danger');
          }
        } else {
          this.mostrarMensaje('Error del servidor al registrar usuario.', 'danger');
        }
      }
    });
  }

  private mostrarMensaje(mensaje: string, tipo: Registro['tipoToast']) {
    this.mensajeToast = mensaje;
    this.tipoToast = tipo;
    this.mostrarToast = true;

    setTimeout(() => {
      this.mostrarToast = false;
    }, 3000);
  }

  ngAfterViewInit(): void {
    const myCarousel = document.querySelector('#carouselRegistro');
    if (myCarousel) {
      new bootstrap.Carousel(myCarousel, {
        interval: 3000,
        ride: 'carousel'
      });
    }
  }

  CheckReferido(event: Event) {
    const input = event.target as HTMLInputElement;
    const referidoCtrl = this.formRegistro.get('referido');

    if (input.checked) {
      referidoCtrl?.enable();
    } else {
      referidoCtrl?.disable();
      referidoCtrl?.reset();
    }
  }
}
