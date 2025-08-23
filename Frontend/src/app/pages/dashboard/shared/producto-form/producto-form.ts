import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto-form',
  imports:[ReactiveFormsModule],
  templateUrl: './producto-form.html',
  styleUrls: ['./producto-form.css']
})
export class ProductoForm {
  productoForm: FormGroup;

  constructor(private location: Location, private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      descripcion: ['']
    });
  }

  onSubmit() {
  if (this.productoForm.valid) {
    console.log(this.productoForm.value);
    // Aquí podrías enviar los datos a un servicio
  } else {
    console.log('Formulario inválido');
  }
}


  goBack() {
    this.location.back();
  }

}
