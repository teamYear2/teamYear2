import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  formRegistro!: FormGroup;
  mostrarToast: boolean = false;
  mensajeToast: string = '';
  tipoToast: 'success' | 'danger' = 'success';

  constructor(private formbuilder: FormBuilder) {

    this.formRegistro = this.formbuilder.group(
      {
        nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
        correo: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        confirmarContrasena: ['', [Validators.required]]
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
    if (this.formRegistro.valid) {
      this.mensajeToast = '¡Registro exitoso!';
      this.tipoToast = 'success';
    } else {
      this.mensajeToast = 'Formulario inválido. Por favor revisa los campos.';
      this.tipoToast = 'danger';
    }

    this.mostrarToast = true;

    setTimeout(() => this.mostrarToast = false, 3000);
  }
}
