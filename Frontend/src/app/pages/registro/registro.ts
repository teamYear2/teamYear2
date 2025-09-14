import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuariosService } from '../../service/usuarios/usuarios.service';

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

  constructor(private formbuilder: FormBuilder, private usuariosService:UsuariosService) {

    this.formRegistro = this.formbuilder.group(
      {
        nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
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

    const dni = this.formRegistro.get('dni')?.value;

    this.usuariosService.verificarDni(dni).subscribe({
      next: (respuesta) => {
        if (respuesta.existe) {
          this.mostrarMensaje('El DNI ya está en uso.', 'danger');
        } else {
          this.usuariosService.registrarUsuario(this.formRegistro.value).subscribe({
            next: () => {
              this.mostrarMensaje('¡Registro exitoso!', 'success');
              this.formRegistro.reset();
            },
            error: () => {
              this.mostrarMensaje('Error al registrar usuario.', 'danger');
            }
          });
        }
      },
      error: () => {
        this.mostrarMensaje('Error al verificar el DNI.', 'danger');
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
